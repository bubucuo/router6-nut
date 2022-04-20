import { createBrowserHistory } from "history";
import React from "react";
import Router from "./Router";

export default function BrowserRouter({ children }) {
  // 组件卸载之前用
  let historyRef = React.useRef();

  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory();
  }

  const history = historyRef.current;

  const [state, setstate] = React.useState({ location: history.location });

  React.useLayoutEffect(() => {
    history.listen(setstate); //setstate(location)
  }, [history]);

  return (
    <Router children={children} naviagtor={history} location={state.location} />
  );
}
