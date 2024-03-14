import { Octokit } from "octokit";
import type { Endpoints } from "@octokit/types";
import { loadEnv } from "vite";
import chalk from 'chalk';
import pRretry from 'p-retry';
import config from "virtual:astro-gists/config";

// Load config options to check if verbose logging is enabled
const isVerbose = config.verbose;

// Define the GistResponse type
type GistResponse = Endpoints["GET /gists/{gist_id}"]["response"];

// Create Gist Logger interface
const gistLogger = async (
  type: "info"|"warn"|"error", 
  message: string,
  VerboseCheck: boolean
  ) => {
    // simplify console.log
    const log = console.log;
    // Create a log banner to identify logs from this package
    const logBanner = chalk.blue("[astro-gists : octokit] ");
    // if checkVerbose is true and isVerbose is true, log the message
    if (!VerboseCheck || VerboseCheck && isVerbose) {
      if (type === "info") {
        log(logBanner+message);
      } else if (type === "warn") {
        log(chalk.yellow("[WARN] ")+logBanner+chalk.yellow(message));
      } else if (type === "error") {
        log(chalk.bold.red("[ERROR] ")+logBanner+chalk.red(message));
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
function getStatusCode(response: GistResponse) {
  if (response.status !== 200) {
    if (response.status === 404) {
      return "E404";
    }
    if (response.status === 403) {
      return "E403";
    }
    if (response.status === 500) {
      return "E500";
    }
    return "E000";
  }
  return response.data;
}
// Gist Grabber
const gistGrabber = async (gistId: string) => { 
  const response = await retry(() => octokit.request('GET /gists/{gist_id}', { gist_id: gistId }));
  const statusCode = getStatusCode(response);

  if (statusCode === "E404") {
    gistLogger("error", `Gist ${gistId} not found.`, false);
    return null;
  }
  if (statusCode === "E403") {
    gistLogger("error", "Rate limit exceeded. Please try again later.", false);
    return null;
  }
  if (statusCode === "E500") {
    gistLogger("error", "Internal server error. Please try again later.", false);
    return null;
  }
  if (statusCode === "E000") {
    gistLogger("error", "An unknown error occurred. Please try again later.", false);
    return null;
  }
  if (statusCode === response.data) {
    gistLogger("info", `Gist for "${response.data.description || gistId}" grabbed successfully.`, true);
  }
  return statusCode;
}

// Get a file from a Gist by ID and filename
export const getGistFile = async (
    gistId: string,
    filename: string
    ) => {
  const gist = await gistGrabber(gistId);
  if (gist === null) return null;
  if (!gist.files) return null;
  return gist.files[filename];
};

// Get a Group of Gist files by ID
export const getGistGroup = async (gistId: string) => { 
  const gist = await gistGrabber(gistId);
  return gist;
};