const BASE_URL = process.env.REACT_APP_API_URL;

if (!BASE_URL) {
  throw new Error(
    "REACT_APP_API_URL is not defined in the environment variables"
  );
}

export const v1PathGenerator = (path: string): string => {
  const formattedPath = path.startsWith("/") ? path : `/${path}`;
  const apiPath = `/api/v1${formattedPath}`;
  const cleanedBaseUrl = BASE_URL.endsWith("/")
    ? BASE_URL.slice(0, -1)
    : BASE_URL;

  return `${cleanedBaseUrl}${apiPath}`;
};
