import { useSelector, useDispatch } from 'react-redux';

import {
  increaseItemQuantity,
  decreaseItemQuantity,
  getCurrentQuantityById,
} from '../features/cart/cartSlice';
import Button from './Button';

function UpdatingItemQuantity({ pizzaId }) {
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <Button
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
        type="round"
      >
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
        type="round"
      >
        +
      </Button>
    </div>
  );
}

export default UpdatingItemQuantity;
