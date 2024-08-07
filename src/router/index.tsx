import { Route, Routes } from "react-router-dom";
import MyRouteProp from "./MyRouteProp";
import PrivateRoute from "./privateRoute";
import routes from "./routes";
import BaseLayout from "../layout/base";
import PublicRoute from "./publicRoute";

const Router = () => {
  return (
    <Routes>
      {routes.map((item: MyRouteProp) => {
        if (item.private) {
          return (
            <Route
              key={item.path}
              {...item}
              element={
                <BaseLayout>
                  <PrivateRoute item={item} />
                </BaseLayout>
              }
            />
          );
        } else {
          return (
            <Route
              key={item.path}
              {...item}
              element={
                <BaseLayout>
                  <PublicRoute item={item} />
                </BaseLayout>
              }
            />
          );
        }
      })}
    </Routes>
  );
};
export default Router;
