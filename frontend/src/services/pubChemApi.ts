import axios from "axios";
import { pubChemApiBaseUrl } from "../constants";

export const getMoleculeData = async (smiles: string) => {
  const encodedSmiles = encodeURIComponent(smiles);
  const url = pubChemApiBaseUrl + encodedSmiles;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status;

      if (statusCode === 404) {
        console.error("Resource not found");
      } else if (statusCode) {
        console.error(`Request failed with status ${statusCode}`);
      } else {
        console.error("Axios error without response:", error.message);
      }
    } else {
      console.error("Non-Axios error:", error);
    }
    return false;
  }
};
