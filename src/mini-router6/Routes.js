import createRoutesFromChildren from "./createRoutesFromChildren";
import { useRoutes } from "./hooks";

export default function Routes({ children, location }) {
  // return children;

  let routes = createRoutesFromChildren(children);
  console.log("routes", routes, location); //sy-log
  return useRoutes(routes, location);
}
