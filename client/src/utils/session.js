export const getUser = () => {
  const user = sessionStorage.getItem("user");
  return user ? user : null;
};

export const isLoggedIn = () => {
  return !!sessionStorage.getItem("user");
};
