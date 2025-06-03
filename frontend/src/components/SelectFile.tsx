import { useState } from "react";

const SelectFile = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    return;
  };

  return (
    <div>
      <div>
        <input id="file" type="file" onChange={handleFileChange} />
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

export default SelectFile;
