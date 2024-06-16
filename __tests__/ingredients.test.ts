import {
  fetchIngredients,
  ingredientsReducer,
  IngredientsState
} from '../src/services/slices/ingredientsSlice';

const testData = [
  {
    _id: '1',
    name: 'Ingredient 1',
    type: 'type1',
    proteins: 10,
    fat: 1,
    carbohydrates: 20,
    calories: 420,
    price: 1000,
    image: 'image1',
    image_mobile: 'mobile1',
    image_large: 'large1'
  }
];

describe('ingredientsSlice', () => {
  const initialState: IngredientsState = {
    ingredients: [],
    loading: false,
    error: null
  };

  it('При вызове экшена булевая переменная меняется на true, когда ожидание отправлено сбрасывает ошибку', () => {
    const actualState = ingredientsReducer(
      {
        ...initialState,
        error: new Error('Error Test')
      },
      fetchIngredients.pending('')
    );

    expect(actualState).toEqual({
      ingredients: [],
      loading: true,
      error: null
    });
  });

  it('При вызове экшена и передаче в него ингредиентов данные записываются в стор и store.isLoading меняется на false', () => {
  
    const actualState = ingredientsReducer(
      {
        ...initialState,
        loading: true
      },
      fetchIngredients.fulfilled(testData, '')
    );

    expect(actualState).toEqual({
      ingredients: testData,
      loading: false,
      error: null
    });
  });

  it('При вызове экшена и передаче ошибки, она записывается в стор и store.isLoading меняется на false.', () => {
    const testError = new Error('Error Test');
    const expectedState: IngredientsState = {
      ingredients: [],
      loading: false,
      // error: {
      //   message: testError.message
      // }
      error: testError.message
    };

    const actualState = ingredientsReducer(
      {
        ...initialState,
        loading: true
      },
      fetchIngredients.rejected(testError, '')
    );

    expect(actualState).toMatchObject(expectedState);
  });
});
