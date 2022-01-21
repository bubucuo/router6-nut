import { createContext } from "react";

const NavigationContext = createContext();

const LocationContext = createContext();

const RouteContext = createContext({ outlet: null, matches: [] });

const OutletContext = createContext();

export { NavigationContext, LocationContext, RouteContext, OutletContext };
