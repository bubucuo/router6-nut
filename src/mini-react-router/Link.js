import { useNavigate, useResolvedPath } from "./hooks";

export default function Link({ to, children }) {
  const { pathname } = useResolvedPath(to);

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    // 跳转
    navigate(pathname);
  };

  return (
    <a href={pathname} onClick={handleClick}>
      {children}
    </a>
  );
}
