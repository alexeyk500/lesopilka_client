import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { RootState } from './store';
import { UniversalServerType, UserLoginServerType } from '../api/serverResponseTypes';
import { CreateCandidateManufacturerParamsType, LicenceAction, ManufacturerType } from '../types/types';
import { serverApi } from '../api/serverApi';
import { showErrorPopUp } from '../components/InfoAndErrorMessageForm/InfoAndErrorMessageForm';
import { dateMonthShift } from '../utils/dateTimeFunctions';
import { MONTH_SHIFT_FOR_RESELLER_REPORT } from '../utils/constants';
import { getManufacturerLicensesActionsParamsType } from '../api/licensesApi';
import { PageEnum } from '../components/AppRouter/AppRouter';

type ResellerSliceType = {
  reportDateFrom: string;
  reportDateTo: string;
  licensesStatusOptionsId: number;
  resellerManufacturers: ManufacturerType[];
  resellerManufacturersLicenseActions: LicenceAction[];
  detailReportDate: string;
  detailReportBackwardRoute: string;
  isLoading: boolean;
};

const reportDateFrom = dateMonthShift(new Date(), MONTH_SHIFT_FOR_RESELLER_REPORT).toISOString();
const reportDateTo = new Date().toISOString();

const initialState: ResellerSliceType = {
  reportDateFrom,
  reportDateTo,
  licensesStatusOptionsId: 0,
  resellerManufacturers: [],
  resellerManufacturersLicenseActions: [],
  detailReportDate: reportDateTo,
  detailReportBackwardRoute: PageEnum.MainPage,
  isLoading: false,
};

export const createCandidateManufacturerThunk = createAsyncThunk<
  UniversalServerType,
  CreateCandidateManufacturerParamsType,
  { rejectValue: string }
>('reseller/createCandidateManufacturerThunk', async (createCandidateManufacturerParams, { rejectWithValue }) => {
  try {
    return await serverApi.createCandidateManufacturer(createCandidateManufacturerParams);
  } catch (e: any) {
    return rejectWithValue('Ошибка создания поставщика\n' + e.response?.data?.message);
  }
});

export const activateCandidateManufacturerThunk = createAsyncThunk<
  UserLoginServerType,
  { code: string },
  { rejectValue: string }
>('reseller/activateCandidateManufacturerThunk', async ({ code }, { rejectWithValue }) => {
  try {
    return await serverApi.activateCandidateManufacturer(code);
  } catch (e: any) {
    return rejectWithValue('Ошибка активации поставщика\n' + e.response?.data?.message);
  }
});

export const getResellerManufacturersThunk = createAsyncThunk<ManufacturerType[], string, { rejectValue: string }>(
  'reseller/getResellerManufacturersThunk',
  async (token, { rejectWithValue }) => {
    try {
      return await serverApi.getResellerManufacturers(token);
    } catch (e: any) {
      return rejectWithValue('Ошибка получения списка поставщиков для реселлера\n' + e.response?.data?.message);
    }
  }
);

export const unregisterResellerManufacturerThunk = createAsyncThunk<
  ManufacturerType[],
  { manufacturerId: number; token: string },
  { rejectValue: string }
>('reseller/unregisterResellerManufacturerThunk', async ({ manufacturerId, token }, { rejectWithValue }) => {
  try {
    return await serverApi.unregisterResellerManufacturer({ manufacturerId, token });
  } catch (e: any) {
    return rejectWithValue('Ошибка отвязки поставщика\n' + e.response?.data?.message);
  }
});

export const getResellerManufacturersLicenseActionsThunk = createAsyncThunk<
  LicenceAction[],
  getManufacturerLicensesActionsParamsType,
  { rejectValue: string }
>(
  'reseller/getResellerManufacturersLicenseActionsThunk',
  async (getManufacturerLicensesActionsParams, { rejectWithValue }) => {
    try {
      return await serverApi.getResellerManufacturersLicenseActions(getManufacturerLicensesActionsParams);
    } catch (e) {
      return rejectWithValue('Ошибка получения отчета реселлера');
    }
  }
);

export const resellerSlice = createSlice({
  name: 'resellerSlice',
  initialState,
  reducers: {
    setLicensesStatusOptionsId: (state, actions) => {
      state.licensesStatusOptionsId = actions.payload;
    },
    setResellerReportDateFrom: (state, actions) => {
      state.reportDateFrom = actions.payload;
    },
    setResellerReportDateTo: (state, actions) => {
      state.reportDateTo = actions.payload;
    },
    setResellerDetailReportDate: (state, actions) => {
      state.detailReportDate = actions.payload;
    },
    setResellerDetailReportBackwardRoute: (state, actions) => {
      state.detailReportBackwardRoute = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getResellerManufacturersLicenseActionsThunk.fulfilled, (state, action) => {
        state.resellerManufacturersLicenseActions = action.payload;
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(getResellerManufacturersThunk.fulfilled, unregisterResellerManufacturerThunk.fulfilled),
        (state, action) => {
          state.resellerManufacturers = action.payload;
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(createCandidateManufacturerThunk.fulfilled, activateCandidateManufacturerThunk.fulfilled),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          createCandidateManufacturerThunk.pending,
          activateCandidateManufacturerThunk.pending,
          getResellerManufacturersThunk.pending,
          unregisterResellerManufacturerThunk.pending,
          getResellerManufacturersLicenseActionsThunk.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          createCandidateManufacturerThunk.rejected,
          activateCandidateManufacturerThunk.rejected,
          getResellerManufacturersThunk.rejected,
          unregisterResellerManufacturerThunk.rejected,
          getResellerManufacturersLicenseActionsThunk.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          showErrorPopUp(action.payload ? action.payload : 'Неизвестная ошибка - resellerSlice');
        }
      );
  },
});

export const {
  setLicensesStatusOptionsId,
  setResellerReportDateFrom,
  setResellerReportDateTo,
  setResellerDetailReportDate,
  setResellerDetailReportBackwardRoute,
} = resellerSlice.actions;

export const selectorResellerIsLoading = (state: RootState) => state.reseller.isLoading;
export const selectorResellerLicensesStatusOptionsId = (state: RootState) => state.reseller.licensesStatusOptionsId;
export const selectorResellerManufacturers = (state: RootState) => state.reseller.resellerManufacturers;
export const selectorResellerReportDateFrom = (state: RootState) => state.reseller.reportDateFrom;
export const selectorResellerReportDateTo = (state: RootState) => state.reseller.reportDateTo;
export const selectorResellerManufacturersLicenseActions = (state: RootState) =>
  state.reseller.resellerManufacturersLicenseActions;
export const selectorResellerDetailReportDate = (state: RootState) => state.reseller.detailReportDate;
export const selectorResellerDetailReportBackwardRoute = (state: RootState) => state.reseller.detailReportBackwardRoute;

export default resellerSlice.reducer;
