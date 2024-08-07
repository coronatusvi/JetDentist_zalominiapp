import { Button } from "antd";
import { useAppDispatch } from "../../app/hooks";
import { BaseText } from "../../components/base/baseText";
import { authActions } from "../../stores/auth/authSlice";
import { useNavigate } from 'react-router-dom';
import { URLRoute } from "../../router/routes";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const login = () => {
    // dispatch(authActions.login({ username: "admin", password: "admin" }));
    navigate(URLRoute.HOME);
  };
  return (
    <div>
      <BaseText>Login Page</BaseText>
      <Button className="login_button" onClick={login}>
        <p>Login </p>
      </Button>
    </div>
  );
};

export default Login;
