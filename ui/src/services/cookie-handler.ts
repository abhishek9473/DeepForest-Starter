import Cookies from "js-cookie";

// Set the expiration time in seconds
const expirationTime = 60 * 60 * 24 * 10; // 10 days

export const setJwtInCookie = (token: string): void => {
  Cookies.set("token", token, {
    expires: new Date(Date.now() + expirationTime * 1000),
    path: "/",
    secure: true,
  });
};

export const setIdInCookie = (id: number): void => {
  Cookies.set("uid", id.toString(), {
    expires: new Date(Date.now() + expirationTime * 1000),
    path: "/",
    secure: true,
  });
};

export const setNameInCookie = (userName: string): void => {

  const capitalizeFirstLetter = (name: string): string =>
    name.charAt(0).toUpperCase() + name.slice(1);
  
  Cookies.set("name", capitalizeFirstLetter(userName), {
    path: "/",
  });
};

export const setEmailInCookie = (userEmail: string): void => {
  Cookies.set("email", userEmail, {
    path: "/",
  });
};

export const clearCookies = (): void => {
  Cookies.remove("token");
  Cookies.remove("name");
  Cookies.remove("email");
};
