import React from "react";

// 类比dom->vdom
export default function createRoutesFromChildren(children) {
  const routes = [];

  React.Children.forEach(children, (child) => {
    const route = {
      element: child.props.element,
      path: child.props.path,
    };
    routes.push(route);
  });

  return routes;
}
