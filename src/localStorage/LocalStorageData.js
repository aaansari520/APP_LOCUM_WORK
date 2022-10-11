export const addUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
  //   localStorage.setItem("user", user);
};

export const addAuthTokenToLocalStorage = (token) => {
  localStorage.setItem("auth", JSON.stringify(token));
  //   localStorage.setItem("user", user);
};

export const addVerifyAuthTokenToLocalStorage = (token) => {
  localStorage.setItem("auth", JSON.stringify(token));
  //   localStorage.setItem("user", user);
};

export const removeAuthTokenFromLocalStorage = () => {
  localStorage.removeItem("auth");
};

export const removeVerifyAuthTokenFromLocalStorage = () => {
  localStorage.removeItem("auth");
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem("user");
  const user = result ? JSON.parse(result) : null;
  console.log("User in get user funct", user);
  console.log("result in get user funct", result);
  return user;
};

export const getAuthTokenFromLocalStorage = () => {
  const result = localStorage.getItem("auth");
  const auth = result ? JSON.parse(result) : null;
  console.log("auth in get user funct", auth);
  console.log("result in get user funct", result);
  return auth;
};

export const getVerifyAuthTokenFromLocalStorage = () => {
  const result = localStorage.getItem("auth");
  const auth1 = result ? JSON.parse(result) : null;
  console.log(
    "getVerifyAuthTokenFromLocalStorage funct",
    JSON.stringify(auth1)
  );

  return auth1;
};
