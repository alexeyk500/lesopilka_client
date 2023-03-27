import { LicenceAction } from '../types/types';
import { dateMonthShift } from '../utils/dateTimeFunctions';
import { MONTH_SHIFT_FOR_MANUFACTURER_LICENSE } from '../utils/constants';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

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
});

export default manufacturerLicensesSlice.reducer;

export const { setLicensesDateFrom, setLicensesDateTo } = manufacturerLicensesSlice.actions;
export const selectorManufacturerLicensesDateFrom = (state: RootState) => state.manufacturerLicenses.licensesDateFrom;
export const selectorManufacturerLicensesDateTo = (state: RootState) => state.manufacturerLicenses.licensesDateTo;
