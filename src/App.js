import React from "react";

// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link,
//   Outlet,
//   NavLink,
//   useNavigate,
//   useParams,
//   Navigate,
//   useLocation,
//   useMatch,
//   useResolvedPath,
// } from "react-router-dom";

import { AuthProvider, useAuth } from "./auth";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  Navigate,
  useNavigate,
  useParams,
  useLocation,
  useMatch,
  useResolvedPath,
} from "./mini-react-router";

// import About from "./pages/About";

const About = React.lazy(() => import("./pages/About"));

export default function App(props) {
  return (
    <div className="app">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="product" element={<Product />}>
                <Route path=":id" element={<ProductDetail />} />
              </Route>
              <Route
                path="user"
                element={
                  <RequiredAuth>
                    <User />
                  </RequiredAuth>
                }
              />
              <Route path="login" element={<Login />} />

              <Route
                path="about"
                element={
                  <React.Suspense fallback={<h1>loading...</h1>}>
                    <About />
                  </React.Suspense>
                }
              />

              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

function CustomLink({ to, ...rest }) {
  const resolved = useResolvedPath(to);
  console.log("to", to, resolved); //sy-log
  const match = useMatch({ path: resolved.pathname, end: true });

  return <Link to={to} {...rest} style={{ color: match ? "red" : "black" }} />;

  // return (
  //   <NavLink
  //     to={to}
  //     {...rest}
  //     style={({ isActive }) => ({ color: isActive ? "red" : "black" })}
  //   />
  // );
}

function Layout(props) {
  return (
    <div className="border">
      <CustomLink to="/">首页</CustomLink>
      <CustomLink to="/product">商品</CustomLink>
      <CustomLink to="/user">用户中心</CustomLink>
      {/* <CustomLink to="/login">登录</CustomLink> */}
      <CustomLink to="/about">关于</CustomLink>

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

      <CustomLink to="/product/123">商品详情</CustomLink>
      {/* <CustomLink to="123">商品详情</CustomLink> */}

      <Outlet />
    </div>
  );
}

function ProductDetail() {
  let navigate = useNavigate();
  const params = useParams();
  return (
    <div>
      <h1>ProductDetail</h1>
      <p>{params.id}</p>
      <button onClick={() => navigate("/")}>go home</button>
    </div>
  );
}

function RequiredAuth({ children }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to={"/login"} state={{ from: location }} replace={true} />;
  }

  return children;
}

function User() {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <h1>User</h1>
      <p>{auth.user?.username}</p>
      <button
        onClick={() => {
          auth.signout(() => navigate("/login"));
        }}
      >
        退出登录
      </button>
    </div>
  );
}

function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/";

  if (auth.user) {
    return <Navigate to={from} />;
  }

  const submit = (e) => {
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    auth.signin({ username }, () => {
      navigate(from, { replace: true });
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={submit}>
        <input type="text" name="username" />
        <button type="submit">login</button>
      </form>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}
