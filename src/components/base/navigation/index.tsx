// NavigationListener.tsx
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../stores";

const NavigationListener: React.FC = () => {
  const navigate = useNavigate();
  const path = useSelector((state: RootState) => state.navigation.path);

  useEffect(() => {
    if (path) {
      navigate(path);
    }
  }, [path, navigate]);

  return null;
};

export default NavigationListener;
