# 实现路由匹配



## 资源

1. [react-router6文档](https://reactrouter.com/docs/en/v6)
2. [github](https://github.com/remix-run/react-router)
2. [本文代码](https://github.com/bubucuo/router6-nut)



## 目标

1. 掌握路由匹配原理

2. 掌握matchPath

   

## 开始学习

### 项目初始化

```
npx create-react-app router6-nut
cd router6-nut
yarn add react-router-dom@6
yarn start
```



### 页面渲染

```jsx
<Route path="product" element={<Product />}>
  <Route path=":id" element={<ProductDetail />} />
</Route>

function Product() {
  return (
    <div>
      <h1>Product</h1>
      <Link to="123">商品详情</Link>
      <Outlet />
    </div>
  );
}

function ProductDetail() {
  let navigate = useNavigate();
  const params = useParams();
  return (
    <div>
      <h1>ProductDetail: {params.id}</h1>
      <button onClick={() => navigate("/")}>go home</button>
    </div>
  );
}
```



### 实现mini-react-router



#### 路由匹配 useRoutes

```js
export function useRoutes(routes) {
  // 遍历routes，渲染匹配的route
  const location = useLocation();
  let pathname = location.pathname;

  const matches = matchRoutes(routes, { pathname });

  return _renderMatches(
    matches &&
      matches.map((match) => {
        return Object.assign({}, match, {});
      })
  );

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

function _renderMatches(matches, parentMatches = []) {
  if (matches == null) return null;

  return matches.reduceRight((outlet, match, index) => {
    return (
      <RouteContext.Provider
        children={
          match.route.element !== undefined ? match.route.element : <Outlet />
        }
        value={{
          outlet,
          matches: parentMatches.concat(matches.slice(0, index + 1)),
        }}
      />
    );
  }, null);
}

export function useParams() {
  let { matches } = useContext(RouteContext);
  let routeMatch = matches[matches.length - 1];
  return routeMatch ? routeMatch.params : {};
}
```



#### matchRoutes

```js
// 1. 删除结尾的多个/
// 2. 删除开头的多少/

import { matchPath } from "react-router-dom";

// 如 ///product/detail/// -> /product/detail
export const normalizePathname = (pathname) =>
  pathname.replace(/\/+$/, "").replace(/^\/*/, "/");

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

export function matchRoutes(routes, location, basename = "/") {
  let pathname = stripBasename(location.pathname || "/", basename);

  if (pathname == null) {
    return null;
  }

  let branches = flattenRoutes(routes);

  let matches = null;
  for (let i = 0; matches == null && i < branches.length; ++i) {
    matches = matchRouteBranch(branches[i], pathname);
  }

  return matches;
}

function flattenRoutes(
  routes,
  branches = [],
  parentsMeta = [],
  parentPath = ""
) {
  routes.forEach((route, index) => {
    let meta = {
      relativePath: route.path || "",
      // caseSensitive: route.caseSensitive === true,
      childrenIndex: index,
      route,
    };

    let path = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta);

    if (route.children && route.children.length > 0) {
      flattenRoutes(route.children, branches, routesMeta, path);
    }

    // Routes without a path shouldn't ever match by themselves unless they are
    // index routes, so don't add them to the list of possible branches.
    if (route.path == null && !route.index) {
      return;
    }

    branches.push({ path, routesMeta });
  });

  return branches;
}

function matchRouteBranch(branch, pathname) {
  let { routesMeta } = branch;

  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i = 0; i < routesMeta.length; ++i) {
    let meta = routesMeta[i];

    let end = i === routesMeta.length - 1;

    let remainingPathname =
      matchedPathname === "/"
        ? pathname
        : pathname.slice(matchedPathname.length) || "/";
    let match = matchPath(
      { path: meta.relativePath, caseSensitive: meta.caseSensitive, end },
      remainingPathname
    );

    if (!match) return null;

    Object.assign(matchedParams, match.params);

    let route = meta.route;

    matches.push({
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: joinPaths([matchedPathname, match.pathnameBase]),
      route,
    });

    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }

  return matches;
}
```
