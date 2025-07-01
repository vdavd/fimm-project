import { uploadData } from "../services/data";
import { Button } from "@mui/material";

interface UploadFileProps {
  parsedFile: string;
  smilesColumn: string;
  setAnalyzedData: (analyzedData: string) => void;
}
const UploadFile = ({
  parsedFile,
  smilesColumn,
  setAnalyzedData,
}: UploadFileProps) => {
  const handleUpload = async () => {
    const formData = new FormData();
    if (parsedFile) {
      formData.append("csv_data", parsedFile);
      formData.append("smiles_column", smilesColumn);
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
