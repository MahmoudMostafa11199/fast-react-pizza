import { Link } from 'react-router-dom';

import SearchOrder from '../features/order/SearchOrder';
import UserName from '../features/user/UserName';

function Header() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 bg-orange-500 px-4 py-3 uppercase sm:p-6">
      <Link to="/" className="space-x-2 tracking-widest sm:text-xl">
        <img
          src="/pizzaDeliver.png"
          alt="pizza logo"
          className="inline-block h-10"
        />
        <span>Fast React Pizza Co.</span>
      </Link>

      <SearchOrder />
      <UserName />
    </header>
  );
}

export default Header;
