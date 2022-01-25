import { useContext } from "react";
import { matchRoutes } from "react-router-dom";
import Outlet from "./Outlet";
import { NavigationContext, RouteContext } from "./Context";
import {
  normalizePathname,
  //  matchRoutes
} from "./utils";

// todo 1.监听location，准确渲染路由
// todo 2. 渲染子路由 实现Outlet

export function useRoutes(routes) {
  // 遍历routes，渲染匹配的route
  const location = useLocation();
  let pathname = location.pathname;

  const matches = matchRoutes(routes, { pathname });

  console.log("matches", matches); //sy-log

  return _renderMatches(matches);
}

function _renderMatches(matches, parentMatches = []) {
  if (matches == null) {
    return null;
  }

  return matches.reduceRight((outlet, match, index) => {
    return (
      <RouteContext.Provider
        children={match.route.element}
        value={{
          outlet,
          matches: parentMatches.concat(matches.slice(0, index + 1)),
        }}
      />
    );
  }, null);
}

export function useLocation() {
  const { location } = useContext(NavigationContext);
  return location;
}

// 路由跳转函数
export function useNavigate() {
  const { naviagtor } = useContext(NavigationContext);
  return naviagtor.push;
}

// 路由跳转函数
export function useOutlet() {
  const { outlet } = useContext(RouteContext);
  return outlet;
}

export function useParams() {
  const { matches } = useContext(RouteContext);

  const rootMatch = matches[matches.length - 1];
  return rootMatch ? rootMatch.params : {};
}
