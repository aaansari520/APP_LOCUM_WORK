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
    const save = JSON.stringify(user);
    console.log("data in regis", user);
    console.log("Register me data", JSON.stringify(user));
    const check = Object.keys(user);
    console.log("Register me keys", check);
    const val = Object.values(user);
    console.log("Register me values", val);

    const formData = new FormData();

    formData.append("user[first_Name]", user.firstName);
    formData.append("user[last_Name]", user.lastName);
    formData.append("user[phone]", user.phone);
    formData.append("user[email]", user.email);
    formData.append("user[password]", user.password);
    formData.append("device_detail[device_type]", user.deviceType);
    formData.append("device_detail[player_id]", user.player_id);

    console.log("Form DAta mila ke nahi ", Object.fromEntries(formData));
    let destructr = Object.fromEntries(formData);
    try {
      const resp = await customFetch.post("/api/users/sign_up.json", {
        headers: {
          "Content-Type": "application/json",
        },
        data: destructr,
        // {
        //   firstName: JSON.stringify(user.firstName),
        //   lastName: JSON.stringify(user.lastName),
        //   phone: JSON.stringify(user.phone),
        //   email: JSON.stringify(user.email),
        //   deviceType: JSON.stringify(user.deviceType),
        //   player_id: JSON.stringify(user.player_id),
        //   password: JSON.stringify(user.password),
        // },
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
