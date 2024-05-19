import '../../index.css';
import styles from './app.module.css';

import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { AppHeader } from '@components';
import { ConstructorPage } from '../../pages/constructor-page';
import { Feed } from '../../pages/feed';
import { Login } from '../../pages/login';
import { Register } from '../../pages/register';
import { ForgotPassword } from '../../pages/forgot-password';
import { ResetPassword } from '../../pages/reset-password';
import { Profile } from '../../pages/profile';
import { ProfileOrders } from '../../pages/profile-orders';
import { NotFound404 } from '../../pages/not-fount-404';
import { Modal } from '../modal';
import { OrderInfo } from '../order-info';
import { IngredientDetails } from '../ingredient-details';
import { ProtectedRoute } from '../route';

const App = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            // <ProtectedRoute>
            <Login />
            // </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            // <ProtectedRoute>
            <Register />
            // </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            // <ProtectedRoute>
            <ForgotPassword />
            // </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            // <ProtectedRoute>
            <ResetPassword />
            // </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            // <ProtectedRoute>
            <Profile />
            // </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            // <ProtectedRoute>
            <ProfileOrders />
            // </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />

        <Route
          path='/feed/:number'
          element={
            <Modal
              title='Детали заказа'
              onClose={() => {
                navigate('/feed');
              }}
            >
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal
              title='Детали ингредиентов'
              onClose={() => {
                navigate('/');
              }}
            >
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            // <ProtectedRoute>
            <Modal
              title='Детали вашего заказа'
              onClose={() => {
                navigate('/profile/orders/');
              }}
            >
              <OrderInfo />
            </Modal>
            // </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
