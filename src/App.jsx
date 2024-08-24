import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Import actions and loaders separately
import { action as CreateOrderAction } from './pages/CreateOrder';
import { loader as menuLoader } from './pages/Menu';
import { loader as orderLoader } from './pages/Order';
import { action as updateOrderAction } from './features/order/UpdateOrder';

import Error from './ui/Error';
import SpinnerFullPage from './ui/SpinnerFullPage';

// Lazy load components
const AppLayout = lazy(() => import('./pages/AppLayout'));
const Home = lazy(() => import('./pages/Home'));
const Cart = lazy(() => import('./pages/Cart'));
const CreateOrder = lazy(() => import('./pages/CreateOrder'));
const Menu = lazy(() => import('./pages/Menu'));
const Order = lazy(() => import('./pages/Order'));

const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<SpinnerFullPage />}>
        <AppLayout />
      </Suspense>
    ),
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<SpinnerFullPage />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/menu',
        element: (
          <Suspense fallback={<SpinnerFullPage />}>
            <Menu />
          </Suspense>
        ),
        errorElement: <Error />,
        loader: menuLoader,
      },
      {
        path: '/cart',
        element: (
          <Suspense fallback={<SpinnerFullPage />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: '/order/new',
        element: (
          <Suspense fallback={<SpinnerFullPage />}>
            <CreateOrder />
          </Suspense>
        ),
        action: CreateOrderAction,
      },
      {
        path: '/order/:orderId',
        element: (
          <Suspense fallback={<SpinnerFullPage />}>
            <Order />
          </Suspense>
        ),
        errorElement: <Error />,
        loader: orderLoader,
        action: updateOrderAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
