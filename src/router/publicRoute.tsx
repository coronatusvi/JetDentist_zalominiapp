import { Navigate } from "react-router-dom";
import MyRouteProp from "./MyRouteProp";
import RoleRoute from "./roleRoute";
import { URLRoute } from "./routes";
import { TOKEN_KEY } from "../constants";
import { useAppSelector } from "../stores/hook";
interface Props {
  item: MyRouteProp;
}
function PublicRoute(props: Props) {
  // const isLogin = useAppSelector((state) => state.auth.login);
  // console.log("isLoginXXXXXXX", isLogin);

  console.log("Props PublicRoute", props);
  // const token = localStorage.getItem(TOKEN_KEY);
  const token = "/"; // TODO: DEMO TOKEN

  if (!token) {
    return <Navigate to={{ pathname: URLRoute.LOGIN }} />;
  } else {
    return <Navigate to={{ pathname: URLRoute.HOME }} />;
  }
}

export default PublicRoute;
