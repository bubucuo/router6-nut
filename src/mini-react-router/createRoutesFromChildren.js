import React from "react";

// 类比dom->vdom
export default function createRoutesFromChildren(children) {
  const routes = [];

  React.Children.forEach(children, (child) => {
    const route = {
      element: child.props.element,
      path: child.props.path,
    };

    if (child.props.children) {
      // route array
      route.children = createRoutesFromChildren(child.props.children);
    }

    routes.push(route);
  });

  return routes;
}
