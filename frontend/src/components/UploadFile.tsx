import { uploadData } from "../services/data";
import { Button } from "@mui/material";

interface UploadFileProps {
  file: File | null;
  smilesColumn: string;
  setAnalyzedData: (analyzedData: string) => void;
}
const UploadFile = ({
  file,
  smilesColumn,
  setAnalyzedData,
}: UploadFileProps) => {
  const handleUpload = async () => {
    const formData = new FormData();
    if (file) {
      formData.append("csv_data", file);
      formData.append("smiles_column", smilesColumn);
    }
    const data = await uploadData(formData);
    setAnalyzedData(data);
  };

  return (
    <div>
      {file && (
        <Button onClick={handleUpload} className="submit" variant="contained">
          Upload
        </Button>
      )}
    </div>
  );
};

export default UploadFile;
