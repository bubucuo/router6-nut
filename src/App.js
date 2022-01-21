import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useNavigate,
} from "react-router-dom";
// import { BrowserRouter, Routes, Route, Link, Outlet } from "./mini-router6/";

export default function App(props) {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="product" element={<Product />}>
              <Route path=":id" element={<ProductDetail />} />
            </Route>
            <Route path="*" element={<NoMatch />} />
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

function NoMatch() {
  return (
    <div>
      <h1>NoMatch</h1>
    </div>
  );
}
