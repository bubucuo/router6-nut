import { NaviagtionContext } from "./Context";

// 跨组件层级传递数据 context
export default function Router({ naviagtor, children }) {
  let naviagtionContext = { naviagtor };

  return (
    <NaviagtionContext.Provider value={naviagtionContext}>
      {children}
    </NaviagtionContext.Provider>
  );
}
