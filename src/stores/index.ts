import {
  configureStore,
  combineReducers,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import loadingReducer from "./loading/loadingSlice";
import navigationReducer from "./navigation/navigationSlice";
import authReducer from "./auth/authSlice";
import rootSaga from "./rootSaga";

const rootReducer = combineReducers({
  loading: loadingReducer,
  navigation: navigationReducer,
  auth: authReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
