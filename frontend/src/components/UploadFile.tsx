import { useState } from "react";
import { uploadData } from "../services/data";

const UploadFile = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    console.log(file);

    const formData = new FormData();
    if (file) {
      formData.append("csv_data", file);
    }
    console.log(formData);
    const data = await uploadData(formData);
    console.log(data);
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
