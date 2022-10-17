import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { RootState } from './store';
import { UserType } from '../types/types';
import { UserLoginServerType } from '../api/serverResponseTypes';
import { showErrorPopUp } from '../components/InfoAndErrorMessageForm/InfoAndErrorMessageForm';
import { serverApi } from '../api/serverApi';

type UserSliceType = {
  user: UserType | undefined;
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

export const userUpdateNameOrPasswordThunk = createAsyncThunk<
  UserLoginServerType,
  { token: string; name?: string; password?: string },
  { rejectValue: string }
>('user/userUpdateNameOrPasswordThunk', async ({ token, name, password }, { rejectWithValue }) => {
  try {
    return await serverApi.updateUserNameOrPassword(token, name, password);
  } catch (e) {
    return rejectWithValue('Ошибка обновления данных пользователя');
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLoginByPasswordThunk.rejected, (state, action) => {
        userSlice.caseReducers.resetUser(state);
        if (action.payload && action.payload !== 'Токен отсутствует или невалиден') {
          showErrorPopUp(action.payload);
        }
      })
      .addMatcher(isAnyOf(userUpdateNameOrPasswordThunk.rejected), (state, action) => {
        showErrorPopUp(action.payload ? action.payload :'Неизвестная ошибка в userSlice');
      })
      .addMatcher(
        isAnyOf(
          userLoginByPasswordThunk.fulfilled,
          userLoginByTokenThunk.fulfilled,
          userUpdateNameOrPasswordThunk.fulfilled
        ),
        (state, action) => {
          state.user = action.payload.user;
          localStorage.setItem(process.env.REACT_APP_APP_ACCESS_TOKEN!, action.payload.token);
        }
      );
  },
});

export const { resetUser } = userSlice.actions;

export const selectorUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
