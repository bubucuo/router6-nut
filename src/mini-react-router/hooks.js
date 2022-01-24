import { useContext } from "react";
import { NaviagtionContext, RouteContext } from "./Context";
import { normalizePathname } from "./utils";

// todo 1.监听location，准确渲染路由
// todo 2. 渲染子路由 实现Outlet

export function useRoutes(routes) {
  // 遍历routes，渲染匹配的route
  const location = useLocation();
  let pathname = location.pathname;
  return routes.map((route) => {
    let match = pathname.startsWith(route.path);

    return (
      match &&
      route.children.map((child) => {
        let m = normalizePathname(child.path || "/") === pathname;
        return (
          m && (
            <RouteContext.Provider
              value={{ outlet: child.element }}
              children={route.element}
            />
          )
        );
      })
    );
  });
}

export function useLocation() {
  const { location } = useContext(NaviagtionContext);
  return location;
}

// 路由跳转函数
export function useNavigate() {
  const { naviagtor } = useContext(NaviagtionContext);
  return naviagtor.push;
}

// 路由跳转函数
export function useOutlet() {
  const { outlet } = useContext(RouteContext);
  return outlet;
}
