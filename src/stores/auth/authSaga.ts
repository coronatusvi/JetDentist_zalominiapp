import { call, fork, put, take, takeLatest } from "redux-saga/effects";

import { LoginPayload, authActions } from "./authSlice";
import { REFRESH_TOKEN_KEY, TOKEN_KEY } from "../../constants";
import { URLRoute } from "../../router/routes";
import { handleError } from "../../utils/common";
import { PayloadAction } from "@reduxjs/toolkit";
import { navigate } from "../navigation/navigationSlice";
import { authApi } from "../../api/authApi";

const { login, loginFailed, loginSuccess, logout } = authActions;

function* handleLogin(payload: LoginPayload) {
  try {
    const result: {
      errorCode: string;
      errorMessage: string;
      data: any;
    } = yield call(authApi.login, payload);
    console.log("result login Saga", result);

    yield put(loginSuccess(result.data));
    localStorage.setItem(TOKEN_KEY, result.data.token);
    localStorage.setItem(REFRESH_TOKEN_KEY, result.data.token);
    // Dispatch navigation action
    yield put(navigate(URLRoute.HOME));
  } catch (err) {
    handleError(err);
    yield put(loginFailed(err));
  }
}

function* handleLogout() {
  localStorage.removeItem(TOKEN_KEY);
  console.log("LOGOUT");
  yield put(logout);
  yield put(navigate(URLRoute.LOGIN));
}

function* watchFlowLogin() {
  while (true) {
    const isLoggedIn = !!localStorage.getItem(TOKEN_KEY);
    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(login.type);
      yield fork(handleLogin, action.payload);
    }
    yield take(logout.type);
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchFlowLogin);
}
