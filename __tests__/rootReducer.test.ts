import { constructorItemsReducer } from '../src/services/slices/constructorItemsSlice';
import { ingredientsReducer } from '../src/services/slices/ingredientsSlice';
import { orderModalDataReducer } from '../src/services/slices/orderModalDataSlice';
import { ordersReducer } from '../src/services/slices/ordersSlice';
import { authReducer } from '../src/services/slices/authSlice';
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
