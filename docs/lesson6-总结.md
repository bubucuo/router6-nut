# 总结



## 资源

1. [react-router6文档](https://reactrouter.com/docs/en/v6)
2. [github](https://github.com/remix-run/react-router)
2. [本文代码](https://github.com/bubucuo/router6-nut)



## 目标

1. 掌握路由

2. 掌握react-router6

   

## 开始学习

### 项目初始化

```
npx create-react-app router6-nut
cd router6-nut
yarn add react-router-dom@6
yarn start
```



### 实现useResolvedPath

```js
export function useResolvedPath(to) {
  let { matches } = useContext(RouteContext);
  let { pathname: locationPathname } = useLocation();

  let routePathnamesJson = JSON.stringify(
    matches.map((match) => match.pathnameBase)
  );

  return useMemo(
    () => resolveTo(to, JSON.parse(routePathnamesJson), locationPathname),
    [to, routePathnamesJson, locationPathname]
  );

  return to;
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
```



### BrowserRouter与HashRouter对比

1. HashRouter最简单，不需要服务器端渲染，靠浏览器的#的来区分path就可以，BrowserRouter需要服务器端对不同的URL返回不同的HTML，后端配置可[参考](https://react-guide.github.io/react-router-cn/docs/guides/basics/Histories.html)。
2. BrowserRouter使用HTML5 history API（ pushState，replaceState和popstate事件），让页面的UI同步与URL。
3. HashRouter不支持location.key和location.state，动态路由跳转需要通过?传递参数。
4. Hash history 不需要服务器任何配置就可以运行，如果你刚刚入门，那就使用它吧。但是我们不推荐在实际线上环境中用到它，因为每一个 web 应用都应该渴望使用 `browserHistory`。



### MemoryRouter

把 URL 的历史记录保存在内存中的 `<Router>`（不读取、不写入地址栏）。在测试和非浏览器环境中很有用，如React Native。

