import { combineReducers } from 'redux';
import { ingredientsReducer } from '../../src/components/slices/ingredientsSlice';
import { constructorItemsReducer } from '../../src/components/slices/constructorItemsSlice';
import { orderModalDataReducer } from '../../src/components/slices/orderModalDataSlice';
import { ordersReducer } from '../../src/components/slices/ordersSlice';
import { authReducer } from '../../src/components/slices/authSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorItems: constructorItemsReducer,
  orderModalData: orderModalDataReducer,
  orders: ordersReducer,
  auth: authReducer
});
