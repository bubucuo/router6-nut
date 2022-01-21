import { createContext } from "react";

import {
  Action as NavigationType,
  createMemoryHistory,
  parsePath,
} from "history";
import React, { useMemo, useContext } from "react";

import {
  Action as NavigationType,
  createMemoryHistory,
  parsePath,
} from "history";

const NavigationContext = createContext();

const LocationContext = createContext();

export default function Link({ to, children }) {
  const { navigator } = useContext(NavigationContext);

  return (
    <a
      href={to}
      onClick={(e) => {
        // e.preventDefault()
        //navigator.push(to);
      }}
    >
      {children}
    </a>
  );
}

export function Route({ element, children }) {
  console.log("children", element); //sy-log

  return element;
  // return children ? React.cloneElement(element, {}, children) : element;
}

export function Router({
  children = null,
  location,
  navigationType = NavigationType.Pop,
  navigator,
}) {
  let navigationContext = useMemo(() => ({ navigator }), [navigator]);

  //   let location = useMemo(() => {
  //     return {};
  //   }, []);

  //   if (location == null) {
  //     return null;
  //   }

  return (
    <NavigationContext.Provider value={navigationContext}>
      <LocationContext.Provider
        children={children}
        value={{ location, navigationType }}
      />
    </NavigationContext.Provider>
  );
}

export function Outlet({ children }) {
  return children;
}

export function Router({
  children = null,
  location,
  navigationType = NavigationType.Pop,
  navigator,
}) {
  let navigationContext = useMemo(() => ({ navigator }), [navigator]);

  //   let location = useMemo(() => {
  //     return {};
  //   }, []);

  //   if (location == null) {
  //     return null;
  //   }

  return (
    <NavigationContext.Provider value={navigationContext}>
      <LocationContext.Provider
        children={children}
        value={{ location, navigationType }}
      />
    </NavigationContext.Provider>
  );
}

export function Routes({ children, location }) {
  return useRoutes(createRoutesFromChildren(children), location); //children;
}

export { NavigationContext, LocationContext };
