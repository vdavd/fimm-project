import { useState } from "react";
import UploadFile from "./components/UploadFile";
import DrawPlot from "./components/DrawPlot";
import ColumnSelect from "./components/ColumnSelect";
import SelectFile from "./components/SelectFile";

const App = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analyzedData, setAnalyzedData] = useState("");
  const [smilesColumn, setSmilesColumn] = useState("");
  const [labelColumn, setLabelColumn] = useState("");

  return (
    <div>
      <p>frontend</p>
      <SelectFile
        setFile={setFile}
        setSmilesColumn={setSmilesColumn}
        setLabelColumn={setLabelColumn}
        setAnalyzedData={setAnalyzedData}
      />
      {file && (
        <ColumnSelect
          file={file}
          smilesColumn={smilesColumn}
          labelColumn={labelColumn}
          setSmilesColumn={setSmilesColumn}
          setLabelColumn={setLabelColumn}
        />
      )}
      <UploadFile
        file={file}
        smilesColumn={smilesColumn}
        setAnalyzedData={setAnalyzedData}
      />
      {analyzedData && labelColumn && (
        <DrawPlot analyzedData={analyzedData} labelColumn={labelColumn} />
      )}
    </div>
  );
};

export default App;
