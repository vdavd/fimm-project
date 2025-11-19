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
  const response = await axios.post(url, data, {
    headers: { "Content-Type": "text/csv" },
    params,
  });
  return response.data;
};

export const uploadSimilarityData = async (
  data: string,
  params: SimilarityDataUploadParams
) => {
  const url = apiBaseUrl + "/similarityData";
  const response = await axios.post(url, data, {
    headers: { "Content-Type": "text/csv" },
    params,
    paramsSerializer: {
      indexes: null,
    },
  });
  return response.data;
};
