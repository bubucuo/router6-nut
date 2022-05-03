import { useNavigate } from "./hooks";

export default function Link({ to, children, ...rest }) {
  const navigate = useNavigate();
  const handle = (e) => {
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={to} onClick={handle} {...rest}>
      {children}
    </a>
  );
}
