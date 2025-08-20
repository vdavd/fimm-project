import { uploadData } from "../services/data";
import { Button } from "@mui/material";
import type {
  DimRedMethodType,
  FileUploadParams,
  FingerPrintTypeType,
} from "../types";

interface FileUploadProps {
  parsedFile: string;
  smilesColumn: string;
  setAnalyzedData: (analyzedData: string) => void;
  dimRedMethod: DimRedMethodType;
  fingerPrintType: FingerPrintTypeType;
  removeOutliers: boolean;
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
  setAnalysisInProcess,
  buttonDisabled,
}: FileUploadProps) => {
  const handleUpload = async () => {
    if (parsedFile) {
      const params: FileUploadParams = {
        smilesColumn: smilesColumn,
        dimRedMethod: dimRedMethod,
        fingerprintType: fingerPrintType,
        removeOutliers: removeOutliers.toString(),
      };

      setAnalysisInProcess(true);
      const data = await uploadData(parsedFile, params);
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
