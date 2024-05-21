import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../services/store';
import {
  fetchNewOrders,
  clearOrderModalData
} from '../../services/slices/orderModalDataSlice';
import { AppDispatch } from '../../services/store';
import { isAction } from '@reduxjs/toolkit';
import { setOrderModalData } from '../../services/slices/orderModalDataSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const constructorItems = useSelector(
    (state: RootState) => state.constructorItems
  );
  const orderRequest = useSelector((state: RootState) => state.orders.request);
  const orderModalData = useSelector(
    (state: RootState) => state.orderModalData.data
  );
  const isLoading = useSelector(
    (state: RootState) => state.orderModalData.loading
  );
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];
    dispatch(fetchNewOrders(ingredientIds));
  };
  const closeOrderModal = () => {
    dispatch(clearOrderModalData());
  };
  //TODO: долго грузит, не показывает лоадер

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
