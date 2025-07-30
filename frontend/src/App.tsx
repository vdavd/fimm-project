import { useState } from "react";
import { Box, Paper } from "@mui/material";
import UploadFile from "./components/UploadFile";
import DrawPlot from "./components/DrawPlot";
import ColumnSelect from "./components/ColumnSelect";
import SelectFile from "./components/SelectFile";
import LabelTypeSelect from "./components/LabelTypeSelect";
import type { FingerPrintTypeType, DimRedMethodType, LabelType } from "./types";
import DimRedMethodSelect from "./components/DimRedMethodSelect";
import FingerPrintTypeSelect from "./components/FingerPrintTypeSelect";
import RemoveOutliersSelect from "./components/RemoveOutliersSelect";

const App = () => {
  const [file, setFile] = useState<File | null>(null);
  const [parsedFile, setParsedFile] = useState("");
  const [analyzedData, setAnalyzedData] = useState("");
  const [smilesColumn, setSmilesColumn] = useState("");
  const [labelColumn, setLabelColumn] = useState("");
  const [labelType, setLabelType] = useState<LabelType>("");
  const [highlightedSmiles, setHighlightedSmiles] = useState<string[]>([]);
  const [dimRedMethod, setDimRedMethod] = useState<DimRedMethodType>("PCA");
  const [fingerPrintType, setFingerPrintType] =
    useState<FingerPrintTypeType>("Morgan");
  const [removeOutliers, setremoveOutliers] = useState(false);

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
            maxWidth: "75%",
            minHeight: "85vh",
            px: 4,
            py: 3,
            borderRadius: 5,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
          }}
        >
          <SelectFile
            setFile={setFile}
            setSmilesColumn={setSmilesColumn}
            setLabelColumn={setLabelColumn}
            setAnalyzedData={setAnalyzedData}
          />

          {file && (
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
              <ColumnSelect
                file={file}
                smilesColumn={smilesColumn}
                labelColumn={labelColumn}
                setParsedFile={setParsedFile}
                setSmilesColumn={setSmilesColumn}
                setLabelColumn={setLabelColumn}
                setLabelType={setLabelType}
                setHighlightedSmiles={setHighlightedSmiles}
              />
              <LabelTypeSelect
                labelType={labelType}
                setLabelType={setLabelType}
              />
              <DimRedMethodSelect
                dimRedMethod={dimRedMethod}
                setDimRedMethod={setDimRedMethod}
              />
              <FingerPrintTypeSelect
                fingerPrintType={fingerPrintType}
                setFingerPrintType={setFingerPrintType}
              />
              <RemoveOutliersSelect
                removeOutliers={removeOutliers}
                setremoveOutliers={setremoveOutliers}
              />
              {parsedFile && smilesColumn && labelColumn && labelType && (
                <UploadFile
                  parsedFile={parsedFile}
                  smilesColumn={smilesColumn}
                  setAnalyzedData={setAnalyzedData}
                  dimRedMethod={dimRedMethod}
                  fingerPrintType={fingerPrintType}
                />
              )}
            </Paper>
          )}

          {analyzedData && labelColumn && (
            <DrawPlot
              analyzedData={analyzedData}
              labelColumn={labelColumn}
              labelType={labelType}
              highlightedSmiles={highlightedSmiles}
              dimRedMethod={dimRedMethod}
              removeOutliers={removeOutliers}
            />
          )}
        </Paper>
      </Box>
    </div>
  );
};

export default App;
