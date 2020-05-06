import { generate } from "rand-token";

export const generateToken = () => generate(16);

export const getLocalStorageUser = () => localStorage.getItem("USER_TOKEN");

export const setLocalStorageUser = (token) =>
  localStorage.setItem("USER_TOKEN", token);
