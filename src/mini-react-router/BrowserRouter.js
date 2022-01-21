import { createBrowserHistory } from "history";
import { useRef } from "react";

import Router from "./Router";

export default function BrowserRouter({ children }) {
  // 存值，在组件卸载前，这个值在组件任何一个生命周期都指向同一个地址
  let historyRef = useRef();
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory();
  }

  let history = historyRef.current;

  return <Router children={children} naviagtor={history} />;
}
