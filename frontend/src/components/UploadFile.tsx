import { uploadData } from "../services/data";

interface UploadFileProps {
  file: File | null;
  setFile: (file: File | null) => void;
  setAnalyzedData: (AnalyzedData: string | null) => void;
}
const UploadFile = ({ file, setFile, setAnalyzedData }: UploadFileProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

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
      <div>
        <input
          id="file"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
        />
      </div>
      {file && <div>Name: {file.name}</div>}
      {file && (
        <button onClick={handleUpload} className="submit">
          Upload
        </button>
      )}
    </div>
  );
};

export default UploadFile;
