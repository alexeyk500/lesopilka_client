import { LocationType, RegionType } from '../types/types';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { serverApi } from '../api/serverApi';
import { showErrorPopUp } from '../components/InfoAndErrorMessageForm/InfoAndErrorMessageForm';
import { RootState } from './store';

type AddressSliceType = {
  regions: RegionType[];
  searchLocationsByRegionId: LocationType[];
  isLoading: boolean;
};

const initialState: AddressSliceType = {
  regions: [],
  searchLocationsByRegionId: [],
  isLoading: false,
};

export const getRegionsThunk = createAsyncThunk<RegionType[], undefined, { rejectValue: string }>(
  'address/getRegionsThunk',
  async (_, { rejectWithValue }) => {
    try {
      return await serverApi.getRegions();
    } catch (e) {
      return rejectWithValue('Ошибка получения Регионов');
    }
  }
);

export const getSearchLocationsByRegionIdThunk = createAsyncThunk<LocationType[], number, { rejectValue: string }>(
  'address/getSearchLocationsByRegionIdThunk',
  async (searchRegionId, { rejectWithValue }) => {
    try {
      return await serverApi.getLocationsByRegionId(searchRegionId);
    } catch (e) {
      return rejectWithValue(`Ошибка получения Поисковых Локаций для Региона - ${searchRegionId}`);
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
      .addCase(getSearchLocationsByRegionIdThunk.fulfilled, (state, action) => {
        state.searchLocationsByRegionId = action.payload;
        state.isLoading = false;
      })
      .addMatcher(isAnyOf(getRegionsThunk.pending, getSearchLocationsByRegionIdThunk.pending), (state) => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(getRegionsThunk.rejected, getSearchLocationsByRegionIdThunk.rejected), (state, action) => {
        state.isLoading = false;
        showErrorPopUp(action.payload!);
      });
  },
});

// export const { setSearchLocationId } = addressSlice.actions;

export const selectorRegions = (state: RootState) => state.address.regions;
// export const selectorSearchRegionId = (state: RootState) => state.address.searchRegionId;
// export const selectorSearchLocationId = (state: RootState) => state.address.searchLocationId;
export const selectorSearchLocationsByRegionId = (state: RootState) => state.address.searchLocationsByRegionId;
export const selectorAddressSliceIsLoading = (state: RootState) => state.address.isLoading;

export default addressSlice.reducer;
