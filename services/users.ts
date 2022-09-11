import axios from "axios";
import { getCookie } from "cookies-next";
const baseUrl = "/api/users";

const get = async (id: string) => {
  const response = await axios.get(`${baseUrl}/${id}`, {
    headers: { Authorization: `Bearer ${getCookie("token")}` },
  });
  return response.data;
};

const update = async (id: string, user: any) => {
  const response = await axios.put(`${baseUrl}/${id}`, user, {
    headers: { Authorization: `Bearer ${getCookie("token")}` },
  });
  return response.data;
};

export default { get, update };
