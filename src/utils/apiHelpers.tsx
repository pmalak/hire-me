export const getInit: RequestInit = {
  method: "GET",

};

export const postInit = {
  method: "POST",
  // headers: fetchHeaders,
};

export const fetchHelper = async (url: string, method: string = "GET") => {
  const response = await fetch(url, {
    method
  });
  return response.json();
};
