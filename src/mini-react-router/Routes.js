import React from "react";
import { useRoutes } from "./hooks";

export default function Routes({ children }) {
  const routes = [];

  React.Children.forEach(children, (child) => {
    const route = {
      path: child.props.path,
      element: child.props.element,
    };

    routes.push(route);
  });

  // 组件
  return useRoutes(routes);
}
