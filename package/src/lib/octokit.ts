import { Octokit } from "octokit";
import type { OctokitResponse } from "@octokit/types";
import { loadEnv } from "vite";
import pRretry from 'p-retry';
import config from "virtual:astro-gists/config";

// Load config options to check if verbose logging is enabled
const isVerbose = config.verbose;

// Create Gist Logger interface
const gistLogger = async (
  type: "info"|"warn"|"error", 
  message: string,
  VerboseCheck: boolean
  ) => {
    // if checkVerbose is true and isVerbose is true, log the message
    if (VerboseCheck && isVerbose) {
      if (type === "info") {
        console.log(`[astro-gists : octokit] ${message}`);
      } else if (type === "warn") {
        console.log(`[WARN] [astro-gists : octokit] ${message}`);
      } else if (type === "error") {
        console.log(`[ERROR] [astro-gists : octokit] ${message}`);
      } 
    }

    if (!VerboseCheck) {
      if (type === "info") {
        console.log(`[astro-gists : octokit]" ${message}`);
      } else if (type === "warn") {
        console.log(`[WARN] [astro-gists : octokit] ${message}`);
      } else if (type === "error") {
        console.log(`[ERROR] [astro-gists : octokit] ${message}`);
      }
    }

  };

// Load environment variables
const { GITHUB_PERSONAL_TOKEN } = loadEnv("all", process.cwd(), "GITHUB_");

// Create an Octokit instance
const octokit = new Octokit({ auth: GITHUB_PERSONAL_TOKEN });

// Retry failed requests
const retry: typeof pRretry = (fn, opts) =>
  pRretry(fn, {
    onFailedAttempt: (e) =>
      gistLogger("warn",
        `Attempt ${e.attemptNumber} failed. There are ${e.retriesLeft} retries left.\n ${e.message}`,
        false),
      retries: 3,
    ...opts,
  });

// Handle the response from the Octokit API
// biome-ignore lint/suspicious/noExplicitAny: any is used to handle the response from the Octokit API
function handleResponse(response: OctokitResponse<any>) {
  switch (response.status) {
    case 200:
      return response.data;
    case 404:
      return "E404";
    case 403:
      return "E403";
    case 500:
      return "E500";
    default:
      return "E000";
  }
}
// Gist Grabber
const gistGrabber = async (gistId: string) => { 
  const response = await retry(() => octokit.request('GET /gists/{gist_id}', { gist_id: gistId }));
  if (handleResponse(response) === "E404") {
    gistLogger("error", `Gist ${gistId} not found.`, false);
    return null;
  }
  if (handleResponse(response) === "E403") {
    gistLogger("error", "Rate limit exceeded. Please try again later.", false);
    return null;
  }
  if (handleResponse(response) === "E500") {
    gistLogger("error", "Internal server error. Please try again later.", false);
    return null;
  }
  if (handleResponse(response) === "E000") {
    gistLogger("error", "An unknown error occurred. Please try again later.", false);
    return null;
  }
  if (handleResponse(response) === response.data) {
    gistLogger("info", `Gist ${gistId} found.`, true);
  }
  return handleResponse(response);
}

// Get a file from a Gist by ID and filename
export const getGistFile = async (
    gistId: string,
    filename: string
    ) => {
  const gist = await gistGrabber(gistId);
  const file = gist.files[filename];
  return file ? file : null;
};

// Get a Group of Gist files by ID
export const getGistGroup = async (gistId: string) => { 
  const gist = await gistGrabber(gistId);
  return gist;
};