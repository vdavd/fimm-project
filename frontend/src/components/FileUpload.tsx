import { uploadPlotData } from "../services/data";
import { Button } from "@mui/material";
import type {
  DimRedMethodType,
  PlotDataUploadParams,
  FingerPrintTypeType,
} from "../types";

interface FileUploadProps {
  parsedFile: string;
  smilesColumn: string;
  setAnalyzedData: (analyzedData: string) => void;
  dimRedMethod: DimRedMethodType;
  fingerPrintType: FingerPrintTypeType;
  removeOutliers: boolean;
  numberNeighborsUmap: number | null;
  setAnalysisInProcess: (analysisInProcess: boolean) => void;
  buttonDisabled: boolean;
}
const FileUpload = ({
  parsedFile,
  smilesColumn,
  setAnalyzedData,
  dimRedMethod,
  fingerPrintType,
  removeOutliers,
  numberNeighborsUmap,
  setAnalysisInProcess,
  buttonDisabled,
}: FileUploadProps) => {
  const handleUpload = async () => {
    const checkNumberNeighbors = (numberNeighbors: number | null): number => {
      if (typeof numberNeighbors !== "number") {
        return 25;
      } else {
        return numberNeighbors;
      }
    };
    if (parsedFile) {
      const params: PlotDataUploadParams = {
        smilesColumn: smilesColumn,
        dimRedMethod: dimRedMethod,
        fingerprintType: fingerPrintType,
        removeOutliers: removeOutliers.toString(),
        numberNeighborsUmap: checkNumberNeighbors(numberNeighborsUmap),
      };

      setAnalysisInProcess(true);
      const data = await uploadPlotData(parsedFile, params);
      setAnalyzedData(data);
      setAnalysisInProcess(false);
    }
  };

  return (
    <div>
      {parsedFile && (
        <Button
          onClick={handleUpload}
          className="submit"
          variant="contained"
          disabled={buttonDisabled}
          sx={{ my: 2 }}
        >
          Upload
        </Button>
      )}
    </div>
  );
};

export default FileUpload;
