import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderModalDataState {
  data: any;
}

const initialState: OrderModalDataState = {
  data: null
};

const orderModalDataSlice = createSlice({
  name: 'orderModalData',
  initialState,
  reducers: {
    setOrderModalData(state, action: PayloadAction<any>) {
      state.data = action.payload;
    }
  }
});

export const { setOrderModalData } = orderModalDataSlice.actions;

export const orderModalDataReducer = orderModalDataSlice.reducer;
