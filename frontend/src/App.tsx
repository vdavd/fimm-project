import { useState } from "react";
import UploadFile from "./components/UploadFile";
import DrawPlot from "./components/DrawPlot";

const App = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analyzedData, setAnalyzedData] = useState<string | null>(null);

  return (
    <div>
      <p>frontend</p>
      <UploadFile
        file={file}
        setFile={setFile}
        setAnalyzedData={setAnalyzedData}
      />
      <DrawPlot analyzedData={analyzedData} />
    </div>
  );
};

export default App;
