export const setFirebaseToken = async (token) => {
  await localStorage.setItem("firebaseauthToken", token);
};
export const getFirebaseToken = async () => {
  let token = await localStorage.getItem("firebaseauthToken");
  return token;
};
