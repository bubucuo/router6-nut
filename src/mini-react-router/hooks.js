export function useRoutes(routes) {
  let pathname = window.location.pathname;
  return routes.map((route) => {
    let match = pathname === route.path || pathname === "/" + route.path;
    return match ? route.element : null;
  });
}
