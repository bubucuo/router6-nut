export function useRoutes(routes) {
  const pathname = window.location.pathname;

  return routes.map((route) => {
    const match = pathname === route.path || pathname === "/" + route.path;
    return match ? route.element : null;
  });
}
