import axios from "axios";
import { apiBaseUrl } from "../constants";
import type { FileUploadParams } from "../types";

const baseUrl = apiBaseUrl + "/data";

export const uploadData = async (data: string, params: FileUploadParams) => {
  const response = await axios.post(baseUrl, data, {
    headers: { "Content-Type": "text/csv" },
    params,
  });
  return response.data;
};
