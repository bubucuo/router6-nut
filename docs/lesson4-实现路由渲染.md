# 实现路由渲染



## 资源

1. [react-router6文档](https://reactrouter.com/docs/en/v6)
2. [github](https://github.com/remix-run/react-router)
2. [本文代码](https://github.com/bubucuo/router6-nut)



## 目标

1. 掌握路由渲染

2. 掌握Outlet原理

   

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
export default function App(props) {
  const [state, setState] = useState(1);
  return (
    <div className="app">
      <button onClick={() => setState(state + 1)}>{state}</button>
      <a href="#/a">a</a>

      {state < 2 && (
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="product" element={<Product />} />
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </Router>
      )}
    </div>
  );
}
```



### 实现mini-react-router



#### BrowserRouter

```js
export default function BrowserRouter({ children }) {
  let historyRef = useRef();
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory();
  }

  let history = historyRef.current;

  const [state, setState] = useState({ location: history.location });

  useLayoutEffect(() => {
    const unlisten = history.listen(setState);

    return unlisten;
  }, [history]);

  return (
    <Router children={children} location={state.location} naviagtor={history} />
  );
}

```



#### Router

```jsx
export default function Router({ naviagtor, children, location }) {
  let naviagtionContext = { naviagtor, location };

  return (
    <NaviagtionContext.Provider value={naviagtionContext}>
      {children}
    </NaviagtionContext.Provider>
  );
}
```



#### 自定义hook

实现多个自定义函数：

```jsx
import { useContext } from "react";
import { Outlet } from "./";
import { NaviagtionContext, RouteContext, OutletContext } from "./Context";
import { normalizePathname } from "./utils";

export function useRoutes(routes) {
  // 遍历routes，渲染匹配的route

  const location = useLocation();

  let pathname = location.pathname;

  return routes.map((route) => {
    let match = pathname.startsWith(route.path);

    // return match ? route.element : null;

    // let matches = pathname.startsWith(route.path) ? {}: false;

    return (
      match &&
      route.children.map((child) => {
        let m = normalizePathname(child.path || "/") === pathname;

        return (
          m && (
            <RouteContext.Provider
              value={{ outlet: child.element }}
              children={
                route.element !== undefined ? route.element : <Outlet />
              }
            />
          )
        );
      })
    );
  });
}

// 路由跳转函数
export function useNavigate() {
  const { naviagtor } = useContext(NaviagtionContext);
  return naviagtor.push;
}

// 路由跳转函数
export function useLocation() {
  const { location } = useContext(NaviagtionContext);
  return location;
}

export function useOutlet(context) {
  let outlet = useContext(RouteContext).outlet;

  return outlet;
}
```



#### Outlet

父路由通过渲染 `<Outlet>`来渲染子路由。

```jsx
import { useOutlet } from "./hooks";

export default function Outlet() {
  return useOutlet();
}
```



