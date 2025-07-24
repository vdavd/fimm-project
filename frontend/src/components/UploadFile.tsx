import { uploadData } from "../services/data";
import { Button } from "@mui/material";
import type { DimRedMethodType, FingerPrintTypeType } from "../types";

interface UploadFileProps {
  parsedFile: string;
  smilesColumn: string;
  setAnalyzedData: (analyzedData: string) => void;
  dimRedMethod: DimRedMethodType;
  fingerPrintType: FingerPrintTypeType;
}
const UploadFile = ({
  parsedFile,
  smilesColumn,
  setAnalyzedData,
  dimRedMethod,
  fingerPrintType,
}: UploadFileProps) => {
  const handleUpload = async () => {
    const formData = new FormData();
    if (parsedFile) {
      formData.append("csv_data", parsedFile);
      formData.append("smiles_column", smilesColumn);
      formData.append("dim_red_method", dimRedMethod);
      formData.append("fingerprint_type", fingerPrintType);
    }
    const data = await uploadData(formData);
    setAnalyzedData(data);
  };

  return (
    <div>
      {parsedFile && (
        <Button
          onClick={handleUpload}
          className="submit"
          variant="contained"
          sx={{ my: 2 }}
        >
          Upload
        </Button>
      )}
    </div>
  );
};

export default UploadFile;
