import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderRequestState {
  request: boolean;
}

const initialState: OrderRequestState = {
  request: false
};

const orderRequestSlice = createSlice({
  name: 'orderRequest',
  initialState,
  reducers: {
    setOrderRequest(state, action: PayloadAction<boolean>) {
      state.request = action.payload;
    }
  }
});

export const { setOrderRequest } = orderRequestSlice.actions;

export const orderRequestReducer = orderRequestSlice.reducer;
