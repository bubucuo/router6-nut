import React from "react";
import { NavigationContext } from "./Context";

export function useRoutes(routes) {
  const pathname = window.location.pathname;

  return routes.map((route) => {
    // const match = pathname === route.path || pathname === "/" + route.path;
    const match = pathname.startsWith(route.path);

    // todo children
    console.log("route", pathname, route); //sy-log
    return match ? route.element : null;
  });
}

export function useNavigate() {
  // 跳转
  const { naviagtor } = React.useContext(NavigationContext);

  return naviagtor.push;
}
