import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from '../store';
import { orderBurgerApi } from '@api';
import { clearConstructor } from './constructorItemsSlice';

// Интерфейсы
interface OrderModalDataState {
  data: TOrder | null;
  loading: boolean;
}

const initialState: OrderModalDataState = {
  data: null,
  loading: false
};

// Thunk функция для создания нового заказа и обновления данных модального окна
export const fetchNewOrders = createAsyncThunk(
  'orderModalData/fetchNewOrders',
  async (ingredientIds: string[], { dispatch }) => {
    const response = await orderBurgerApi(ingredientIds);
    if (response.success) {
      dispatch(setOrderModalData(response.order));
      dispatch(clearConstructor());
      //TODO: dispatch?????
    } else {
      throw new Error('Failed to create order');
    }
    return response.order;
  }
);

// Создание слайса для модального окна
const orderModalDataSlice = createSlice({
  name: 'orderModalData',
  initialState,
  reducers: {
    setOrderModalData(state, action: PayloadAction<TOrder | null>) {
      state.data = action.payload;
    },
    clearOrderModalData(state) {
      state.data = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNewOrders.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { setOrderModalData, clearOrderModalData } =
  orderModalDataSlice.actions;

export const orderModalDataReducer = orderModalDataSlice.reducer;
