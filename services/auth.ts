import axios from "axios";
import { IAuth } from "types/token";
const baseUrl = "/api/auth";

const login = async (user: IAuth) => {
  const response = await axios.post(`${baseUrl}/login`, user);
  return response.data;
};

const register = async (user: IAuth) => {
  const response = await axios.post(`${baseUrl}/register`, user);
  return response.data;
};

export default { login, register };
