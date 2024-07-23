import { post } from "../http-service";
import { v1PathGenerator } from "../../utils";
import { ApiResponse } from "../../types";

export interface NewUsertype {
  name: string;
  email: string;
  password: string;
}

export interface loginUserType {
  email: string;
  password: string;
}

// Function to register a new user
export const registerUser = (
  userData: NewUsertype
): Promise<ApiResponse<any>> => {
  return post<ApiResponse<any>>(v1PathGenerator("auth/signup"), userData);
};

// Function to login a user
export const loginUser = (
  userData: loginUserType
): Promise<ApiResponse<any>> => {
  return post<ApiResponse<any>>(v1PathGenerator("/auth/login"), userData);
};
