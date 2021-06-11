import axios from "axios";
import Api from "./Api";
import Cookies from "universal-cookie";
import { BASE_URL, TOKEN_TYPE } from './Api';

var cookies = new Cookies();
var user = cookies.get("user");
var authToken = cookies.get("token");

export function getUsernameFromCookie() {
  return user.username;
}

export function getFirstNameFromCookie() {
  return user.firstName;
}

export function getLastNameFromCookie() {
  return user.lastName;
}

export function getEmailFromCookie() {
  return user.email;
}

export function getRoleFromCookie() {
  return user.roles[0];
}

export function getUsers() {
  validateTokenBeforeAxios();
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
  return axios.get("/api/user/all");
}

export function getAuthTokenFromCookie() {
  return authToken;
}

export function validateAuthToken(authToken) {
  return Api("/api/auth/validate/token", {
    method: "POST",
    params: {
      token: authToken,
    },
  });
}

export function validateTokenBeforeAxios() {
  validateAuthToken(authToken).then((res) => {
    if (res.data === false) {
      signOutUser();
    }
  });
}

export function signInUser(usernameInput, passwordInput) {
  return Api("/api/auth/signin", {
    method: "POST",
    data: {
      username: usernameInput,
      password: passwordInput,
    },
  });
}

export function setUserCookie(user, expiryDate) {
  cookies.set("user", JSON.stringify(user), {
    path: "/",
    expires: expiryDate,
  });
}

export function setTokenCookie(authToken, expiryDate) {
  cookies.set("token", authToken, {
    path: "/",
    expires: expiryDate,
  });
}

export function signOutUser() {
  cookies.remove("user", { path: "/" });
  cookies.remove("token", { path: "/" });
  window.location.replace("/signin");
}

export function getUserId(username) {
  validateTokenBeforeAxios();
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
  return axios.get("/api/user/get/id/" + username);
}

export function getUserIdFromCookie() {
  return user.id;
}

export function getUserAvatar(id) {
  validateTokenBeforeAxios();
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
  return axios.get("/api/user/" + id + "/avatar");
}

export function createUser(username, firstName, lastName, email, password, desired_role) {
  validateTokenBeforeAxios();
  const data = {};
  data["username"] = username;
  data["firstName"] = firstName;
  data["lastName"] = lastName;
  data["email"] = email;
  var role = [desired_role]; // ['admin'] or ['user'] / other
  data["role"] = role;
  data["password"] = password;
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
  return axios.post("/api/auth/signup", data);
}

export function updateUserAvatar(id, formData) {
  validateTokenBeforeAxios();
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
  return axios.put("/api/user/" + id + "/update-avatar", formData, {
    headers: { "content-type": "multipart/form-data" },
  });
}

export function updateUser(id, username, firstName, lastName, email, password) {
  validateTokenBeforeAxios();
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
  return axios.put("/api/user/" + id + "/update", null, {
    params: {
      username,
      firstName,
      lastName,
      email,
      password,
    },
  });
}

export function deleteUser(id) {
  validateTokenBeforeAxios();
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
  return axios.delete("/api/user/" + id + "/delete");
}

export function updatePassword(id, oldPassword, newPassword) {
  validateTokenBeforeAxios();
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers = { Authorization: TOKEN_TYPE + authToken };
  return axios.put("/api/user/" + id + "/update-password", null, {
    params: {
      oldPassword,
      newPassword,
    },
  });
}
