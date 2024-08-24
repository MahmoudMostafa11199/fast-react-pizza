import { useState, useEffect } from 'react';
import { useNavigation, useActionData, Form, redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import store from '../store';
import {
  getCart,
  getTotalCartTotalPrice,
  clearCart,
} from '../features/cart/cartSlice';
import { fetchAdress } from '../features/user/userSlice';
import { createOrder } from '../services/apiRestaurant';
import { formatCurrency } from '../utils/helpers';

import Button from '../ui/Button';

import EmptyCart from '../features/cart/EmptyCart';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const [addressName, setAddressName] = useState('');

  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartTotalPrice);
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((store) => store.user);

  const navigation = useNavigation();
  const formErrors = useActionData();

  const isSubmitting = navigation.state === 'submitting';
  const isLoadingStatus = addressStatus === 'loading';

  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  function handlePosition(e) {
    e.preventDefault();

    dispatch(fetchAdress());
  }

  useEffect(
    function () {
      setAddressName(address);
    },
    [address]
  );

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6 ">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40" htmlFor="customer">
            First Name
          </label>
          <input
            id="customer"
            type="text"
            name="customer"
            defaultValue={username}
            required
            className="input grow capitalize"
          />
        </div>

        <div className="mb-4 flex grow flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40" htmlFor="phone">
            Phone number
          </label>
          <div className="grow">
            <input
              id="phone"
              type="tel"
              name="phone"
              required
              className="input w-full"
            />
            {formErrors?.phone && (
              <p className="mt-1 rounded-xl bg-red-200 p-2 text-xs text-red-500">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40" htmlFor="adress">
            Address
          </label>
          <div className="relative grow">
            <input
              id="adress"
              type="text"
              name="address"
              value={addressName}
              onChange={(e) => setAddressName(e.target.value)}
              disabled={isLoadingStatus}
              required
              className="input w-full"
            />
            {addressStatus === 'error' && (
              <p className="mt-1 rounded-xl bg-red-200 p-2 text-xs text-red-500">
                {errorAddress}
              </p>
            )}

            {!position.latitude && !position.longitude && (
              <span className="absolute right-[3px] top-[2.6px] z-50">
                <Button
                  disabled={isLoadingStatus}
                  type="small"
                  onClick={handlePosition}
                >
                  Get position
                </Button>
              </span>
            )}
          </div>
        </div>

        <div className="mb-10 flex items-center gap-2 text-sm">
          <input
            className="h-6 w-6 border-none accent-orange-500  focus:outline-none focus:ring focus:ring-orange-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude},${position.longitude}`
                : ''
            }
          />
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting
              ? 'Placing Order...'
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    priority: data.priority || false,
    cart: JSON.parse(data.cart),
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us your correct phone number. We might need it to contact you';

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
