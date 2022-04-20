import React from "react";
import { NavigationContext } from "./Context";

export default function Router({ naviagtor, children }) {
  let navigationContext = React.useMemo(() => ({ naviagtor }), [naviagtor]);

  return (
    <NavigationContext.Provider value={navigationContext}>
      {children}
    </NavigationContext.Provider>
  );
}
