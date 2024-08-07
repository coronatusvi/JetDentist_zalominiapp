import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./stores";
import "./index.css";
import Router from "./router/index.tsx";
import NavigationListener from "./components/base/navigation/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <NavigationListener />
        <Router />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
