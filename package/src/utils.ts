import { Octokit } from "octokit";
import { loadEnv } from "vite";
import type { Route, RequestParameters, OctokitResponse } from "@octokit/types"

// Load environment variables
const { GITHUB_PERSONAL_TOKEN } = loadEnv("all", process.cwd(), "GITHUB_");

// Create an Octokit instance
export const octokit = new Octokit({ auth: GITHUB_PERSONAL_TOKEN });

// Retry requests if rate limited
async function requestRetry(route: Route, parameters: RequestParameters) {
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

// Get a Gist by ID
export const getGist = async (gistId: string) => {
  /** @ts-ignore-error */
  const { data: response } = await requestRetry('GET /gists/{gist_id}', { gist_id: gistId });
  const data = response as {
    // biome-ignore lint/suspicious/noExplicitAny: we don't know the shape of the data returned from the API
files: any; data: unknown 
};
  return data;
};

// Get a file from a Gist by ID and filename
export const getGistFile = async (
    gistId: string,
    filename: string
    ) => {
  const gist = await getGist(gistId);
  if (gist?.files) {
    const file = gist.files[filename];
    return file ? file : null;
  }
  return null;
};

export const getGistGroup = async (
  gistId: string
  ) => {
const gist = await getGist(gistId);
if (gist?.files) {
  return gist ? gist : null;
}
return null;
};