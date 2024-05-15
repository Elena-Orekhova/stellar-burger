import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface FeedState {
  orders: TOrder[];
}

const initialState: FeedState = {
  orders: []
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setOrders(state, action: PayloadAction<TOrder[]>) {
      state.orders = action.payload;
    }
  }
});

export const { setOrders } = feedSlice.actions;

export const feedReducer = feedSlice.reducer;
