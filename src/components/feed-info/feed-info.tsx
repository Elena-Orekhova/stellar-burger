import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора */
  // const orders: TOrder[] = [];
  // const feed = {};
  const orders = useSelector((state: RootState) => state.orders);
  const feed = useSelector((state: RootState) => state.feed);

  // const readyOrders = getOrders(orders, 'done');
  const readyOrders = getOrders(orders.orders, 'done');
  // const pendingOrders = getOrders(orders, 'pending');
  const pendingOrders = getOrders(orders.orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
