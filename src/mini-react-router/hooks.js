export function useRoutes(routes) {
  // 遍历routes，渲染匹配的route

  let pathname = window.location.pathname;
  return routes.map((route) => {
    let match = pathname === route.path || pathname === "/" + route.path;
    return match ? route.element : null;
  });
}
