import { LicenceAction, LicenseActionTypeEnum } from '../types/types';
import { dateMonthShift } from '../utils/dateTimeFunctions';
import { MONTH_SHIFT_FOR_MANUFACTURER_LICENSE } from '../utils/constants';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { RootState } from './store';
import { serverApi } from '../api/serverApi';
import { getManufacturerLicensesActionsParamsType } from '../api/licensesApi';
import { showErrorPopUp } from '../components/InfoAndErrorMessageForm/InfoAndErrorMessageForm';
import { GetManufacturerLicensesInfoType } from '../api/serverResponseTypes';

type ManufacturerLicensesSlice = {
  licensesDateFrom: string;
  licensesDateTo: string;
  licensesActions: LicenceAction[];
  licenseActionType: LicenseActionTypeEnum;
  activeProductCardAmount?: number | null;
  restLicenseAmount?: number | null;
  isLoading: boolean;
};

const licensesDateFrom = dateMonthShift(new Date(), MONTH_SHIFT_FOR_MANUFACTURER_LICENSE).toISOString();
const licensesDateTo = new Date().toISOString();

const initialState: ManufacturerLicensesSlice = {
  licensesDateFrom,
  licensesDateTo,
  licensesActions: [],
  licenseActionType: LicenseActionTypeEnum.redeem,
  activeProductCardAmount: undefined,
  restLicenseAmount: undefined,
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

export const getManufacturerLicensesInfoThunk = createAsyncThunk<
  GetManufacturerLicensesInfoType,
  { token: string },
  { rejectValue: string }
>('manufacturerLicenses/getManufacturerLicensesInfoThunk', async ({ token }, { rejectWithValue }) => {
  try {
    return await serverApi.getManufacturerLicensesInfo(token);
  } catch (e) {
    return rejectWithValue('Ошибка получения онформации лицензиях поставщика');
  }
});

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
    setLicenseActionType: (state, actions) => {
      state.licenseActionType = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getManufacturerLicensesActionsThunk.fulfilled, (state, action) => {
        state.licensesActions = action.payload;
        state.isLoading = false;
      })
      .addCase(getManufacturerLicensesInfoThunk.fulfilled, (state, action) => {
        state.activeProductCardAmount = action.payload.activeProductCardAmount;
        state.restLicenseAmount = action.payload.restLicenseAmount;
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

export const { setLicensesDateFrom, setLicensesDateTo, setLicenseActionType } = manufacturerLicensesSlice.actions;
export const selectorManufacturerLicensesDateFrom = (state: RootState) => state.manufacturerLicenses.licensesDateFrom;
export const selectorManufacturerLicensesDateTo = (state: RootState) => state.manufacturerLicenses.licensesDateTo;
export const selectorManufacturerLicensesActions = (state: RootState) => state.manufacturerLicenses.licensesActions;
export const selectorManufacturerRestLicenseAmount = (state: RootState) => state.manufacturerLicenses.restLicenseAmount;
export const selectorManufacturerLicenseActionType = (state: RootState) => state.manufacturerLicenses.licenseActionType;
export const selectorManufacturerActiveProductCardAmount = (state: RootState) =>
  state.manufacturerLicenses.activeProductCardAmount;
