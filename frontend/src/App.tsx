import { useState } from "react";
import UploadFile from "./components/UploadFile";
import DrawPlot from "./components/DrawPlot";
import ColumnSelect from "./components/ColumnSelect";
import SelectFile from "./components/SelectFile";

const App = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analyzedData, setAnalyzedData] = useState<string | null>(null);

  return (
    <div>
      <p>frontend</p>
      <SelectFile setFile={setFile} />
      {file && <ColumnSelect file={file} />}
      <UploadFile file={file} setAnalyzedData={setAnalyzedData} />
      <DrawPlot analyzedData={analyzedData} />
    </div>
  );
};

export default App;
