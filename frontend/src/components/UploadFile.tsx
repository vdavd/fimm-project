import { uploadData } from "../services/data";
import { Button } from "@mui/material";
import type { DimRedMethodType } from "../types";

interface UploadFileProps {
  parsedFile: string;
  smilesColumn: string;
  setAnalyzedData: (analyzedData: string) => void;
  dimRedMethod: DimRedMethodType;
}
const UploadFile = ({
  parsedFile,
  smilesColumn,
  setAnalyzedData,
  dimRedMethod,
}: UploadFileProps) => {
  const handleUpload = async () => {
    const formData = new FormData();
    if (parsedFile) {
      formData.append("csv_data", parsedFile);
      formData.append("smiles_column", smilesColumn);
      formData.append("dim_red_method", dimRedMethod);
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
