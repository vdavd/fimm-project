import { uploadData } from "../services/data";

interface UploadFileProps {
  file: File | null;
  setAnalyzedData: (AnalyzedData: string | null) => void;
}
const UploadFile = ({ file, setAnalyzedData }: UploadFileProps) => {
  const handleUpload = async () => {
    const formData = new FormData();
    if (file) {
      formData.append("csv_data", file);
    }
    const data = await uploadData(formData);
    setAnalyzedData(data);
  };

  return (
    <div>
      {file && (
        <button onClick={handleUpload} className="submit">
          Upload
        </button>
      )}
    </div>
  );
};

export default UploadFile;
