export const setJwtToken = (token) => {
  localStorage.setItem("jwttoken", token);
};
export const getJwtToken = () => {
  let token = localStorage.getItem("jwttoken");
  return token;
};
