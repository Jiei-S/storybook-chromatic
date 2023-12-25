import axiosBase, { AxiosInstance } from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export type APIError = {
  code: number;
  message: string;
  type: string;
};

export class AxiosConfiguration {
  private _axios: AxiosInstance;

  constructor() {
    this._axios = axiosBase.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  get axios(): AxiosInstance {
    return this._axios;
  }
}
