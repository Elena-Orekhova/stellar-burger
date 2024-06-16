import {
  orderModalDataReducer,
  fetchNewOrders,
  clearOrderModalData,
  OrderModalDataState
} from '../src/services/slices/orderModalDataSlice';
import { TOrder } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';
import { jest } from '@jest/globals';

jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

const testOrder: TOrder = {
  _id: '123',
  ingredients: [],
  status: 'done',
  createdAt: '2021-01-01',
  updatedAt: '2021-01-01',
  number: 123,
  name: 'Order1'
};

describe('orderModalDataSlice', () => {
  const initialState: OrderModalDataState = {
    data: null,
    loading: false
  };

  it('должен установить loading в true при fetchNewOrders.pending', () => {
    const action = { type: fetchNewOrders.pending.type };
    const state = orderModalDataReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('должен установить data и loading в false при fetchNewOrders.fulfilled', () => {
    const action = { type: fetchNewOrders.fulfilled.type, payload: testOrder };
    const state = orderModalDataReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.data).toEqual(testOrder);
  });

  it('должен установить loading в false при fetchNewOrders.rejected', () => {
    const action = { type: fetchNewOrders.rejected.type };
    const state = orderModalDataReducer(initialState, action);
    expect(state.loading).toBe(false);
  });

  it('должен сбросить data при clearOrderModalData', () => {
    const modifiedState: OrderModalDataState = {
      data: testOrder,
      loading: false
    };
    const action = clearOrderModalData();
    const state = orderModalDataReducer(modifiedState, action);

    expect(state.data).toBeNull();
  });
});
