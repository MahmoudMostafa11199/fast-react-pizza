import { Link } from 'react-router-dom';

function Button({ children, disabled, to, type, onClick }) {
  const base =
    'inline-block rounded-full bg-orange-500 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-orange-400 focus:outline-none focus:ring focus:ring-orange-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-orange-400';

  const styles = {
    primary: base + ' px-4 py-2.5  md:px-6 md:py-4',
    small: base + ' text-xs px-3 py-2  md:px-5 md:py-3',
    round: base + ' text-sm px-2.5 py-1  md:px-3.5 md:py-2',
    secondary:
      'inline-block rounded-full font-semibold uppercase tracking-wide border-2 border-stone-300 transition-colors duration-300 px-4 py-2 text-stone-400 bg-stone-200 hover:bg-stone-300 hover:text-stone-800 focus:outline-none focus:ring focus:ring-offset-2 focus:bg-stone-300 focus:text-stone-800 focus:ring-stone-400  disabled:cursor-not-allowed md:px-6 md:py-3.5',
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button className={styles[type]} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    );

  return (
    <button className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
