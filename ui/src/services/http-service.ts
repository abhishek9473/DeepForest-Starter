// services/http-service.ts
import customAxiosInterceptor from "./axios-instance-service";

// Define a generic type for the response data
type AxiosResponseData<T> = T;

// Post
export const post = <T>(
  url: string,
  entity: any
): Promise<AxiosResponseData<T>> =>
  new Promise((resolve, reject) => {
    customAxiosInterceptor
      .post<T>(url, entity)
      .then((response) => {
        resolve(response.data);
      })
      .catch((ex) => {
        reject(ex);
      });
  });

// Fetch
export const get = <T>(url: string): Promise<AxiosResponseData<T>> =>
  new Promise((resolve, reject) => {
    customAxiosInterceptor
      .get<T>(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch((ex) => {
        reject(ex);
      });
  });

// Delete
export const destroy = <T>(url: string): Promise<AxiosResponseData<T>> =>
  new Promise((resolve, reject) => {
    customAxiosInterceptor
      .delete<T>(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch((ex) => {
        reject(ex);
      });
  });

// Update
export const put = <T>(
  url: string,
  entity: any
): Promise<AxiosResponseData<T>> =>
  new Promise((resolve, reject) => {
    customAxiosInterceptor
      .put<T>(url, entity)
      .then((response) => {
        resolve(response.data);
      })
      .catch((ex) => {
        reject(ex);
      });
  });

export default customAxiosInterceptor;
