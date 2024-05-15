import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface OrderDataState {
  orderData: TOrder | null;
}

const initialState: OrderDataState = {
  orderData: null
};

const orderDataSlice = createSlice({
  name: 'orderData',
  initialState,
  reducers: {
    setOrderData(state, action: PayloadAction<TOrder | null>) {
      state.orderData = action.payload;
    }
  }
});

export const { setOrderData } = orderDataSlice.actions;

export const orderDataReducer = orderDataSlice.reducer;
