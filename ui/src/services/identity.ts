import Cookies from "js-cookie";

export const getAuth = (): string | undefined => {
  return Cookies.get("token");
};

export const getUserName = (): string | undefined => {
  return Cookies.get("name");
};
export const getUid = (): string | undefined => {
  return Cookies.get("uid");
};

export const getUserEmail = (): string | undefined => {
  return Cookies.get("email");
};
