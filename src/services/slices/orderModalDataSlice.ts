import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

// Интерфейсы
interface OrderModalDataState {
  data: TOrder | null;
}

const initialState: OrderModalDataState = {
  data: null
};

// Создание слайса для модального окна
const orderModalDataSlice = createSlice({
  name: 'orderModalData',
  initialState,
  reducers: {
    setOrderModalData(state, action: PayloadAction<TOrder | null>) {
      state.data = action.payload;
    }
  }
});

export const { setOrderModalData } = orderModalDataSlice.actions;

export const orderModalDataReducer = orderModalDataSlice.reducer;
