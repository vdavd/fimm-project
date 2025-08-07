import { useEffect, useRef, useState } from "react";
import { Box, Container, Paper, Typography } from "@mui/material";
import UploadFile from "./components/UploadFile";
import DrawPlot from "./components/DrawPlot";
import ColumnSelect from "./components/ColumnSelect";
import SelectFile from "./components/SelectFile";
import LabelTypeSelect from "./components/LabelTypeSelect";
import type { FingerPrintTypeType, DimRedMethodType, LabelType } from "./types";
import DimRedMethodSelect from "./components/DimRedMethodSelect";
import FingerPrintTypeSelect from "./components/FingerPrintTypeSelect";
import RemoveOutliersSelect from "./components/RemoveOutliersSelect";
import PlotSkeleton from "./components/PlotSkeleton";

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
  const [analysisInProcess, setAnalysisInProcess] = useState(false);

  const scrollTargetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (analysisInProcess && scrollTargetRef.current) {
      scrollTargetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [analysisInProcess]);

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: "90%",
          minHeight: "90vh",
          px: 4,
          py: 3,
          borderRadius: 5,
          backgroundColor: "rgba(255, 255, 255, 0.3)",
        }}
      >
        {file ? (
          <>
            <Typography variant="h4" textAlign="center">
              Molecular Similarity Tool
            </Typography>
            <SelectFile
              size="small"
              setFile={setFile}
              setSmilesColumn={setSmilesColumn}
              setLabelColumn={setLabelColumn}
              setAnalyzedData={setAnalyzedData}
            />

            <Paper
              elevation={3}
              sx={{
                display: "flex",
                flexDirection: "column",
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "50%",
                    ml: 2,
                  }}
                >
                  <FingerPrintTypeSelect
                    fingerPrintType={fingerPrintType}
                    setFingerPrintType={setFingerPrintType}
                  />
                  <DimRedMethodSelect
                    dimRedMethod={dimRedMethod}
                    setDimRedMethod={setDimRedMethod}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "50%",
                    ml: 2,
                  }}
                >
                  <LabelTypeSelect
                    labelType={labelType}
                    setLabelType={setLabelType}
                  />

                  <RemoveOutliersSelect
                    removeOutliers={removeOutliers}
                    setremoveOutliers={setremoveOutliers}
                  />
                </Box>
              </Box>
              {parsedFile && smilesColumn && labelColumn && labelType && (
                <UploadFile
                  parsedFile={parsedFile}
                  smilesColumn={smilesColumn}
                  setAnalyzedData={setAnalyzedData}
                  dimRedMethod={dimRedMethod}
                  fingerPrintType={fingerPrintType}
                  setAnalysisInProcess={setAnalysisInProcess}
                />
              )}
            </Paper>
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              mt: 4,
              gap: 4,
            }}
          >
            <Typography variant="h2" textAlign="center">
              Molecular Similarity Tool
            </Typography>
            <SelectFile
              size="large"
              setFile={setFile}
              setSmilesColumn={setSmilesColumn}
              setLabelColumn={setLabelColumn}
              setAnalyzedData={setAnalyzedData}
            />
          </Box>
        )}

        <div ref={scrollTargetRef}>
          {analysisInProcess ? (
            <PlotSkeleton />
          ) : (
            analyzedData &&
            labelColumn && (
              <DrawPlot
                analyzedData={analyzedData}
                labelColumn={labelColumn}
                smilesColumn={smilesColumn}
                labelType={labelType}
                highlightedSmiles={highlightedSmiles}
                dimRedMethod={dimRedMethod}
                removeOutliers={removeOutliers}
              />
            )
          )}
        </div>
      </Paper>
    </Container>
  );
};

export default App;
