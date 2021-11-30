export const getInit: RequestInit = {
  method: "GET",

};

export const postInit = {
  method: "POST",
  // headers: fetchHeaders,
};

export const fetchHelper = async (url: string) => {
  const response = await fetch(url, getInit);
  return response.json();
};
