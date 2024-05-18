import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi, getOrderByNumberApi } from '@api';

// Thunk функция для ленты заказов
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await getFeedsApi();
  return response;
});

export const fetchOrder = createAsyncThunk(
  'order/fetchOrder',
  async (orderNumber: number) => {
    const response = await getOrderByNumberApi(orderNumber);
    return response;
  }
);

// Селекторы

// Интерфейсы
interface OrdersState {
  orders: TOrder[];
  success: boolean;
  total: number;
  totalToday: number;
  request: boolean;
  orderData: TOrder | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  success: false,
  total: 0,
  totalToday: 0,
  request: false,
  orderData: null,
  loading: false,
  error: null
};

// Создание слайса для заказов
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.success = true;
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.success = false;
        state.loading = false;
      })
      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.orderData = action.payload.orders[0];
        // TODO: orders[0] так и должен быть?
        // state.loading = false;
        // state.error = null;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.orderData = null;
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch order';
      });
  }
});

export const ordersReducer = ordersSlice.reducer;
