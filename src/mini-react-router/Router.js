import { NaviagtionContext } from "./Context";

// 跨组件层级传递数据 context
export default function Router({ naviagtor, children, location }) {
  let naviagtionContext = { naviagtor, location };

  return (
    <NaviagtionContext.Provider value={naviagtionContext}>
      {children}
    </NaviagtionContext.Provider>
  );
}
