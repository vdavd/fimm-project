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
          minHeight: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: "55%",
            minHeight: "85vh",
            px: 4,
            py: 3,
            borderRadius: 5,
            backgroundColor: "rgba(255, 255, 255, 0.6)",
          }}
        >
          <SelectFile
            setFile={setFile}
            setSmilesColumn={setSmilesColumn}
            setLabelColumn={setLabelColumn}
            setAnalyzedData={setAnalyzedData}
          />
          <Paper
            elevation={3}
            sx={{
              px: 4,
              py: 3,
              my: 4,
              backgroundColor: "#f8f8f8",
              borderRadius: 3,
            }}
          >
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
          </Paper>
          <UploadFile
            file={file}
            smilesColumn={smilesColumn}
            setAnalyzedData={setAnalyzedData}
          />
          <Paper
            elevation={3}
            sx={{
              px: 4,
              py: 3,
              my: 2,
              backgroundColor: "#f8f8f8",
              borderRadius: 3,
            }}
          >
            {analyzedData && labelColumn && (
              <DrawPlot
                analyzedData={analyzedData}
                labelColumn={labelColumn}
                labelType={labelType}
              />
            )}
          </Paper>
        </Paper>
      </Box>
    </div>
  );
};

export default App;
