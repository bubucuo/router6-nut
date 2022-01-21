import { useNavigate } from "./hooks";

export default function Link({ to, children }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    // 跳转
    navigate(to);
  };
  return <a onClick={handleClick}>{children}</a>;
}
