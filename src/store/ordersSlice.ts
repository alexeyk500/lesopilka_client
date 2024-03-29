import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { RootState } from './store';
import { dateMonthShift } from '../utils/dateTimeFunctions';
import { serverApi } from '../api/serverApi';
import { GetOrderServerType, UniversalServerType } from '../api/serverResponseTypes';
import { ArchiveOrderParamsType, CancelOrderParamsType, GetOrdersParamsType } from '../api/orderApi';
import { OrderType } from '../types/types';
import { MAX_MONTH_SHIFT_FOR_USER_ORDERS, MIN_MONTH_SHIFT_FOR_USER_ORDERS } from '../utils/constants';
import { showErrorPopUp } from '../components/InfoAndErrorMessageForm/InfoAndErrorMessageForm';

type OrdersSliceType = {
  selectedOrderStatusId: number;
  orderDateFrom: string;
  orderDateTo: string;
  orders: OrderType[];
  isLoading: boolean;
};

const orderDateFrom = dateMonthShift(new Date(), MIN_MONTH_SHIFT_FOR_USER_ORDERS);
const orderDateTo = dateMonthShift(new Date(), MAX_MONTH_SHIFT_FOR_USER_ORDERS);

const initialState: OrdersSliceType = {
  selectedOrderStatusId: 0,
  orderDateFrom: orderDateFrom.toISOString(),
  orderDateTo: orderDateTo.toISOString(),
  orders: [],
  isLoading: false,
};

export const getOrderByOrderIdThunk = createAsyncThunk<
  GetOrderServerType,
  { orderId: number; token: string },
  { rejectValue: string }
>('user/getOrderByOrderIdThunk', async ({ orderId, token }, { rejectWithValue }) => {
  try {
    return await serverApi.getOrderByOrderId({ orderId, token });
  } catch (e) {
    return rejectWithValue('Ошибка получения заказа');
  }
});

export const getOrdersByParamsThunk = createAsyncThunk<
  GetOrderServerType[],
  GetOrdersParamsType,
  { rejectValue: string }
>('user/getOrdersThunk', async (getOrdersParams, { rejectWithValue }) => {
  try {
    return await serverApi.getOrders(getOrdersParams);
  } catch (e) {
    return rejectWithValue('Ошибка получения списка заказов');
  }
});

export const returnToBasketAndCancelOrderByIdThunk = createAsyncThunk<
  UniversalServerType,
  { orderId: number; token: string },
  { rejectValue: string }
>('user/returnToBasketAndCancelOrderById', async ({ orderId, token }, { rejectWithValue }) => {
  try {
    return await serverApi.returnToBasketAndCancelOrderById(orderId, token);
  } catch (e) {
    return rejectWithValue('Ошибка отмены заказа');
  }
});

export const archiveOrderThunk = createAsyncThunk<UniversalServerType, ArchiveOrderParamsType, { rejectValue: string }>(
  'archiveOrderThunk',
  async (archiveOrderParams, { rejectWithValue }) => {
    try {
      return await serverApi.archiveOrder(archiveOrderParams);
    } catch (e) {
      return rejectWithValue('Ошибка архивации заказа');
    }
  }
);

export const cancelOrderThunk = createAsyncThunk<UniversalServerType, CancelOrderParamsType, { rejectValue: string }>(
  'cancelOrderThunk',
  async (cancelOrderParams, { rejectWithValue }) => {
    try {
      return await serverApi.cancelOrder(cancelOrderParams);
    } catch (e) {
      return rejectWithValue('Ошибка отмены заказа');
    }
  }
);

export const ordersSlice = createSlice({
  name: 'ordersSlice',
  initialState,
  reducers: {
    setSelectedOrderStatusId: (state, actions) => {
      state.selectedOrderStatusId = actions.payload;
    },
    setDateFrom: (state, actions) => {
      state.orderDateFrom = actions.payload;
    },
    setDateTo: (state, actions) => {
      state.orderDateTo = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersByParamsThunk.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(getOrderByOrderIdThunk.fulfilled, (state, action) => {
        state.orders = [action.payload];
        state.isLoading = false;
      })
      .addCase(returnToBasketAndCancelOrderByIdThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(
          getOrdersByParamsThunk.pending,
          returnToBasketAndCancelOrderByIdThunk.pending,
          getOrderByOrderIdThunk.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          getOrdersByParamsThunk.rejected,
          returnToBasketAndCancelOrderByIdThunk.rejected,
          archiveOrderThunk.rejected,
          cancelOrderThunk.rejected,
          getOrderByOrderIdThunk.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          showErrorPopUp(action.payload ? action.payload : 'Неизвестная ошибка - ordersSlice');
        }
      );
  },
});

export const { setSelectedOrderStatusId, setDateFrom, setDateTo } = ordersSlice.actions;

export const selectorSelectedOrderStatusId = (state: RootState) => state.orders.selectedOrderStatusId;
export const selectorSelectedOrderDateFrom = (state: RootState) => state.orders.orderDateFrom;
export const selectorSelectedOrderDateTo = (state: RootState) => state.orders.orderDateTo;
export const selectorOrders = (state: RootState) => state.orders.orders;

export default ordersSlice.reducer;
