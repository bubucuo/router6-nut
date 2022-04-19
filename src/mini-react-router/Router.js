import RouterContext from "./RouterContext";

// context
export default function Router({ children, navigator }) {
  const navigationContext = { navigator };
  return (
    <RouterContext.Provider value={navigationContext}>
      {children}
    </RouterContext.Provider>
  );
}
