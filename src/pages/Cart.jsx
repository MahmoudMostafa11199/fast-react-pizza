import { useSelector, useDispatch } from 'react-redux';

import Button from '../ui/Button';
import LinkButton from '../ui/LinkButton';

import CartItem from '../features/cart/CartItem';
import { clearCart } from '../features/cart/cartSlice';
import { getUsername } from '../features/user/userSlice';
import EmptyCart from '../features/cart/EmptyCart';

function Cart() {
  const username = useSelector(getUsername);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="mt-6 divide-y divide-stone-300 border-b border-stone-300">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-6 space-x-4">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>
        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
