import createRoutesFromChildren from "./createRoutesFromChildren";
import { useRoutes } from "./hooks";

export default function Routes({ children }) {
  const routes = createRoutesFromChildren(children);

  return useRoutes(routes);
}
