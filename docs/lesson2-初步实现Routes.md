# 初步实现Routes



## 资源

1. [react-router6文档](https://reactrouter.com/docs/en/v6)
2. [github](https://github.com/remix-run/react-router)
2. [本文代码](https://github.com/bubucuo/router6-nut)



## 开始学习

### 项目初始化

```
npx create-react-app router6-nut
cd router6-nut
yarn add react-router-dom@6
yarn start
```



### 实现简单的页面渲染

```jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "./mini-react-router";

export default function App(props) {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="product" element={<Product />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

function Product() {
  return (
    <div>
      <h1>Product</h1>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h1>NoMatch</h1>
    </div>
  );
}
```



### 建立mini-react-router

#### index

```js
import BrowserRouter from "./BrowserRouter";
import Routes from "./Routes";
import Route from "./Route";
import Link from "./Link";

export { BrowserRouter, Routes, Route, Link };
```



#### Routes

`<Routes>` 和 `<Route>` 是React Router中基于当前location渲染页面的主要方法。你可以把`Route`当成if条件，如果`path` 匹配当前的URL，则渲染它的`element`，否则不渲染。`<Route caseSensitive>`判断大小写是否敏感，默认是false。

当location改变的时候， `<Routes>`遍历它所有的子`Route`，然后渲染匹配的Route。 `<Route>`可能是嵌套的，嵌套路由也对应URL。父路由通过渲染 `<Outlet>`来渲染子路由。

```js
import React from "react";
import { useRoutes } from "./hooks";

export default function Routes({ children }) {
  let routes = [];

  React.Children.forEach(children, (child) => {
    let route = { element: child.props.element, path: child.props.path };
    routes.push(route);
  });

  return useRoutes(routes);
}
```



#### hooks

实现自定义Hook：

```js
export function useRoutes(routes) {
  console.log("routes", routes); //sy-log

  let pathname = window.location.pathname;

  return routes.map((route) => {
    let match = pathname === route.path || pathname === "/" + route.path;
    return match ? route.element : null;
  });
}
```

