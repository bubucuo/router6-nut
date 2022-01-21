# React Router6从入门到精通

## 资源

1. [react-router6文档](https://reactrouter.com/docs/en/v6)
2. [github](https://github.com/remix-run/react-router)
2. [本文代码](https://github.com/bubucuo/router6-tutorial)



## 开始学习

### 项目初始化

```
npx create-react-app router-tutorial
cd router-tutorial
yarn add react-router-dom@6
yarn start
```



### react-router简介

react-router包含3个库，react-router、react-router-dom和react-router-native。react-router提供最基本的路由功能，实际使用的时候我们不会直接安装react-router，而是根据应用运行的环境选择安装react-router-dom（在浏览器中使用）或react-router-native（在rn中使用）。react-router-dom和react-router-native都依赖react-router，所以在安装时，react-router也会自动安装。

### 路由

路由是决定你用React渲染什么样的页面，以及它们是怎么嵌套的。React Router提供了两种方法以供我们声明路由：

- [`Routes` 和 `Route`](https://reactrouter.com/docs/en/v6/api#routes-and-route)
- [`useRoutes`](https://reactrouter.com/docs/en/v6/api#useroutes) 

还有一些我们可以内部使用的API：

- [`matchPath`](https://reactrouter.com/docs/en/v6/api#matchpath) - 返回一个基于URL匹配path的对象
- [`matchRoutes`](https://reactrouter.com/docs/en/v6/api#matchroutes) - 基于[location](https://reactrouter.com/docs/en/v6/api#location)返回一个路由集合
- [`createRoutesFromChildren`](https://reactrouter.com/docs/en/v6/api#createroutesfromchildren) - 创建一个React元素集合的路由配置 



### 路由跳转

- [`Link`](https://reactrouter.com/docs/en/v6/api#link) 和 [`NavLink`](https://reactrouter.com/docs/en/v6/api#navlink) 渲染一个`<a>` 元素
- [`useNavigate`](https://reactrouter.com/docs/en/v6/api#usenavigate) 和 [`Navigate`](https://reactrouter.com/docs/en/v6/api#navigate) 跳转导航，通常用在事件中，或者响应状态变化。

Link、NavLink。

```jsx
<Link to="/">首页</Link>
<Link to="/product">商品</Link>
<NavLink to="messages" 
  style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
          >
 Messages          
</NavLink>
```

还有一些我们可以使用的API：

- [`useResolvedPath`](https://reactrouter.com/docs/en/v6/api#useresolvedpath) - 基于现在的[location](https://reactrouter.com/docs/en/v6/api#location)返回一个相对路径
- [`useHref`](https://reactrouter.com/docs/en/v6/api#usehref) - 返回作为 `<a href>`的相对路径
- [`useLocation`](https://reactrouter.com/docs/en/v6/api#uselocation) 和 [`useNavigationType`](https://reactrouter.com/docs/en/v6/api#usenavigationtype) - 当前的location
- [`useLinkClickHandler`](https://reactrouter.com/docs/en/v6/api#uselinkclickhandler) - 当你在 `react-router-dom`中，创建一个自定义 `<Link>` 的时候，`useLinkClickHandler`返回一个导航事件
- [`useLinkPressHandler`](https://reactrouter.com/docs/en/v6/api#uselinkpresshandler) - 当你在 `react-router-native`中，创建一个自定义 `<Link>` 的时候，`useLinkClickHandler`返回一个导航事件
- [`resolvePath`](https://reactrouter.com/docs/en/v6/api#resolvepath) - 基于给定的URL，返回一个相对路径 



### 基础使用

```jsx
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useNavigate,
} from "react-router-dom";

export default function App(props) {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="product" element={<Product />} />
          </Route>
        </Routes>
      </BrowserRouter>
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
```



#### Routes和Route

`<Routes>` 和 `<Route>` 是React Router中基于当前location渲染页面的主要方法。你可以把`Route`当成if条件，如果`path` 匹配当前的URL，则渲染它的`element`，否则不渲染。`<Route caseSensitive>`判断大小写是否敏感，默认是false。

当location改变的时候， `<Routes>`遍历它所有的子`Route`，然后渲染匹配的Route。 `<Route>`可能是嵌套的，嵌套路由也对应URL。父路由通过渲染 `<Outlet>`来渲染子路由。

```jsx
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="product" element={<Product />} />
          </Route>
        </Routes>
```

默认的 `<Route element>` 是一个 [`Outlet`](https://reactrouter.com/docs/en/v6/api#outlet)，这意味着即使没有明确的 `element`，路由也可以渲染它的子节点。因此我们可以在没有嵌套UI的情况下嵌套路径。

```jsx
<Route path="users">
  <Route path=":id" element={<UserProfile />} />
</Route>
```

### 

#### Outlet

 `<Outlet>`用在父路由中，这样在渲染子路由的时候，内部嵌套的UI也会被渲染。如果父路由是精确匹配， `<Outlet>`则会渲染一个标记index的子路由，如果没有index的子路由，那就什么都不渲染。



### 嵌套路由与动态路由

路由配置：

```jsx
<Route path="product" element={<Product />}>
  <Route path=":id" element={<ProductDetail />} />
</Route>
```

组件渲染页面：

```jsx
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
  return (
    <div>
      <h1>ProductDetail</h1>
			<button onClick={() => navigate("/")}>go home</button>      
    </div>
  );
}
```



### 404

path设置为*。（注意与router4和router5不同）

```jsx
<Route path="*" element={<NoMatch />} />
```

