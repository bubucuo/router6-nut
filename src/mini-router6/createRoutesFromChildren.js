import React, { isValidElement } from "react";
import { Fragment } from "react/cjs/react.production.min";

export default function createRoutesFromChildren(children) {
  let routes = [];

  React.Children.forEach(children, (element) => {
    if (!isValidElement(element)) {
      return;
    }

    if (element.type === Fragment) {
      routes.push.apply(
        routes,
        createRoutesFromChildren(element.props.children)
      );
      return;
    }
    let route = {
      element: element.props.element,
      index: element.props.index,
      path: element.props.path,
    };

    if (element.props.children) {
      route.children = createRoutesFromChildren(element.props.children);
    }

    routes.push(route);
  });

  return routes;
}
