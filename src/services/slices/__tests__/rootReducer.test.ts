import { constructorItemsReducer } from '../constructorItemsSlice';
import { ingredientsReducer } from '../ingredientsSlice';
import { orderModalDataReducer } from '../orderModalDataSlice';
import { ordersReducer } from '../ordersSlice';
import { authReducer } from '../authSlice';
import { combineReducers } from 'redux';

describe('rootReducer', () => {
  it('правильная инициализация rootReducer', () => {
    const initialState = {
      ingredients: ingredientsReducer(undefined, { type: 'unknown' }),
      constructorItems: constructorItemsReducer(undefined, { type: 'unknown' }),
      orderModalData: orderModalDataReducer(undefined, { type: 'unknown' }),
      orders: ordersReducer(undefined, { type: 'unknown' }),
      auth: authReducer(undefined, { type: 'unknown' })
    };

    const expectedState = combineReducers({
      ingredients: ingredientsReducer,
      constructorItems: constructorItemsReducer,
      orderModalData: orderModalDataReducer,
      orders: ordersReducer,
      auth: authReducer
    })(undefined, { type: 'unknown' });

    expect(initialState).toEqual(expectedState);
  });
});
