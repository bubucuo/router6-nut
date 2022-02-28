import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useNavigate,
  useParams,
  useResolvedPath,
} from "react-router-dom";
// import { BrowserRouter, Routes, Route, Link, Outlet } from "./mini-router6/";

export default function App(props) {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="product" element={<Product />}>
              <Route path=":id" element={<ProductDetail />} />
            </Route>
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <Link to="/">首页</Link>
      <Link to="product">商品</Link>
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
  const path = useResolvedPath("123");
  console.log("path", path); //sy-log
  return (
    <div>
      <h1>Product</h1>
      <Link to="123">详情</Link>
      <Outlet />
    </div>
  );
}

function ProductDetail() {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <h1>ProductDetail: {params.id}</h1>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        go home
      </button>
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
