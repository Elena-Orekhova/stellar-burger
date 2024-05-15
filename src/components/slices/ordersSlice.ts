import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface OrdersState {
  orders: TOrder[];
}

const initialState: OrdersState = {
  orders: []
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders(state, action: PayloadAction<TOrder[]>) {
      state.orders = action.payload;
    },
    addOrder(state, action: PayloadAction<TOrder>) {
      state.orders.push(action.payload);
    }
  }
});

export const { setOrders, addOrder } = ordersSlice.actions;

export const ordersReducer = ordersSlice.reducer;
