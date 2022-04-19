import { useContext } from "react";
import RouterContext from "./RouterContext";

export function useRoutes(routes) {
  const pathname = window.location.pathname;

  return routes.map((route) => {
    const match = pathname === route.path || pathname === "/" + route.path;
    return match ? route.element : null;
  });
}

export function useNavigate() {
  //
  const { navigator } = useContext(RouterContext);

  return navigator.push;
}
