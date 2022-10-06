import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../axios/axios";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../localStorage/LocalStorageData";

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
  //   user: [],
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    console.log("Register me data", user);
    const check = Object.keys(user);
    const val = Object.values(user);
    console.log("Register me keys", user.append(check, val));
    try {
      const resp = await customFetch.post("/api/users/sign_up.json", {
        headers: {
          "Content-Type": "application/json",
        },
        body: user,
        // {
        // "user[firstName]": user.firstName,
        // "user[lastName]": user.lastName,
        // "user[phone]": user.phone,
        // "user[email]": user.email,
        // "user[deviceType]": user.deviceType,
        // "user[player_id]": user.player_id,
        // "user[password]": user.password,

        // },
      });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/api/users/sign_in.json", user);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      removeUserFromLocalStorage();
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      console.log("register payload", payload);
      console.log("payload", user);
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      //   toast.success(`Hello There ${user}`);
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Welcome Back ${user.name}`);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
