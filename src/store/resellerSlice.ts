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
    return rejectWithValue('Ошибка создания поставщика\n' + e.response?.data?.message);
  }
});

export const activateCandidateManufacturerThunk = createAsyncThunk<
  UniversalServerType,
  { code: string },
  { rejectValue: string }
>('reseller/activateCandidateManufacturerThunk', async ({ code }, { rejectWithValue }) => {
  try {
    return await serverApi.activateCandidateManufacturer(code);
  } catch (e: any) {
    return rejectWithValue('Ошибка активации поставщика\n' + e.response?.data?.message);
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
      .addMatcher(
        isAnyOf(createCandidateManufacturerThunk.fulfilled, activateCandidateManufacturerThunk.fulfilled),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(createCandidateManufacturerThunk.pending, activateCandidateManufacturerThunk.pending),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(createCandidateManufacturerThunk.rejected, activateCandidateManufacturerThunk.rejected),
        (state, action) => {
          state.isLoading = false;
          showErrorPopUp(action.payload ? action.payload : 'Неизвестная ошибка - resellerSlice');
        }
      );
  },
});

export const { setLicensesStatusOptionsId } = resellerSlice.actions;

export const selectorResellerLicensesStatusOptionsId = (state: RootState) => state.reseller.licensesStatusOptionsId;
export const selectorResellerIsLoading = (state: RootState) => state.reseller.isLoading;

export default resellerSlice.reducer;
