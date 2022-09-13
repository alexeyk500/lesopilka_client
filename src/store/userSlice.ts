import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
      .addCase(userLoginByPasswordThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        localStorage.setItem(process.env.REACT_APP_APP_ACCESS_TOKEN!, action.payload.token);
      })
      .addCase(userLoginByPasswordThunk.rejected, (state, action) => {
        userSlice.caseReducers.resetUser(state);
        showErrorPopUp(action.payload!);
      });
  },
});

export const { resetUser } = userSlice.actions;

export const selectorUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
