export const fetchHelper = async (url: string, method: string = "GET") => {
  const response = await fetch(url, {
    method,
  });
  return response.json();
};

export const baseURL = "https://app.famly.co/api";

export const getUrl = (path: string): string => {
  const joinCharacter = path.includes("?") ? "&" : "?";

  return `${baseURL}${path}${joinCharacter}accessToken=${process.env.REACT_APP_ACCESS_TOKEN}`;
};
