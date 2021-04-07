import { LoginRequest, NewUser } from "../../../common/index";
import axios from "axios";

axios.defaults.baseURL = "https://reci-pie-server.herokuapp.com/api";

export const addNewUser = async (user: NewUser) => {
  const postUser = await axios.post("/users", { user });
  return postUser;
};

export const sendLogin = async (user: LoginRequest) => {
  const loginResponse = await axios.post("/users/login", { user });
  return loginResponse.data;
};
