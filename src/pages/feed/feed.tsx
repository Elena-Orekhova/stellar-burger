import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(
    (state: RootState) => state.orders.orders
  );

  if (!orders.length) {
    return <Preloader />;
  }

  <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
