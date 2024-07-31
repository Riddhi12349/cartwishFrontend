import { jwtDecode } from "jwt-decode";
import apiClient from "../utils/api-client";

export function signup(user, profile) {
  const body = new FormData();
  body.append("name", user.name);
  body.append("email", user.email);
  body.append("password", user.password);
  body.append("deliveryAddress", user.deliveryAddress);
  body.append("profilePic", profile);

  return apiClient.post("/user/signup", body);
}

export function login(user) {
  return apiClient.post("/user/login", user);
}

export function getJwt() {
  return localStorage.getItem("token");
}

export function getUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}
