import {useEffect} from "react";
import {useNavigate} from "./hooks";

export default function Navigate({to, state, replace}) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to, {state, replace});
  });

  return null;
}
