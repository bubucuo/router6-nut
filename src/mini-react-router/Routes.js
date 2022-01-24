import React, { isValidElement } from "react";
import { useRoutes } from "./hooks";

export function createRoutesFromChildren(children) {
  let routes = [];

  React.Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      return;
    }

    let route = {
      element: child.props.element,
      path: child.props.path,
    };

    if (child.props.children) {
      route.children = createRoutesFromChildren(child.props.children);
    }

    routes.push(route);
  });

  return routes;
}
export default function Routes({ children }) {
  let routes = createRoutesFromChildren(children);

  return useRoutes(routes);
}
