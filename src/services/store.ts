import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { ingredientsReducer } from '../../src/components/slices/ingredientsSlice';
import { orderRequestReducer } from '../../src/components/slices/orderRequestSlice';
import { constructorItemsReducer } from '../../src/components/slices/constructorItemsSlice';
import { orderModalDataReducer } from '../../src/components/slices/orderModalDataSlice';
import { ordersReducer } from '../../src/components/slices/ordersSlice';
import { feedReducer } from '../../src/components/slices/feedSlice';
import { orderDataReducer } from '../../src/components/slices/orderDataSlice';
import { authReducer } from '../../src/components/slices/authSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

// const rootReducer = () => {}; // Заменить на импорт настоящего редьюсера

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorItems: constructorItemsReducer,
  orderRequest: orderRequestReducer,
  orderModalData: orderModalDataReducer,
  orders: ordersReducer,
  feed: feedReducer,
  orderData: orderDataReducer,
  auth: authReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

// export type RootState = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
