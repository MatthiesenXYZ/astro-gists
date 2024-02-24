import { Octokit } from "octokit";
import { loadEnv } from "vite";

// Load environment variables
const { GITHUB_PERSONAL_TOKEN } = loadEnv("all", process.cwd(), "GITHUB_");

// Create an Octokit instance
export const octokit = new Octokit({ auth: GITHUB_PERSONAL_TOKEN });

// Get a Gist by ID
export const getGist = async (gistId: string) => {
  const { data } = await octokit.request('GET /gists/{gist_id}', { gist_id: gistId });
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

