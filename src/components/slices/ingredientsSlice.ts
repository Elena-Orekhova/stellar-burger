import { createSlice, PayloadAction, configureStore } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';

interface IngredientsState {
  ingredients: TIngredient[];
}

const initialState: IngredientsState = {
  ingredients: []
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredients(state, action: PayloadAction<TIngredient[]>) {
      state.ingredients = action.payload;
    }
  }
});

export const { setIngredients } = ingredientsSlice.actions;

const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice.reducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients;

export const ingredientsReducer = ingredientsSlice.reducer;
