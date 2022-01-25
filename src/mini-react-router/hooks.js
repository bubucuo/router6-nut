import { useContext, useMemo } from "react";
import { matchRoutes } from "react-router-dom";
import { parsePath } from "history";
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

export function useResolvedPath(to) {
  const { matches } = useContext(RouteContext);

  const { pathname: locationPathname } = useLocation();

  let routePathenameJoson = JSON.stringify(
    matches.map((match) => match.pathnameBase)
  );

  return useMemo(
    () => resolveTo(to, JSON.parse(routePathenameJoson), locationPathname),
    [to, routePathenameJoson, locationPathname]
  );
}

function resolveTo(toArg, routePathnames, locationPathname): Path {
  let to = typeof toArg === "string" ? parsePath(toArg) : toArg;
  let toPathname = toArg === "" || to.pathname === "" ? "/" : to.pathname;

  let from;
  if (toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;

    if (toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");

      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }

      to.pathname = toSegments.join("/");
    }

    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }

  let path = resolvePath(to, from);

  if (
    toPathname &&
    toPathname !== "/" &&
    toPathname.endsWith("/") &&
    !path.pathname.endsWith("/")
  ) {
    path.pathname += "/";
  }

  return path;
}

export function resolvePath(to, fromPathname = "/"): Path {
  let {
    pathname: toPathname,
    search = "",
    hash = "",
  } = typeof to === "string" ? parsePath(to) : to;

  let pathname = toPathname
    ? toPathname.startsWith("/")
      ? toPathname
      : resolvePathname(toPathname, fromPathname)
    : fromPathname;

  return {
    pathname,
  };
}

function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  let relativeSegments = relativePath.split("/");

  relativeSegments.forEach((segment) => {
    if (segment === "..") {
      if (segments.length > 1) segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });

  return segments.length > 1 ? segments.join("/") : "/";
}
