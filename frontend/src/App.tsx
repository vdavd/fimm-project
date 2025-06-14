import { useState } from "react";
import { Box, Paper } from "@mui/material";
import UploadFile from "./components/UploadFile";
import DrawPlot from "./components/DrawPlot";
import ColumnSelect from "./components/ColumnSelect";
import SelectFile from "./components/SelectFile";
import LabelTypeSelect from "./components/LabelTypeSelect";

const App = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analyzedData, setAnalyzedData] = useState("");
  const [smilesColumn, setSmilesColumn] = useState("");
  const [labelColumn, setLabelColumn] = useState("");
  const [labelType, setLabelType] = useState("");

  return (
    <div>
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          //backgroundColor: "#f0f0f0",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            minWidth: "50vw",
            minHeight: "85vh",
            borderRadius: 2,
            opacity: 1,
          }}
        >
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
          {file && (
            <LabelTypeSelect
              labelType={labelType}
              setLabelType={setLabelType}
            />
          )}
          <UploadFile
            file={file}
            smilesColumn={smilesColumn}
            setAnalyzedData={setAnalyzedData}
          />
          {analyzedData && labelColumn && (
            <DrawPlot
              analyzedData={analyzedData}
              labelColumn={labelColumn}
              labelType={labelType}
            />
          )}
        </Paper>
      </Box>
    </div>
  );
};

export default App;
