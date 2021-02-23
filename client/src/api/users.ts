import { LoginRequest, NewUser } from "../../../common/index";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:9090/api";
export const addNewUser = async (user: NewUser) => {
  try {
    console.log({ user });
    // const postUser = await axios.post("/users", { user });
    // return postUser;
  } catch (error) {
    console.log(error);
    console.log("YOU GOT AN ERROR");
  }
};

export const sendLogin = async (user: LoginRequest) => {
  try {
    console.log({ user });
    // const postUser = await axios.get("/users");
    // return postUser;
  } catch (error) {
    console.log(error);
    console.log("YOU GOT AN ERROR");
  }
};
