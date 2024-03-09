import { requestRetry } from './octokit';

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

export const getGistGroup = async (gistId: string) => { 
  const gist = await getGist(gistId);
  return gist;
};