import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../axios/axios";
import {
  addAuthTokenToLocalStorage,
  addUserToLocalStorage,
  addVerifyAuthTokenToLocalStorage,
  getAuthTokenFromLocalStorage,
  getUserFromLocalStorage,
  getVerifyAuthTokenFromLocalStorage,
  removeAuthTokenFromLocalStorage,
  removeUserFromLocalStorage,
  removeVerifyAuthTokenFromLocalStorage,
} from "../localStorage/LocalStorageData";

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
  auth: getVerifyAuthTokenFromLocalStorage(),
  sign_in: false,
  //   user: [],
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    const save = JSON.stringify(user);
    console.log("data in regis", user);
    console.log("firstName in registerUser", user.firstName);
    // console.log("Register me data", JSON.stringify(user));
    const check = Object.keys(user);
    // console.log("Register me keys", check);
    const val = Object.values(user);
    // console.log("Register me values", val);

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

    console.log("Form DAta mila ke nahi ", Object.fromEntries(formData));
    // let destructr = Object.fromEntries(formData);
    // try {
    //   const resp = await customFetch.post("/api/users/sign_up.json", {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     data: destructr,
    //     // {
    //     //   firstName: JSON.stringify(user.firstName),
    //     //   lastName: JSON.stringify(user.lastName),
    //     //   phone: JSON.stringify(user.phone),
    //     //   email: JSON.stringify(user.email),
    //     //   deviceType: JSON.stringify(user.deviceType),
    //     //   player_id: JSON.stringify(user.player_id),
    //     //   password: JSON.stringify(user.password),
    //     // },
    //   });

    try {
      const resp = await customFetch({
        url: `api/users/sign_up.json`,
        method: "POST",
        data: formData,
      });
      console.log("Register Data me Kya mila", resp.data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
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
      // const resp = await customFetch.post("/api/users/sign_in.json", user);
      const resp = await customFetch({
        url: "/api/users/sign_in.json",
        method: "POST",
        data: data,
      });
      console.log("loginUser me data", resp.data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
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
        // headers: {
        //   authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        //   // authorization: `Bearer `,
        // },
      });

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
// "";

export const logOutUser = createAsyncThunk(
  "user/logOutUser",
  async (user, thunkAPI) => {
    try {
      // const resp = await customFetch.post("/api/users/sign_in.json", user);
      const resp = await customFetch({
        url: "/api/users/sign_out.json",
        method: "DELETE",
        headers: {
          AUTH_TOKEN: getVerifyAuthTokenFromLocalStorage(),
          // authorization: `Bearer `,
        },
      });
      console.log("thunkAPI.getState().user.user.token", thunkAPI.getState());
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
      const logOutUser = getUserFromLocalStorage();
      // console.log("getUserFromLocalStorage", logOutUser);
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
      // const { user } = payload;
      console.log(
        "registerUser.fulfilled",
        actions.payload.data.user.auth_token
      );
      const authToken = actions.payload.data.user.auth_token;
      addAuthTokenToLocalStorage(authToken);
      // console.log("register payload", actions.meta.arg);
      const user1 = actions.meta.arg;
      // console.log("payload", user1);
      state.isLoading = false;
      state.user = user1;
      addUserToLocalStorage(user1);
      toast.success(`Welcome ${user1.firstName}  ${user1.lastName}`);
      // console.log("user1.firstName", user1.firstName);
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [verifyUser.pending]: (state) => {
      state.isLoading = true;
    },
    [verifyUser.fulfilled]: (state, actions) => {
      const verifyAuthToken = actions.payload.data.user.auth_token;
      addVerifyAuthTokenToLocalStorage(verifyAuthToken);
      state.isLoading = false;
      // state.user = user;
      // addUserToLocalStorage(user);
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
      const user = actions.payload.data.phone;
      console.log("user kya mila sign in me", user);
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      // toast.success(`Welcome Back ${user.name}`);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [logOutUser.pending]: (state) => {
      state.isLoading = true;
    },
    [logOutUser.fulfilled]: (state, { payload }) => {
      const logOutUser = getUserFromLocalStorage();
      // console.log("getUserFromLocalStorage", logOutUser);
      state.user = null;
      // removeAuthTokenFromLocalStorage();
      removeUserFromLocalStorage();
      removeVerifyAuthTokenFromLocalStorage();
      toast.success(`Thank you ${logOutUser.firstName}`);
    },
    [logOutUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
