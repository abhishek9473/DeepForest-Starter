// services/axios-instance-service.ts
import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { getAuth, getUid } from "./identity";

const url = process.env.NEXT_PUBLIC_API_URL as string;

const customAxiosInterceptor = axios.create({
  baseURL: url,
  timeout: 10000,
  headers: {
    "content-type": "application/json",
  },
});

const requestHandler = (
  request: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const jwtToken = getAuth() || false;
  const userId = getUid() || false;
  if (jwtToken && userId) {
    request.headers["x-access-token"] = jwtToken;
    request.headers["uid"] = userId;
  }
  return request;
};

const responseHandler = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const errorHandler = (error: AxiosError, type: string) => {
  console.log("axios error in customAxiosInterceptor-page", type, error);
  return Promise.reject(error);
};

customAxiosInterceptor.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error, "request error")
);

customAxiosInterceptor.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error, "response error")
);

export default customAxiosInterceptor;
