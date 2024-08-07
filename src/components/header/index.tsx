import { BaseText } from "../base/baseText";
// import Images from '../../assets/gen'
import Logo from "../../assets/images/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuProps } from "antd";
import { useEffect, useState } from "react";
import { useAppDisPatch } from "../../stores/hook";
import { authActions } from "../../stores/auth/authSlice";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDisPatch();
  console.log("location", location);
  const [current, setCurrent] = useState(location.pathname);

  const handleLogout = () => {
    // dispatch(authActions.logout());
    console.log("handleLogout");
  };

  useEffect(() => {
    console.log(
      "useEffect location.pathname",
      location.pathname,
      current,
      "check",
      location.pathname.includes(current)
    );
    if (
      !current.includes(location.pathname) &&
      !location.pathname.includes(current)
    ) {
      setCurrent(location.pathname);
    }
  }, [location.pathname]);

  return (
    <div>
      <div className="flex items-center justify-between w-full p-2 border-b shadow-md min-h-12 bg-[#01579B]">
        <div className="flex items-center gap-6 text-white">
          <img src={Logo} className="h-6" />
        </div>
        <div onClick={handleLogout}>logout</div>
      </div>
    </div>
  );
}
