import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../services/store';
import { fetchOrders } from '../../services/slices/ordersSlice';
import {
  fetchIngredients,
  selectIngredients
} from '../../services/slices/ingredientsSlice';

export const Feed: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const orders: TOrder[] = useSelector(
    (state: RootState) => state.orders.orders
  );
  const ingredients = useSelector(selectIngredients);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  const handleGetFeeds = () => {
    dispatch(fetchOrders());
  };

  if (!orders.length) {
    return <Preloader />;
  }

  // TODO: при нажатии на кнопку обновить не показывается лоудер

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
