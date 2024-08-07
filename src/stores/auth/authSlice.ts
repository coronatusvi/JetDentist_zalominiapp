import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import type { UserI } from "../user/userSlice";

export interface LoginPayload {
  username: string;
  password: string;
  ipAddress?: string;
  flatform?: string;
}

export interface AuthState {
  //   data?: UserI;
  data?: any;
  login: boolean;
  loading: boolean;
  error?: any;
}

const initialState: AuthState = {
  login: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.login = true;
      console.log("state loginSuccess ", action.payload);
      //   state.data = action.payload;
    },
    loginFailed: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.login = false;
      state.data = undefined;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  },
});

export const authActions = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
