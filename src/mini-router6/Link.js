import { useContext } from "react";
import { NavigationContext } from "./Context";

export default function Link({ to, children }) {
  const { navigator } = useContext(NavigationContext);

  return (
    <a
      href={to}
      onClick={(e) => {
        // e.preventDefault()
        //navigator.push(to);
      }}
    >
      {children}
    </a>
  );
}
