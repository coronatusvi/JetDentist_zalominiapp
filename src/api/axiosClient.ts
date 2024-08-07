import axios, { AxiosResponse } from "axios";

import { TOKEN_KEY, REFRESH_TOKEN_KEY } from "../constants";
import config from "../config";
import { LOGIN, REFRESH_TOKEN } from "./urlConfig";
import { URLRoute } from "../router/routes";

const axiosClient = axios.create({
  baseURL: config.baseApiUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // return response.data.data;
    return response.data;
  },
  async function (error) {
    const originalConfig = error.config;

    if (originalConfig.url !== LOGIN) {
      if (
        error.response &&
        error.response.status === 401 &&
        !originalConfig._retry
      ) {
        originalConfig._retry = true;
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
        try {
          const response = await axios.post(
            REFRESH_TOKEN,
            {},
            {
              headers: { Authorization: `Bearer ${refreshToken}` },
              baseURL: config.baseApiUrl,
            }
          );
          const {
            token,
            refresh_token,
          }: {
            token: string;
            refresh_token: string;
          } = response.data.data;
          localStorage.setItem(TOKEN_KEY, token);
          localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);
          return axiosClient(originalConfig);
        } catch (err) {
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(REFRESH_TOKEN_KEY);
          window.location.href = URLRoute.LOGIN;
        }
      } else {
        return Promise.reject(error.response.data);
      }
    } else {
      return Promise.reject(error.response.data);
    }
  }
);

export default axiosClient;
