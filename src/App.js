import {
  BrowserRouter as Router,
  // HashRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useParams,
  useNavigate,
} from "react-router-dom";

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
      <h1>Layout</h1>
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
      <Link to="/product/123">商品详情</Link>

      <Outlet />
    </div>
  );
}

function ProductDetail() {
  const params = useParams();
  let navigate = useNavigate();
  return (
    <div>
      <h1>ProductDetail:{params.id}</h1>
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
