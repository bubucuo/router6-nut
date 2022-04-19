import { createBrowserHistory } from "history";
import { useRef } from "react";
import Router from "./Router";

export default function BrowserRouter({ children }) {
  // 存history，组件卸载之前，指向的都是同一个对象
  let historyRef = useRef();

  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory();
  }

  const history = historyRef.current;

  return <Router children={children} navigator={history} />;
}
