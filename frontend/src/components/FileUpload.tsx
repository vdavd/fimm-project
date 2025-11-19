import { uploadPlotData } from "../services/data";
import { Alert, Button, Stack } from "@mui/material";
import type {
  DimRedMethodType,
  PlotDataUploadParams,
  FingerPrintTypeType,
} from "../types";
import { useState } from "react";

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
  const [plotDataError, setPlotDataError] = useState("");

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

      setPlotDataError("");
      try {
        setAnalysisInProcess(true);
        const data = await uploadPlotData(parsedFile, params);
        setAnalyzedData(data);
        setAnalysisInProcess(false);
      } catch (err: any) {
        setAnalysisInProcess(false);
        setPlotDataError(err.message);
      }
    }
  };

  return (
    <div>
      {parsedFile && (
        <Stack direction="row" spacing={2} alignItems="center" sx={{ my: 2 }}>
          <Button
            onClick={handleUpload}
            className="submit"
            variant="contained"
            disabled={buttonDisabled}
            sx={{ my: 2 }}
          >
            Upload
          </Button>
          {plotDataError && (
            <Alert sx={{ my: 2 }} severity="error">
              {plotDataError}
            </Alert>
          )}
        </Stack>
      )}
    </div>
  );
};

export default FileUpload;
