import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../axios/axios";
import {
  getSurgeryFromLocalStorage,
  getVerifyAuthTokenFromLocalStorage,
} from "../localStorage/LocalStorageData";

const initialState = {
  open: true,
  surgery: getSurgeryFromLocalStorage(),
  patient:false
};

export const addPatients = createAsyncThunk(
  "user/addPatients",
  async (user, thunkAPI) => {
    console.log("data in regis", user);
    console.log("firstName in registerUser", user.firstName);
    console.log("image...", user.upload.file);
    const formData = new FormData();
    formData.append("user[first_name]", user.firstName);
    formData.append("user[last_name]", user.lastName);
    formData.append("user[email]", user.email);
    formData.append("user[phone]", user.phone);
    formData.append("user[image]", user.upload.file.originFileObj);
    formData.append("patient[date_of_birth]", user.dob);
    formData.append("address[name]", user.addName);
    formData.append("address[line1]", user.addL1);
    formData.append("address[line2]", user.addL2);
    formData.append("address[line3]", user.addL3);
    formData.append("patient[security_question]", user.securityQues);
    formData.append("patient[security_answer]", user.securityAns);

    try {
      const resp = await customFetch({
        url: `api/doctor/patients.json`,
        method: "POST",
        data: formData,
        headers: {
          auth_token: getVerifyAuthTokenFromLocalStorage(),
        },
      });
      console.log("Register Data me Kya mila", resp.data);
      return resp.data;
    } catch (error) {
      console.log("Errror me kya mila", error);
      return thunkAPI.rejectWithValue(error.resp.message);
    }
  }
);

export const getSurgery = createAsyncThunk(
  "user/getSurgery",
  async (searchedPatient, thunkAPI) => {
    try {
      const resp = await customFetch({
        url: "/api/surgeries/search.json",
        method: "GET",
        params: {
          search: searchedPatient,
        },
        headers: {
          auth_token: getVerifyAuthTokenFromLocalStorage(),
        },
      });
      return resp.data;
    } catch (error) {
      console.log("dggdfdfsdfsdfsd", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const patientSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    cancle: (state) => {
      state.open = false;
    },
    openModal: (state) => {
      state.open = true;
    },
  },
  extraReducers: {
    [addPatients.pending]: (state) => {
      state.isLoading = true;
    },
    [addPatients.fulfilled]: (state, actions) => {
      // console.log(
      //   "registerUser.fulfilled",
      //   actions.payload?.data.user.auth_token
      // );
      console.log("ACtions in register", actions.payload.status);

      if (actions.payload.status === 200) {
        // state.isLoading = false;
        console.log("ADDD PATIEN", actions);
        state.open = false;
        state.patient=true
        toast.success(`${actions.payload.message}`);
      } else if (actions.payload.status !== 200) {
        state.isLoading = false;
        toast.error(`${actions.payload.message}`);
      }
    },
    [addPatients.rejected]: (state, actions) => {
      state.isLoading = false;
      toast.error(actions.payload);
    },
    [getSurgery.pending]: (state) => {
      state.isLoading = true;
    },

    [getSurgery.fulfilled]: (state, { payload }) => {
      console.log("Payload me kya miola", payload);
      const { pageData, respDataData, respData } = payload;
      console.log("Payload Destructure", respData);

      if (respData.status === 200) {
      } else {
        toast.error(`${respData.message}`);
        // toast.error(`U are not authorised`);
        state.isLoading = false;
      }
    },
    [getSurgery.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.message);
    },
  },
});

export const { cancle, openModal } = patientSlice.actions;

export default patientSlice.reducer;
