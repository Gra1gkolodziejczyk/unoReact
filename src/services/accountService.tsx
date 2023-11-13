import Axios from "./caller.service";

export function login(credentials: object) {
  return Axios.post("/users/auth/login", credentials);
}

export function register(credentials: object) {
  return Axios.post("/users/auth/sign-up", credentials);
}

export function saveToken(token: string) {
  if (token) {
    window.localStorage["jwtToken"] = token;
  } else {
    window.localStorage.setItem("jwtToken", token);
  }
}

export function logout() {
  window.localStorage.removeItem("jwtToken");
}

export function getToken() {
  return window.localStorage["jwtToken"];
}

export function isLoggedIn() {
  const token = getToken();
  let payload;

  if (token) {
    payload = token.split(".")[1];
    payload = window.atob(payload);
    payload = JSON.parse(payload);

    return payload.exp > Date.now() / 1000;
  } else {
    return false;
  }
}
