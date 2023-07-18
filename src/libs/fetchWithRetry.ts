import pRetry, { AbortError } from 'p-retry';

const fetchWithError: typeof fetch = async (...params) => {
  const response = await fetch(...params);

  if (!response.status.toString().startsWith('2')) {
    throw new AbortError(response.statusText);
  }

  return response;
};

export const fetchWithRetry: typeof fetch = (...params) => {
  return pRetry(() => fetchWithError(...params), { retries: 3 });
}