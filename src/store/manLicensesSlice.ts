import { LicenceAction } from '../types/types';
import { dateMonthShift } from '../utils/dateTimeFunctions';
import { MONTH_SHIFT_FOR_MANUFACTURER_LICENSE } from '../utils/constants';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { RootState } from './store';
import { serverApi } from '../api/serverApi';
import { getManufacturerLicensesActionsParamsType } from '../api/licensesApi';
import { showErrorPopUp } from '../components/InfoAndErrorMessageForm/InfoAndErrorMessageForm';

type ManufacturerLicensesSlice = {
  licensesDateFrom: string;
  licensesDateTo: string;
  licensesActions: LicenceAction[];
  isLoading: boolean;
};

const licensesDateFrom = dateMonthShift(new Date(), MONTH_SHIFT_FOR_MANUFACTURER_LICENSE).toISOString();
const licensesDateTo = new Date().toISOString();

const initialState: ManufacturerLicensesSlice = {
  licensesDateFrom,
  licensesDateTo,
  licensesActions: [],
  isLoading: false,
};

export const getManufacturerLicensesActionsThunk = createAsyncThunk<
  LicenceAction[],
  getManufacturerLicensesActionsParamsType,
  { rejectValue: string }
>(
  'manufacturerLicenses/getManufacturerLicensesActionsThunk',
  async (getManufacturerLicensesActionsParams, { rejectWithValue }) => {
    try {
      return await serverApi.getManufacturerLicensesActions(getManufacturerLicensesActionsParams);
    } catch (e) {
      return rejectWithValue('Ошибка получения лицензий поставщика');
    }
  }
);

export const manufacturerLicensesSlice = createSlice({
  name: 'manufacturerLicensesSlice',
  initialState,
  reducers: {
    setLicensesDateFrom: (state, actions) => {
      state.licensesDateFrom = actions.payload;
    },
    setLicensesDateTo: (state, actions) => {
      state.licensesDateTo = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getManufacturerLicensesActionsThunk.fulfilled, (state, action) => {
        state.licensesActions = action.payload;
        state.isLoading = false;
      })
      .addMatcher(isAnyOf(getManufacturerLicensesActionsThunk.pending), (state) => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(getManufacturerLicensesActionsThunk.rejected), (state, action) => {
        state.isLoading = false;
        showErrorPopUp(action.payload ? action.payload : 'Неизвестная ошибка - manufacturerLicensesSlice');
      });
  },
});

export default manufacturerLicensesSlice.reducer;

export const { setLicensesDateFrom, setLicensesDateTo } = manufacturerLicensesSlice.actions;
export const selectorManufacturerLicensesDateFrom = (state: RootState) => state.manufacturerLicenses.licensesDateFrom;
export const selectorManufacturerLicensesDateTo = (state: RootState) => state.manufacturerLicenses.licensesDateTo;
export const selectorManufacturerLicensesActions = (state: RootState) => state.manufacturerLicenses.licensesActions;
