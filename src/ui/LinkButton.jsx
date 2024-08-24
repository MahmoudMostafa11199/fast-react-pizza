import { useNavigate, Link } from 'react-router-dom';

function LinkButton({ children, to }) {
  const navigate = useNavigate();

  const className =
    'text-sm text-blue-400 transition-colors hover:text-blue-500';

  if (to === '-1')
    return (
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    );

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export default LinkButton;
