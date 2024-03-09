import { Octokit } from "octokit";
import { loadEnv } from "vite";
import type { Route, RequestParameters, OctokitResponse } from "@octokit/types"

// Load environment variables
const { GITHUB_PERSONAL_TOKEN } = loadEnv("all", process.cwd(), "GITHUB_");

export const isThereAToken = () => {
  if (!GITHUB_PERSONAL_TOKEN) {
    return false;
  }
  return true;
}

export const TOKEN_MISSING_ERROR = "GITHUB_PERSONAL_TOKEN not found. Please add it to your .env file. Without it, you will be limited to 60 requests per hour.";

// Create an Octokit instance
const octokit = new Octokit({ auth: GITHUB_PERSONAL_TOKEN });

// Retry requests if rate limited
export async function requestRetry(route: Route, parameters: RequestParameters) {
  try {
    const response: OctokitResponse<unknown, number> = await octokit.request(route, parameters);
    return response;
  } catch (error) {
    /** @ts-ignore-error */
    if (error.response && error.status === 403 && error.response.headers['x-ratelimit-remaining'] === '0') {
      /** @ts-ignore-error */
      const resetTimeEpochSeconds = error.response.headers['x-ratelimit-reset'];
      const currentTimeEpochSeconds = Math.floor(new Date().getTime() / 1000);
      const secondsToWait = resetTimeEpochSeconds - currentTimeEpochSeconds;
      console.log(`Rate limit reached. Waiting ${secondsToWait} seconds before retrying.`);
      return new Promise((resolve) => {
        setTimeout(async () => {
          const retryResponse = await requestRetry(route, parameters);
          resolve(retryResponse);
        }, secondsToWait * 1000);
      });
    }
      // Return a rejected Promise
      return Promise.reject(error);
  }
}