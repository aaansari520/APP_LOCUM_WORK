// >>>>>>>>>>>>>>>>>>>...The USER...<<<<<<<<<<<<<<<<

import { toast } from "react-toastify";

export const addUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
  //   localStorage.setItem("user", user);
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem("user");
  const user = result ? JSON.parse(result) : null;
  // console.log("User in get user funct", user);
  // console.log("result in get user funct", result);
  return user;
};

// >>>>>>>>>>>>>>>>>>>...Auth Token...<<<<<<<<<<<<<<<<

export const addAuthTokenToLocalStorage = (token) => {
  localStorage.setItem("auth", JSON.stringify(token));
  //   localStorage.setItem("user", user);
};

export const removeAuthTokenFromLocalStorage = () => {
  localStorage.removeItem("auth");
};

export const getAuthTokenFromLocalStorage = () => {
  const result = localStorage.getItem("auth");
  const auth = result ? JSON.parse(result) : null;
  // console.log("auth in get user funct", auth);
  // console.log("result in get user funct", result);
  return auth;
};

// >>>>>>>>>>>>>>>>>>>..Verified Auth Token...<<<<<<<<<<<<<<<<

export const addVerifyAuthTokenToLocalStorage = (token) => {
  localStorage.setItem("verifiedAuth", JSON.stringify(token));
  //   localStorage.setItem("user", user);
};

export const getVerifyAuthTokenFromLocalStorage = () => {
  const result = localStorage.getItem("verifiedAuth");
  const auth1 = result ? JSON.parse(result) : null;

  return auth1;
};

export const removeVerifyAuthTokenFromLocalStorage = () => {
  localStorage.removeItem("verifiedAuth");
};

// >>>>>>>>>>>>>>>>>>>>...Patient...<<<<<<<<<<<<<<<

export const addPatientToLocalStorage = (patient) => {
  localStorage.setItem("patient", JSON.stringify(patient));
};

export const getPatientsFromLocalStorage = () => {
  const result = localStorage.getItem("patient");
  const patient = result ? JSON.parse(result) : null;

  return patient;
};

export const removePatientsFromLocalStorage = () => {
  localStorage.removeItem("patient");
  // toast.info(`Please serach something in the input field...`);
};

// >>>>>>>>>>>>>>>>>>>>...Email...<<<<<<<<<<<<<<<

export const addEmailToLocalStorage = (email) => {
  localStorage.setItem("email", JSON.stringify(email));
};

export const getEmailFromLocalStorage = () => {
  const result = localStorage.getItem("email");
  const Email = result ? JSON.parse(result) : null;

  return Email;
};

export const removeEmailFromLocalStorage = () => {
  localStorage.removeItem("email");
};

// >>>>>>>>>>>>>>>>>>>>...SURGERY...<<<<<<<<<<<<<<<

export const addSurgeryToLocalStorage = (surgery) => {
  localStorage.setItem("surgery", JSON.stringify(surgery));
};

export const getSurgeryFromLocalStorage = () => {
  const result = localStorage.getItem("surgery");
  const Surgery = result ? JSON.parse(result) : null;

  return Surgery;
};

export const removeSurgeryFromLocalStorage = () => {
  localStorage.removeItem("surgery");
};

// >>>>>>>>>>>>>>>>>>>>...SURGERY ID...<<<<<<<<<<<<<<<

export const addSurgeryIDToLocalStorage = (surgeryID) => {
  localStorage.setItem("surgeryID", JSON.stringify(surgeryID));
};

export const getSurgeryIDFromLocalStorage = () => {
  const result = localStorage.getItem("surgeryID");
  const surgeryID = result ? JSON.parse(result) : null;

  return surgeryID;
};

export const removeSurgeryIDFromLocalStorage = () => {
  localStorage.removeItem("surgeryID");
};
