import {
  getAuthTokenFromCookie,
  validateAuthToken,
} from "../api/UserApiFunctions";

export const TokenValidation = async () => {
  var authToken = await getAuthTokenFromCookie();
  var isAuthTokenValid = false;

  if (authToken !== "") {
    await validateAuthToken(authToken)
      .then((response) => {
        if (response.data !== null) {
          if (response.data) {
            isAuthTokenValid = true;
          } else {
            isAuthTokenValid = false;
          }
        }
      })
      .catch(() => (isAuthTokenValid = false));
  } else {
    isAuthTokenValid = false;
  }
  return isAuthTokenValid;
};
