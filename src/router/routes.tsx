import Login from "../page/login";
import Home from "../page/home";
import MyRouteProp from "./MyRouteProp";

export const URLRoute = {
  HOME: "/",
  LOGIN: "/login",
};

const Router: Array<MyRouteProp> = [
  {
    path: URLRoute.LOGIN,
    element: <Login />,
    private: false,
  },
  {
    path: URLRoute.HOME,
    element: <Home />,
    private: true,
  },
];
export default Router;
