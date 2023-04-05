import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { RootState } from './store';
import { CreateManufacturerParamsType, CreateResellerParamsType, UserType, UserUpdateParamsType } from '../types/types';
import { CreateManufacturerServerType, UserLoginServerType } from '../api/serverResponseTypes';
import { showConfirmPopUp, showErrorPopUp } from '../components/InfoAndErrorMessageForm/InfoAndErrorMessageForm';
import { serverApi } from '../api/serverApi';

type UserSliceType = {
  user?: UserType;
  isUserChecked?: boolean;
  appSearchRegionId?: number;
  appSearchLocationId?: number;
  isLoading?: boolean;
};

const initialState: UserSliceType = {
  user: undefined,
  isUserChecked: false,
  isLoading: false,
};

export const userLoginByPasswordThunk = createAsyncThunk<
  UserLoginServerType,
  { email: string; password: string },
  { rejectValue: string }
>('user/userLoginByPasswordThunk', async ({ email, password }, { rejectWithValue }) => {
  try {
    return await serverApi.userLoginByPassword(email, password);
  } catch (e) {
    return rejectWithValue('Ошибка входа в систему,\nпроверьте правильность ввода\nлогина и пароля');
  }
});

export const userCheckPasswordThunk = createAsyncThunk<
  UserLoginServerType,
  { email: string; password: string },
  { rejectValue: string }
>('user/userCheckPasswordThunk', async ({ email, password }, { rejectWithValue }) => {
  try {
    return await serverApi.userLoginByPassword(email, password);
  } catch (e) {
    return rejectWithValue('Введен неправильный пароль');
  }
});

export const userLoginByTokenThunk = createAsyncThunk<UserLoginServerType, undefined, { rejectValue: string }>(
  'user/userLoginByTokenThunk',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
      if (token) {
        return await serverApi.userLoginByToken(token);
      }
      return rejectWithValue('Токен отсутствует или невалиден');
    } catch (e) {
      return rejectWithValue('Ошибка авторизации по токену');
    }
  }
);

export const userUpdateThunk = createAsyncThunk<UserLoginServerType, UserUpdateParamsType, { rejectValue: string }>(
  'user/userUpdateThunk',
  async (userUpdateParams, { rejectWithValue }) => {
    try {
      return await serverApi.updateUser(userUpdateParams);
    } catch (e) {
      return rejectWithValue('Ошибка обновления данных пользователя');
    }
  }
);

export const userCreateManufacturerThunk = createAsyncThunk<
  CreateManufacturerServerType,
  CreateManufacturerParamsType,
  { rejectValue: string }
>('user/userCreateManufacturerThunk', async (createManufacturerParams, { rejectWithValue }) => {
  try {
    return await serverApi.createManufacturer(createManufacturerParams);
  } catch (e: any) {
    let message = `Ошибка создания Поставщика.\n`;
    if (e?.response?.data?.message) {
      if (e?.response?.data?.message.includes('already has been registered')) {
        message += `поставщик уже зарегестрирован в системе`;
      } else {
        message += e?.response?.data?.message;
      }
    }
    return rejectWithValue(message);
  }
});

export const userCreateResellerThunk = createAsyncThunk<
  UserLoginServerType,
  CreateResellerParamsType,
  { rejectValue: string }
>('user/userCreateResellerThunk', async (createResellerParams, { rejectWithValue }) => {
  try {
    return await serverApi.createReseller(createResellerParams);
  } catch (e: any) {
    let message = `Ошибка создания Реселлера.\n`;
    if (e?.response?.data?.message) {
      if (e?.response?.data?.message.includes('already has been registered')) {
        message += `реселлер уже зарегестрирован в системе`;
      } else {
        message += e?.response?.data?.message;
      }
    }
    return rejectWithValue(message);
  }
});

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = undefined;
      localStorage.removeItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    },
    setAppSearchRegionId: (state, action) => {
      state.appSearchRegionId = action.payload;
    },
    setAppSearchLocationId: (state, action) => {
      state.appSearchLocationId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLoginByPasswordThunk.rejected, (state, action) => {
        userSlice.caseReducers.resetUser(state);
        if (action.payload && action.payload !== 'Токен отсутствует или невалиден') {
          showErrorPopUp(action.payload);
        }
        state.isLoading = false;
        state.isUserChecked = true;
      })
      .addCase(userLoginByTokenThunk.rejected, (state) => {
        userSlice.caseReducers.resetUser(state);
        state.isLoading = false;
        state.isUserChecked = true;
      })
      .addCase(userCheckPasswordThunk.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          showErrorPopUp(action.payload);
        }
      })
      .addCase(userCreateManufacturerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          showConfirmPopUp(`Поставщик \n${action.payload.title}\n успешно создан`);
        }
      })
      .addMatcher(
        isAnyOf(
          userLoginByPasswordThunk.fulfilled,
          userLoginByTokenThunk.fulfilled,
          userUpdateThunk.fulfilled,
          userCreateResellerThunk.fulfilled
        ),
        (state, action) => {
          state.user = action.payload.user;
          state.appSearchRegionId = undefined;
          state.appSearchLocationId = undefined;
          localStorage.setItem(process.env.REACT_APP_APP_ACCESS_TOKEN!, action.payload.token);
          state.isLoading = false;
          state.isUserChecked = true;
        }
      )
      .addMatcher(
        isAnyOf(
          userLoginByPasswordThunk.pending,
          userLoginByTokenThunk.pending,
          userUpdateThunk.pending,
          userCreateManufacturerThunk.pending,
          userCreateResellerThunk.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(userUpdateThunk.rejected, userCreateManufacturerThunk.rejected, userCreateResellerThunk.rejected),
        (state, action) => {
          state.isLoading = false;
          showErrorPopUp(action.payload ? action.payload : 'Неизвестная ошибка - userSlice');
        }
      );
  },
});

export const { resetUser, setAppSearchRegionId, setAppSearchLocationId } = userSlice.actions;

export const selectorUser = (state: RootState) => state.user.user;
export const selectorAppSearchRegionId = (state: RootState) => state.user.appSearchRegionId;
export const selectorAppSearchLocationId = (state: RootState) => state.user.appSearchLocationId;
export const selectorIsUserChecked = (state: RootState) => state.user.isUserChecked;

export const selectorSearchRegionId = (state: RootState) =>
  state.user.user?.searchRegion?.id ? state.user.user.searchRegion.id : state.user.appSearchRegionId;

export const selectorSearchLocationId = (state: RootState) =>
  state.user.user?.searchLocation?.id ? state.user.user.searchLocation.id : state.user.appSearchLocationId;

export default userSlice.reducer;
