import axios from "axios";
import { apiBaseUrl } from "../constants";

const baseUrl = apiBaseUrl + "/data";

export const uploadData = async (data: FormData) => {
  const response = await axios.post(baseUrl, data);
  return response.data;
};
