import { deleteCookie, setCookie, setJsonCookie } from "@/utils/cookies";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { loginUser, registerUser } from "../../api/userActions";
import { type UserAuthData } from "../../types/userTypes";

type TokensType = { access: string };
export type UserDataType = { id: number; userName: string };

export interface UserState {
  tokens: TokensType | null;
  user: UserDataType | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "failed";
}

const initialState: UserState = {
  isAuthenticated: false,
  user: null,
  tokens: null,
  status: "idle",
};

export const registerThunk = createAsyncThunk(
  "user/register",
  async (requestData: UserAuthData, thunkApi) => {
    try {
      const data = await registerUser(requestData);
      return data;
    } catch (err: unknown) {
      let message = "Registration failed";

      if (err instanceof AxiosError) {
        message = err.response?.data?.message ?? message;
      }

      return thunkApi.rejectWithValue(message);
    }
  },
);

export const loginThunk = createAsyncThunk(
  "user/login",
  async (requestData: UserAuthData, thunkApi) => {
    try {
      const data = await loginUser(requestData);
      return data;
    } catch (err: unknown) {
      let message = "Login failed";

      if (err instanceof AxiosError) {
        message = err.response?.data?.message ?? message;
      }

      return thunkApi.rejectWithValue(message);
    }
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.tokens = null;
      state.user = null;
      state.isAuthenticated = false;

      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      deleteCookie("user");
    },
    hydrateFromCookie: (state, action) => {
      const accessToken = action.payload.tokens.access;
      const user = action.payload.user;

      state.tokens = { access: accessToken };
      state.user = user;
      state.isAuthenticated = true;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        const { accessToken, user } = action.payload;
        state.tokens = { access: accessToken };
        state.user = user;
        state.isAuthenticated = true;
        state.status = "idle";
        setCookie("accessToken", accessToken);
        setJsonCookie("user", user);
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.status = "failed";
        console.log(action.payload);
      })
      .addCase(loginThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        const { accessToken, user } = action.payload;
        state.tokens = { access: accessToken };
        state.user = user;
        state.isAuthenticated = true;
        state.status = "idle";
        setCookie("accessToken", accessToken);

        setJsonCookie("user", user);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = "failed";
        console.log(action.payload);
      });
  },
});

export const { logout, hydrateFromCookie } = userSlice.actions;
export default userSlice.reducer;
