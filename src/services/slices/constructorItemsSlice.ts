import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '../../utils/types';

// Интерфейсы
interface ConstructorItemsState {
  bun: {
    _id: string;
    price: number;
  } | null;
  ingredients: TConstructorIngredient[];
}

const initialState: ConstructorItemsState = {
  bun: null,
  ingredients: []
};

// Создание слайса для конструктора ингредиентов
export const constructorItemsSlice = createSlice({
  name: 'constructorItems',
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        // TODO:добавление больше одного и удаление по одному
        const existingIngredient = state.ingredients.find(
          (ingredient) => ingredient._id === action.payload._id
        );
        if (!existingIngredient) {
          state.ingredients.push(action.payload);
        }
      }
    },
    moveIngredientUp(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index > 0 && index < state.ingredients.length) {
        const temp = state.ingredients[index];
        state.ingredients[index] = state.ingredients[index - 1];
        state.ingredients[index - 1] = temp;
      }
    },
    moveIngredientDown(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index >= 0 && index < state.ingredients.length - 1) {
        const temp = state.ingredients[index];
        state.ingredients[index] = state.ingredients[index + 1];
        state.ingredients[index + 1] = temp;
      }
    },
    removeIngredient(state, action: PayloadAction<string>) {
      const idToRemove = action.payload;
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient._id !== idToRemove
      );
    }
  }
});

export const {
  addIngredient,
  moveIngredientUp,
  moveIngredientDown,
  removeIngredient
} = constructorItemsSlice.actions;

export const constructorItemsReducer = constructorItemsSlice.reducer;
