import { NavigationContext } from "./Context";

// 跨组件层级传递数据 context
export default function Router({ naviagtor, children, location }) {
  let naviagtionContext = { naviagtor, location };

  return (
    <NavigationContext.Provider value={naviagtionContext}>
      {children}
    </NavigationContext.Provider>
  );
}
