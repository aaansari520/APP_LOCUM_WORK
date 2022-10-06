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
  return user;
};
