import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { RootState } from './store';
import { UniversalServerType } from '../api/serverResponseTypes';
import { CreateCandidateManufacturerParamsType } from '../types/types';
import { serverApi } from '../api/serverApi';
import { showErrorPopUp } from '../components/InfoAndErrorMessageForm/InfoAndErrorMessageForm';

type ResellerSliceType = {
  licensesStatusOptionsId: number;
  isLoading: boolean;
};

const initialState: ResellerSliceType = {
  licensesStatusOptionsId: 0,
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
    let message = `Ошибка создания поставщика пиломатериалов.\n`;
    if (e?.response?.data?.message) {
      if (e?.response?.data?.message.includes('already has been registered')) {
        message += `пользователь с такими учетными данными\nуже зарегестрирован в системе`;
      } else {
        message += e?.response?.data?.message;
      }
    }
    return rejectWithValue(message);
  }
});

export const resellerSlice = createSlice({
  name: 'resellerSlice',
  initialState,
  reducers: {
    setLicensesStatusOptionsId: (state, actions) => {
      state.licensesStatusOptionsId = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(createCandidateManufacturerThunk.fulfilled), (state) => {
        state.isLoading = false;
      })
      .addMatcher(isAnyOf(createCandidateManufacturerThunk.pending), (state) => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(createCandidateManufacturerThunk.rejected), (state, action) => {
        state.isLoading = false;
        showErrorPopUp(action.payload ? action.payload : 'Неизвестная ошибка - resellerSlice');
      });
  },
});

export const { setLicensesStatusOptionsId } = resellerSlice.actions;

export const selectorResellerLicensesStatusOptionsId = (state: RootState) => state.reseller.licensesStatusOptionsId;
export const selectorResellerIsLoading = (state: RootState) => state.reseller.isLoading;

export default resellerSlice.reducer;
