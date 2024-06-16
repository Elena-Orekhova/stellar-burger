import {
  ordersReducer,
  fetchOrders,
  fetchOrder,
  fetchProfileOrders,
  OrdersState
} from '../src/services/slices/ordersSlice';

describe('ordersSlice', () => {
  const initialState: OrdersState = {
    orders: [],
    success: false,
    total: 0,
    totalToday: 0,
    request: false,
    orderData: null,
    loading: false,
    error: null,
    status: 'created'
  };

  it('должен установить loading в true при fetchOrders.pending', () => {
    const action = { type: fetchOrders.pending.type };
    const state = ordersReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('должен установить данные заказа при fetchOrders.fulfilled', () => {
    const testOrders = { orders: [{ id: '1' }], total: 100, totalToday: 10 };
    const action = { type: fetchOrders.fulfilled.type, payload: testOrders };
    const state = ordersReducer(initialState, action);
    expect(state.orders).toEqual(testOrders.orders);
    expect(state.total).toBe(testOrders.total);
    expect(state.totalToday).toBe(testOrders.totalToday);
    expect(state.success).toBe(true);
    expect(state.loading).toBe(false);
  });

  it('должен установить loading в false при fetchOrders.rejected', () => {
    const action = { type: fetchOrders.rejected.type };
    const state = ordersReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.success).toBe(false);
  });

  it('должен установить loading в true при fetchOrder.pending', () => {
    const action = { type: fetchOrder.pending.type };
    const state = ordersReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('должен установить данные одного заказа при fetchOrder.fulfilled', () => {
    const testOrder = { orders: [{ id: '1' }] };
    const action = { type: fetchOrder.fulfilled.type, payload: testOrder };
    const state = ordersReducer(initialState, action);
    expect(state.orderData).toEqual(testOrder.orders[0]);
    expect(state.loading).toBe(false);
  });

  it('должен установить error и сбросить orderData при fetchOrder.rejected', () => {
    const action = {
      type: fetchOrder.rejected.type,
      error: { message: 'Error' }
    };
    const state = ordersReducer(initialState, action);
    expect(state.orderData).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Error');
  });

  it('должен установить loading в true при fetchProfileOrders.pending', () => {
    const action = { type: fetchProfileOrders.pending.type };
    const state = ordersReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('должен установить данные заказов профиля при fetchProfileOrders.fulfilled', () => {
    const testOrders = [{ id: '1' }];
    const action = {
      type: fetchProfileOrders.fulfilled.type,
      payload: testOrders
    };
    const state = ordersReducer(initialState, action);
    expect(state.orders).toEqual(testOrders);
    expect(state.loading).toBe(false);
    expect(state.success).toBe(true);
  });

  it('должен установить error и сбросить заказы профиля при fetchProfileOrders.rejected', () => {
    const action = {
      type: fetchProfileOrders.rejected.type,
      error: { message: 'Error' }
    };
    const state = ordersReducer(initialState, action);
    expect(state.orders).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.success).toBe(false);
    expect(state.error).toBe('Error');
  });
});
