import axios from "axios";
import { chemblApiBaseUrl } from "../constants";

export const getMoleculeData = async (smiles: string) => {
  console.log(smiles);
  const encodedSmiles = encodeURIComponent(smiles);
  console.log(encodedSmiles);
  const url = chemblApiBaseUrl + encodedSmiles + "?format=json";

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
  }
};
