import { useSelector } from 'react-redux';

import { getUsername } from '../features/user/userSlice';

import Button from '../ui/Button';

import CreateUser from '../features/user/CreateUser';

function Home() {
  const username = useSelector(getUsername);

  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-8 text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-orange-500 ">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {username === '' ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">
          Continue Ordering, {username}
        </Button>
      )}
    </div>
  );
}

export default Home;
