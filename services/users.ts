import axios from "axios";
import { getCookie } from "cookies-next";
import { ModelUser } from "types/user";
const baseUrl = "/api/users";

const get = async (id: string) => {
  const response = await axios.get(`${baseUrl}/${id}`, {
    headers: { Authorization: `Bearer ${getCookie("token")}` },
  });
  return response.data;
};

const update = async (id: string, user: ModelUser) => {
  const response = await axios.put(`${baseUrl}/${id}`, user, {
    headers: { Authorization: `Bearer ${getCookie("token")}` },
  });
  return response.data;
};

export default { get, update };
