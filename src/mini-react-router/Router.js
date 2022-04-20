import React from "react";
import { NavigationContext } from "./Context";

export default function Router({ naviagtor, children, location }) {
  let navigationContext = React.useMemo(
    () => ({ naviagtor, location }),
    [naviagtor, location]
  );

  return (
    <NavigationContext.Provider value={navigationContext}>
      {children}
    </NavigationContext.Provider>
  );
}
