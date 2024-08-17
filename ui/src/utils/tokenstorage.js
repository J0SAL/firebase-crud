export const addJwtToken = (token) => {
  localStorage.setItem("jwttoken", token);
};
export const getJwtToken = () => {
  let token = localStorage.getItem("jwttoken");
  return token;
};

export const removeJwtToken = () => {
  localStorage.removeItem("jwttoken");
};
