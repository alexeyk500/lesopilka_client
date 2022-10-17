import { CategoryType, LocationsType, RegionsType } from '../types/types';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { serverApi } from '../api/serverApi';
import { showErrorPopUp } from '../components/InfoAndErrorMessageForm/InfoAndErrorMessageForm';
import { RootState } from './store';

type AddressSliceType = {
  regions: RegionsType[];
  regionId: number | undefined;
  locationsByRegionId: LocationsType[];
  isLoading: boolean;
};

const initialState: AddressSliceType = {
  regions: [],
  regionId: undefined,
  locationsByRegionId: [],
  isLoading: false,
};

export const getRegionsThunk = createAsyncThunk<CategoryType[], undefined, { rejectValue: string }>(
  'address/getRegionsThunk',
  async (_, { rejectWithValue }) => {
    try {
      return await serverApi.getRegions();
    } catch (e) {
      return rejectWithValue('Ошибка получения Регионов');
    }
  }
);

export const getLocationsByRegionIdThunk = createAsyncThunk<CategoryType[], number, { rejectValue: string }>(
  'address/getRegionsThunk',
  async (regionId, { rejectWithValue }) => {
    try {
      return await serverApi.getLocationsByRegionId(regionId);
    } catch (e) {
      return rejectWithValue(`Ошибка получения Локаций для Региона - ${regionId}`);
    }
  }
);

export const addressSlice = createSlice({
  name: 'addressSlice',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getRegionsThunk.fulfilled, (state, action) => {
        state.regions = action.payload;
        state.isLoading = false;
      })
      .addMatcher(isAnyOf(getRegionsThunk.pending), (state) => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(getRegionsThunk.rejected), (state, action) => {
        state.isLoading = false;
        showErrorPopUp(action.payload!);
      });
  },
});

export const selectorRegions = (state: RootState) => state.address.regions;

export default addressSlice.reducer;
