import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { RootState } from './store';
import { UserType } from '../types/types';
import { CreateManufacturerType, UserLoginServerType } from '../api/serverResponseTypes';
import { showConfirmPopUp, showErrorPopUp } from '../components/InfoAndErrorMessageForm/InfoAndErrorMessageForm';
import { serverApi } from '../api/serverApi';

type UserSliceType = {
  user?: UserType;
  appSearchRegionId?: number;
  appSearchLocationId?: number;
};

const initialState: UserSliceType = {
  user: undefined,
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

export const userUpdateThunk = createAsyncThunk<
  UserLoginServerType,
  {
    token: string;
    name?: string;
    phone?: string;
    password?: string;
    searchRegionId?: number | null;
    searchLocationId?: number | null;
  },
  { rejectValue: string }
>(
  'user/userUpdateNameOrPasswordThunk',
  async ({ token, name, phone, password, searchRegionId, searchLocationId }, { rejectWithValue }) => {
    try {
      return await serverApi.updateUser(token, name, phone, password, searchRegionId, searchLocationId);
    } catch (e) {
      return rejectWithValue('Ошибка обновления данных пользователя');
    }
  }
);

export const userCreateManufacturerThunk = createAsyncThunk<
  CreateManufacturerType,
  {
    token: string;
    inn: string;
    title: string;
    phone: string;
    locationId: number;
    street: string;
    building: string;
    office: string | undefined;
    postIndex: string;
  },
  { rejectValue: string }
>(
  'user/userCreateManufacturerThunk',
  async ({ token, inn, title, phone, locationId, street, building, office, postIndex }, { rejectWithValue }) => {
    try {
      return await serverApi.createManufacturer(
        token,
        inn,
        title,
        phone,
        locationId,
        street,
        building,
        office,
        postIndex
      );
    } catch (e: any) {
      let message = `Ошибка создания Поставщика.\n`;
      if (e?.response?.data?.message) {
        if (e?.response?.data?.message.includes('already has been registered')) {
          message += `поставщик с ИНН ${inn} уже зарегестрирован в системе`;
        } else {
          message += e?.response?.data?.message;
        }
      }
      return rejectWithValue(message);
    }
  }
);

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
      })
      .addCase(userCheckPasswordThunk.rejected, (state, action) => {
        if (action.payload) {
          showErrorPopUp(action.payload);
        }
      })
      .addCase(userCreateManufacturerThunk.fulfilled, (state, action) => {
        if (action.payload) {
          showConfirmPopUp(`Поставщик \n${action.payload.title}\n успешно создан`);
        }
      })
      .addMatcher(isAnyOf(userUpdateThunk.rejected, userCreateManufacturerThunk.rejected), (state, action) => {
        showErrorPopUp(action.payload ? action.payload : 'Неизвестная ошибка в userSlice');
      })
      .addMatcher(
        isAnyOf(userLoginByPasswordThunk.fulfilled, userLoginByTokenThunk.fulfilled, userUpdateThunk.fulfilled),
        (state, action) => {
          state.user = action.payload.user;
          state.appSearchRegionId = undefined;
          state.appSearchLocationId = undefined;
          localStorage.setItem(process.env.REACT_APP_APP_ACCESS_TOKEN!, action.payload.token);
        }
      );
  },
});

export const { resetUser, setAppSearchRegionId, setAppSearchLocationId } = userSlice.actions;

export const selectorUser = (state: RootState) => state.user.user;
export const selectorAppSearchRegionId = (state: RootState) => state.user.appSearchRegionId;
export const selectorAppSearchLocationId = (state: RootState) => state.user.appSearchLocationId;

export default userSlice.reducer;
