import { Octokit } from "octokit";
import type { OctokitResponse } from "@octokit/types";
import { loadEnv } from "vite";
import pRretry from 'p-retry';

// Load environment variables
const { GITHUB_PERSONAL_TOKEN } = loadEnv("all", process.cwd(), "GITHUB_");

// Check if there is a GitHub Personal Token
export const isThereAToken = () => {
  if (!GITHUB_PERSONAL_TOKEN) {
    return false;
  }
  return true;
}

// Error message if the token is missing
export const TOKEN_MISSING_ERROR = "GITHUB_PERSONAL_TOKEN not found. Please add it to your .env file. Without it, you will be limited to 60 requests per hour.";

// Create an Octokit instance
const octokit = new Octokit({ auth: GITHUB_PERSONAL_TOKEN });

// Retry failed requests
const retry: typeof pRretry = (fn, opts) =>
  pRretry(fn, {
    onFailedAttempt: (e) =>
      console.log(`[Astro-Gists] Attempt ${e.attemptNumber} failed. There are ${e.retriesLeft} retries left.\n `,
        e.message
      ),
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
      return "Gist not found.";
    case 403:
      return "You have exceeded the rate limit for requests to the GitHub API. Please try again later.";
    case 500:
      return "An internal server error occurred. Please try again later.";
    default:
      return "An error occurred. Please try again later.";
  }
}

// Gist Grabber
const gistGrabber = async (gistId: string) => { 
  const response = await retry(() => octokit.request('GET /gists/{gist_id}', { gist_id: gistId }));

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