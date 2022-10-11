import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import customFetch from "../axios/axios";
import {
  addAuthTokenToLocalStorage,
  addUserToLocalStorage,
  addVerifyAuthTokenToLocalStorage,
  getUserFromLocalStorage,
  getVerifyAuthTokenFromLocalStorage,
  removeUserFromLocalStorage,
  removeVerifyAuthTokenFromLocalStorage,
} from "../localStorage/LocalStorageData";

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
  auth: getVerifyAuthTokenFromLocalStorage(),
  showNav: true,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    console.log("data in regis", user);
    console.log("firstName in registerUser", user.firstName);
    const formData = new FormData();

    formData.append("user[first_name]", user.firstName);
    formData.append("user[last_name]", user.lastName);
    formData.append("user[email]", user.email);
    formData.append("user[phone]", user.phone);
    formData.append("user[password]", user.password);
    formData.append("user[gender]", user.gender);
    formData.append("user[role]", user.role);
    formData.append("device_detail[device_type]", user.deviceType);
    formData.append("device_detail[player_id]", user.player_id);

    // console.log("Form DAta mila ke nahi ", Object.fromEntries(formData));

    try {
      const resp = await customFetch({
        url: `api/users/sign_up.json`,
        method: "POST",
        data: formData,
      });
      console.log("Register Data me Kya mila", resp.data);
      return resp.data;
    } catch (error) {
      console.log("Errror me kya mila", error);
      return thunkAPI.rejectWithValue(error.resp.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    console.log("login", user);
    const data = {
      device_detail: {
        device_type: user.device_type,
        player_id: user.player_id,
      },
      user: { email: user.email, password: user.password },
    };
    try {
      const resp = await customFetch({
        url: "/api/users/sign_in.json",
        method: "POST",
        data: data,
      });
      console.log("loginUser me data", resp.data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.resp.message);
    }
  }
);

export const verifyUser = createAsyncThunk(
  "user/verifyUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch({
        url: "/api/users/verify_doctor.json",
        method: "POST",
        data: user,
      });

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.resp.message);
    }
  }
);

export const logOutUser = createAsyncThunk(
  "user/logOutUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch({
        url: "/api/users/sign_out.json",
        method: "DELETE",
        headers: {
          AUTH_TOKEN: getVerifyAuthTokenFromLocalStorage(),
        },
      });
      console.log("thunkAPI.getState().user.user.token", thunkAPI.getState());
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.resp.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      const logOutUser = getUserFromLocalStorage();

      state.user = null;
      removeUserFromLocalStorage();
      toast.success(`Thank you ${logOutUser.firstName}`);
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, actions) => {
      // console.log(
      //   "registerUser.fulfilled",
      //   actions.payload?.data.user.auth_token
      // );
      console.log("ACtions in register", actions.payload.status);

      if (actions.payload.status === 200) {
        state.showNav = false;
        const authToken = actions?.payload?.data?.user?.auth_token;
        addAuthTokenToLocalStorage(authToken);
        const user1 = actions?.meta?.arg;
        state.isLoading = false;
        state.user = user1;
        addUserToLocalStorage(user1);
        toast.success(`Welcome ${user1.firstName}  ${user1.lastName}`);
      } else if (actions.payload.status !== 200) {
        toast.error(`${actions.payload.message}`);
      }
    },
    [registerUser.rejected]: (state, actions) => {
      state.isLoading = false;
      toast.error(actions.payload);
    },
    [verifyUser.pending]: (state) => {
      state.isLoading = true;
    },
    [verifyUser.fulfilled]: (state, actions) => {
      state.showNav = true;
      const verifyAuthToken = actions.payload?.data.user.auth_token;
      addVerifyAuthTokenToLocalStorage(verifyAuthToken);
      state.auth = verifyAuthToken;
      state.isLoading = false;

      // toast.success(`Welcome Back ${user.name}`);
    },
    [verifyUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, actions) => {
      if (actions.payload.status === 200) {
        const user = actions.payload.data;
        // console.log("user kya mila sign in me", user);
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`${actions.payload.message}`);
      } else if (actions.payload.status !== 200) {
        toast.error(`${actions.payload.message}`);
      }
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [logOutUser.pending]: (state) => {
      state.isLoading = true;
    },
    [logOutUser.fulfilled]: (state, actions) => {
      // const logOutUser = getUserFromLocalStorage();

      state.user = null;
      state.auth = null;
      // removeAuthTokenFromLocalStorage();
      removeUserFromLocalStorage();
      removeVerifyAuthTokenFromLocalStorage();
      toast.success(`${actions.payload.message}`);
    },
    [logOutUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
