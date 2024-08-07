import { LoginPayload } from "../stores/auth/authSlice";
import axiosClient from "./axiosClient";
import { LOGIN } from "./urlConfig";

export const authApi = {
  login: (body?: LoginPayload) => {
    return axiosClient.post(LOGIN, body);
  },
};
