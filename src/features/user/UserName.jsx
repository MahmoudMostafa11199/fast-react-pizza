import { useSelector } from 'react-redux';

import { getUsername } from './userSlice';

function UserName() {
  const username = useSelector(getUsername);

  if (username === '') return null;

  return (
    <div className="hidden font-semibold tracking-wider md:block">
      {username}
    </div>
  );
}

export default UserName;
