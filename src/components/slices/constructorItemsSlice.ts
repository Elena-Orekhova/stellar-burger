import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '../../utils/types';

interface ConstructorItemsState {
  bun: {
    price: number;
  };
  ingredients: TConstructorIngredient[];
  orderRequest: false;
  orderModalData: null;
}

const initialState: ConstructorItemsState = {
  bun: { price: 0 },
  ingredients: [],
  orderRequest: false,
  orderModalData: null
};

export const constructorItemsSlice = createSlice({
  name: 'constructorItems',
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<{ price: number }>) {
      state.bun.price = action.payload.price;
    },
    addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      state.ingredients.push(action.payload);
    }
  }
});

export const { setBun, addIngredient } = constructorItemsSlice.actions;

export const constructorItemsReducer = constructorItemsSlice.reducer;
