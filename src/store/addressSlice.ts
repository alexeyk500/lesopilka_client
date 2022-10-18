import { LocationType, RegionType } from '../types/types';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { serverApi } from '../api/serverApi';
import { showErrorPopUp } from '../components/InfoAndErrorMessageForm/InfoAndErrorMessageForm';
import { RootState } from './store';

type AddressSliceType = {
  regions: RegionType[];
  searchRegionId: number | undefined;
  searchLocationId: number | undefined;
  searchLocationsByRegionId: LocationType[];
  isLoading: boolean;
};

const initialState: AddressSliceType = {
  regions: [],
  searchRegionId: undefined,
  searchLocationId: undefined,
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

export const getSearchLocationsByRegionIdThunk = createAsyncThunk<
  { searchRegionId: number; searchLocations: LocationType[] },
  number,
  { rejectValue: string }
>('address/getSearchLocationsByRegionIdThunk', async (searchRegionId, { rejectWithValue }) => {
  try {
    const searchLocations = await serverApi.getLocationsByRegionId(searchRegionId);
    return { searchRegionId, searchLocations };
  } catch (e) {
    return rejectWithValue(`Ошибка получения Поисковых Локаций для Региона - ${searchRegionId}`);
  }
});

export const addressSlice = createSlice({
  name: 'addressSlice',
  initialState,
  reducers: {
    setSearchLocationId: (state, action) => {
      state.searchLocationId = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getRegionsThunk.fulfilled, (state, action) => {
        state.regions = action.payload;
        state.isLoading = false;
      })
      .addCase(getSearchLocationsByRegionIdThunk.fulfilled, (state, action) => {
        state.searchLocationId = undefined;
        state.searchRegionId = action.payload.searchRegionId;
        state.searchLocationsByRegionId = action.payload.searchLocations;
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

export const { setSearchLocationId } = addressSlice.actions;

export const selectorRegions = (state: RootState) => state.address.regions;
export const selectorSearchRegionId = (state: RootState) => state.address.searchRegionId;
export const selectorSearchLocationId = (state: RootState) => state.address.searchLocationId;
export const selectorSearchLocationsByRegionId = (state: RootState) => state.address.searchLocationsByRegionId;

export default addressSlice.reducer;
