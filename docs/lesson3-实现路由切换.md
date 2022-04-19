# 实现路由切换



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
export default function App(props) {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="product" element={<Product />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

function Layout(props) {
  return (
    <div className="border">
      <Link to="/">首页</Link>
      <Link to="/product">商品</Link>
      <Outlet />
    </div>
  );
}
```



### 建立mini-react-router

#### BrowserRouter

```js
export default function BrowserRouter({ children }) {
  let historyRef = useRef();
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory();
  }

  let history = historyRef.current;

  return <Router children={children} navigator={history} />;
}
```



#### Router

```jsx
export default function Router({ navigator, children }) {
  let navigationContext = { navigator };

  return (
    <NavigationContext.Provider value={navigationContext}>
      {children}
    </NavigationContext.Provider>
  );
}
```



#### 自定义hook

```jsx
export function useNavigate() {
  const { navigator } = useContext(NavigationContext);

  return navigator.push;
}
```



#### Link

```jsx
export default function Link({ to, children }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(to);
  };

  return <a onClick={handleClick}>{children}</a>;
}
```



#### Routes

`<Routes>` 和 `<Route>` 是React Router中基于当前location渲染页面的主要方法。你可以把`Route`当成if条件，如果`path` 匹配当前的URL，则渲染它的`element`，否则不渲染。`<Route caseSensitive>`判断大小写是否敏感，默认是false。

当location改变的时候， `<Routes>`遍历它所有的子`Route`，然后渲染匹配的Route。 `<Route>`可能是嵌套的，嵌套路由也对应URL。父路由通过渲染 `<Outlet>`来渲染子路由。

```js
export function createRoutesFromChildren(children) {
  let routes = [];

  React.Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      return;
    }

    let route = {
      element: child.props.element,
      path: child.props.path,
    };

    if (child.props.children) {
      route.children = createRoutesFromChildren(child.props.children);
    }

    routes.push(route);
  });

  return routes;
}
export default function Routes({ children }) {
  let routes = createRoutesFromChildren(children);

  return useRoutes(routes);
}
```


