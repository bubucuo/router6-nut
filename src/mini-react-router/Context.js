import { createContext } from "react";

const NavigationContext = createContext();
const RouteContext = createContext({ matches: [], outlet: null });

export { NavigationContext, RouteContext };
