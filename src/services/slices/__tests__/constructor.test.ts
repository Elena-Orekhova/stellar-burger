import { v4 as uuidv4 } from 'uuid';
import {
  constructorItemsSlice,
  addIngredient,
  moveIngredientUp,
  moveIngredientDown,
  removeIngredient,
  clearConstructor,
  setLoading,
  initialState
} from '../constructorItemsSlice';

const testIngredient = {
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
  image_large: 'large1',
  uniqueId: uuidv4()
};

const testIngredientSecond = {
  _id: '2',
  name: 'Ingredient 2',
  type: 'type1',
  proteins: 10,
  fat: 1,
  carbohydrates: 20,
  calories: 420,
  price: 1000,
  image: 'image1',
  image_mobile: 'mobile1',
  image_large: 'large1',
  uniqueId: uuidv4()
};

const testBun = {
  _id: '0',
  name: 'Bun 1',
  type: 'bun',
  proteins: 10,
  fat: 1,
  carbohydrates: 20,
  calories: 420,
  price: 1000,
  image: 'image1',
  image_mobile: 'mobile1',
  image_large: 'large1',
  uniqueId: uuidv4()
};

describe('constructorSlice', () => {
  const initialConstructorState = {
    ...initialState,
    ingredients: [testIngredient]
  };

  const initialStateTwoIngredients = {
    ...initialConstructorState,
    ingredients: [testIngredient, testIngredientSecond]
  };

  it('обработка экшена добавления ингредиента', () => {
    const action = addIngredient(testIngredientSecond);
    const actualState = constructorItemsSlice.reducer(
      initialConstructorState,
      action
    );

    expect(actualState.ingredients).toHaveLength(2);
    expect(actualState.ingredients[1]).toEqual(
      expect.objectContaining(testIngredientSecond)
    );
    expect(actualState.ingredients[1]).toHaveProperty('uniqueId');
  });

  it('обработка экшена добавления булочки', () => {
    const action = addIngredient(testBun);
    const actualState = constructorItemsSlice.reducer(
      initialConstructorState,
      action
    );

    expect(actualState.bun).toEqual(expect.objectContaining(testBun));
    expect(actualState.bun).toHaveProperty('uniqueId');
  });

  it('обработка экшена удаления ингредиента', () => {
    const action = removeIngredient(0);
    const actualState = constructorItemsSlice.reducer(
      initialConstructorState,
      action
    );

    expect(actualState.ingredients).toHaveLength(0);
  });

  it('обработка экшена изменения порядка ингредиентов в начинке (вверх)', () => {
    const action = moveIngredientUp(1);
    const actualState = constructorItemsSlice.reducer(
      initialStateTwoIngredients,
      action
    );

    expect(actualState.ingredients[0]._id).toBe('2');
    expect(actualState.ingredients[1]._id).toBe('1');
  });

  it('обработка экшена изменения порядка ингредиентов в начинке (вниз)', () => {
    const action = moveIngredientDown(0);
    const actualState = constructorItemsSlice.reducer(
      initialStateTwoIngredients,
      action
    );

    expect(actualState.ingredients[0]._id).toBe('2');
    expect(actualState.ingredients[1]._id).toBe('1');
  });

  it('обработка экшена очистки конструктора', () => {
    const initialStateBun = {
      bun: testBun,
      ingredients: [testIngredient],
      loading: false
    };
    const action = clearConstructor();
    const actualState = constructorItemsSlice.reducer(initialStateBun, action);

    expect(actualState.bun).toBeNull();
    expect(actualState.ingredients).toHaveLength(0);
  });

  it('обработка экшена изменения состояния загрузки', () => {
    const action = setLoading(true);
    const actualState = constructorItemsSlice.reducer(
      initialConstructorState,
      action
    );

    expect(actualState.loading).toBe(true);
  });
});
