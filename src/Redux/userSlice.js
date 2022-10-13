import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../axios/axios";
import {
  addAuthTokenToLocalStorage,
  addEmailToLocalStorage,
  addPatientToLocalStorage,
  addUserToLocalStorage,
  addVerifyAuthTokenToLocalStorage,
  getEmailFromLocalStorage,
  getPatientsFromLocalStorage,
  getUserFromLocalStorage,
  getVerifyAuthTokenFromLocalStorage,
  removeAuthTokenFromLocalStorage,
  removeEmailFromLocalStorage,
  removePatientsFromLocalStorage,
  removeUserFromLocalStorage,
  removeVerifyAuthTokenFromLocalStorage,
} from "../localStorage/LocalStorageData";

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
  auth: getVerifyAuthTokenFromLocalStorage(),
  showNav: true,
  userData: getPatientsFromLocalStorage(),
  showPatient: false,
  searchValue: "",
  email: getEmailFromLocalStorage(),
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

export const getUser = createAsyncThunk(
  "user/getUser",
  async (search, thunkAPI) => {
    try {
      const resp = await customFetch({
        url: "/api/doctor/patients.json",
        method: "GET",
        params: {
          search: search,
        },
        headers: {
          auth_token: getVerifyAuthTokenFromLocalStorage(),
        },
      });
      console.log("getUser me response", resp.data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.resp.message);
    }
  }
);

// catch (error) {
//   return thunkAPI.rejectWithValue(error.resp.message);
// }

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    console.log("login", user);
    addEmailToLocalStorage(user.email);

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
      console.log("Verifying user me data", resp.data);
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
      console.log("logOutUser me data", resp.data);
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
    searchBased: (state, actions) => {
      console.log("searchedText in reducer", actions.payload);
      state.userData = null;
      removePatientsFromLocalStorage();
      // toast.error(`Oops you cleared the field! No data to show!`);
    },
    notVerified: (state) => {
      state.user = null;
      state.showNav = true;
      state.email = null;
      removeEmailFromLocalStorage();
      removeUserFromLocalStorage();
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
        state.user = user1;
        addUserToLocalStorage(user1);
        toast.success(`Welcome ${user1.firstName}  ${user1.lastName}`);
        state.isLoading = false;
      } else if (actions.payload.status !== 200) {
        state.isLoading = false;
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
      if (actions.payload.status === 200) {
        state.showNav = true;
        const verifyAuthToken = actions.payload?.data.user.auth_token;
        addVerifyAuthTokenToLocalStorage(verifyAuthToken);
        state.auth = verifyAuthToken;
        toast.success(`${actions.payload.message}`);
        state.isLoading = false;
      } else {
        state.isLoading = false;
        toast.error(`${actions.payload.message}`);
      }
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
        state.showNav = true;
        const user = actions.payload.data;
        console.log("user kya mila sign in me", actions);
        state.user = user;
        state.email = getEmailFromLocalStorage();
        addUserToLocalStorage(user);
        toast.success(`${actions.payload.message}`);
        state.isLoading = false;
      } else if (actions.payload.status !== 200) {
        state.isLoading = false;
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
      state.user = null;
      state.auth = null;
      state.userData = null;
      state.email = null;
      removeEmailFromLocalStorage();
      removeAuthTokenFromLocalStorage();
      removeUserFromLocalStorage();
      removeVerifyAuthTokenFromLocalStorage();
      removePatientsFromLocalStorage();
      toast.success(`${actions.payload.message}`);
      state.isLoading = false;
    },
    [logOutUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [getUser.pending]: (state) => {
      state.isLoading = true;
    },

    [getUser.fulfilled]: (state, actions) => {
      if (actions.payload.status === 200) {
        // state.showNav = false;
        console.log("User Data", actions.payload.data);
        state.userData = actions.payload.data;
        addPatientToLocalStorage(state.userData);
        state.showPatient = true;
        toast.success(`${actions.payload.message}`);
        state.isLoading = false;
      } else {
        toast.error(`${actions.payload.message}`);
        state.isLoading = false;
      }
    },
    [getUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { logoutUser, searchBased, notVerified } = userSlice.actions;

export default userSlice.reducer;
