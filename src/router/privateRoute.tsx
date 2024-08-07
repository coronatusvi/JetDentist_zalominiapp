import { Navigate } from "react-router-dom";
import MyRouteProp from "./MyRouteProp";
import RoleRoute from "./roleRoute";
import { URLRoute } from "./routes";
import { TOKEN_KEY } from "../constants";
import { useAppSelector } from "../stores/hook";
interface Props {
  item: MyRouteProp;
}
function PrivateRoute(props: Props) {
  // const isLogin = useAppSelector((state) => state.auth.login);
  // console.log("isLoginXXXXXXX", isLogin);

  console.log("Props PrivateRoute", props);
  // const token = localStorage.getItem(TOKEN_KEY);
  const token = "/"; // TODO: DEMO TOKEN

  if (token) {
    if (props.item.roles && props.item.roles.length > 0) {
      return <RoleRoute item={props.item} />;
    } else {
      return <>{props.item.element}</>;
    }
  } else {
    return <Navigate to={{ pathname: URLRoute.LOGIN }} />;
  }
}

export default PrivateRoute;
