import React from "react";
import { NavigationContext, RouteContext } from "./Context";
import Outlet from "./Outlet";
import { normalizePathname } from "./utils";

export function useRoutes(routes) {
  const location = useLocation();
  console.log("location", location); //sy-log

  const pathname = location.pathname;

  return routes.map((route) => {
    const match = pathname.startsWith(route.path);

    // todo children
    console.log("route", pathname, route); //sy-log
    return (
      match &&
      route.children.map((child) => {
        let m = normalizePathname(child.path) === pathname;

        return (
          m && (
            <RouteContext.Provider
              value={{ outlet: child.element }}
              children={
                route.element !== undefined ? route.element : <Outlet />
              }
            />
          )
        );
      })
    );
  });
}

export function useNavigate() {
  // 跳转
  const { naviagtor } = React.useContext(NavigationContext);

  return naviagtor.push;
}

export function useLocation() {
  const { location } = React.useContext(NavigationContext);
  return location;
}
// children
export function useOutlet() {
  const { outlet } = React.useContext(RouteContext);
  return outlet;
}
