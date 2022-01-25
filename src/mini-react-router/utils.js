// 1. 删除结尾的多个/
// 2. 删除开头的多少/

import { matchPath } from "react-router-dom";

// 如 ///product/detail/// -> /product/detail
export const normalizePathname = (pathname) =>
  pathname.replace(/\/+$/, "").replace(/^\/*/, "/");

// [/, /product] -> ///product -> /product
const joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");

function stripBasename(pathname, basename) {
  if (basename === "/") return pathname;

  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }

  let nextChar = pathname.charAt(basename.length);
  if (nextChar && nextChar !== "/") {
    // pathname does not start with basename/
    return null;
  }

  return pathname.slice(basename.length) || "/";
}

export function matchRoutes(routes, location) {
  let pathname = location.pathname;
  let branches = flatternRoutes(routes);

  let matches = null;

  for (let i = 0; matches == null && i < branches.length; i++) {
    matches = matchRouteBranch(branches[i], pathname);
  }

  return matches;
}

function flatternRoutes(
  routes,
  branches = [],
  parentMeta = [],
  parentPath = ""
) {
  routes.forEach((route) => {
    let meta = {
      relativePath: route.path || "",
      route,
    };

    let path = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentMeta.concat(meta);

    if (route.children && route.children.length > 0) {
      flatternRoutes(route.children, branches, routesMeta, path);
    }

    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      routesMeta,
    });
  });

  return branches;
}

// /prodcut/123
function matchRouteBranch(branch, pathname) {
  const { routesMeta } = branch;

  let matches = [];
  for (let i = 0; i < routesMeta.length; i++) {
    let meta = routesMeta[i];

    let end = routesMeta.length - 1 === i;
    let match = matchPath({ path: meta.relativePath, end }, pathname);

    if (!match) {
      return null;
    }

    matches.push({
      params: match.params,
      pathname: match.pathname,
      route: meta.route,
    });
  }

  return matches;
}
