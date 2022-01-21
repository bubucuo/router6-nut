import React from "react";
import { useRoutes } from "./hooks";

export default function Routes({ children }) {
  let routes = [];

  React.Children.forEach(children, (child) => {
    let route = {
      element: child.props.element,
      path: child.props.path,
    };

    routes.push(route);
  });

  return useRoutes(routes);
}
