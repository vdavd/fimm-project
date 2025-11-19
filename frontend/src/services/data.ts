import axios from "axios";
import { apiBaseUrl } from "../constants";
import type {
  PlotDataUploadParams,
  SimilarityDataUploadParams,
} from "../types";

export const uploadPlotData = async (
  data: string,
  params: PlotDataUploadParams
) => {
  const url = apiBaseUrl + "/plotData";
  try {
    const response = await axios.post(url, data, {
      headers: { "Content-Type": "text/csv" },
      params,
    });
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.status === 400) {
      console.error("Backend validation error:", err.response.data.detail);
      throw new Error(err.response.data.detail);
    } else {
      console.error("Unknown error:", err);
      throw new Error("An unknown error occurred");
    }
  }
};

export const uploadSimilarityData = async (
  data: string,
  params: SimilarityDataUploadParams
) => {
  const url = apiBaseUrl + "/similarityData";

  try {
    const response = await axios.post(url, data, {
      headers: { "Content-Type": "text/csv" },
      params,
      paramsSerializer: {
        indexes: null,
      },
    });
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.status === 400) {
      console.error("Backend validation error:", err.response.data.detail);
      throw new Error(err.response.data.detail);
    } else {
      console.error("Unknown error:", err);
      throw new Error("An unknown error occurred");
    }
  }
};
