import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Box,
  Container,
  Fade,
  Paper,
  Slide,
  Typography,
} from "@mui/material";
import UploadFile from "./FileUpload";
import InteractivePlot from "./InteractivePlot";
import ColumnSelect from "./ColumnSelect";
import SelectFile from "./SelectFile";
import LabelTypeSelect from "./LabelTypeSelect";
import type {
  FingerPrintTypeType,
  DimRedMethodType,
  LabelType,
} from "../types";
import DimRedMethodSelect from "./DimRedMethodSelect";
import FingerPrintTypeSelect from "./FingerPrintTypeSelect";
import RemoveOutliersSelect from "./RemoveOutliersSelect";
import PlotSkeleton from "./PlotSkeleton";
import NavBar from "./NavBar";
import SelectExampleData from "./SelectExampleData";
import HeaderBar from "./HeaderBar";

const HomePage = () => {
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
  const [numberNeighborsUmap, setNumberNeighborsUmap] = useState<number | null>(
    25
  );
  const [analysisInProcess, setAnalysisInProcess] = useState(false);
  const [fileReady, setFileReady] = useState(false);
  const [fileSelectError, setFileSelectError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  const scrollTargetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoaded(true);
  }, []);

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
      <Fade in={loaded} timeout={800}>
        <Box>
          <NavBar />
        </Box>
      </Fade>

      <Box
        sx={{
          width: "100%",
          maxWidth: "90%",
          minHeight: analyzedData ? "210vh" : "90vh",
          px: 4,
          py: 3,
        }}
      >
        {file ? (
          <>
            <Fade in={fileReady} timeout={800}>
              <Box>
                <HeaderBar />
              </Box>
            </Fade>
            <Slide in={fileReady} timeout={800} direction="up">
              <Paper
                elevation={10}
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  px: 4,
                  py: 3,
                  my: 4,
                  borderRadius: 3,
                }}
              >
                <SelectFile
                  size="small"
                  setFile={setFile}
                  setSmilesColumn={setSmilesColumn}
                  setLabelColumn={setLabelColumn}
                  setAnalyzedData={setAnalyzedData}
                  setFileReady={setFileReady}
                  setFileSelectError={setFileSelectError}
                />
                {fileSelectError && (
                  <Alert
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 180,
                    }}
                    severity="error"
                  >
                    {fileSelectError}
                  </Alert>
                )}
                <ColumnSelect
                  file={file}
                  smilesColumn={smilesColumn}
                  labelColumn={labelColumn}
                  setParsedFile={setParsedFile}
                  setSmilesColumn={setSmilesColumn}
                  setLabelColumn={setLabelColumn}
                  setLabelType={setLabelType}
                  setHighlightedSmiles={setHighlightedSmiles}
                  analyzedData={analyzedData}
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
                      pl: 2,
                      borderLeft: "2px solid #ccc",
                    }}
                  >
                    <FingerPrintTypeSelect
                      fingerPrintType={fingerPrintType}
                      setFingerPrintType={setFingerPrintType}
                    />
                    <DimRedMethodSelect
                      dimRedMethod={dimRedMethod}
                      setDimRedMethod={setDimRedMethod}
                      numberNeighborsUmap={numberNeighborsUmap}
                      setNumberNeighborsUmap={setNumberNeighborsUmap}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "50%",
                      ml: 2,
                      pl: 2,
                      borderLeft: "2px solid #ccc",
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
                <UploadFile
                  parsedFile={parsedFile}
                  smilesColumn={smilesColumn}
                  setAnalyzedData={setAnalyzedData}
                  dimRedMethod={dimRedMethod}
                  fingerPrintType={fingerPrintType}
                  removeOutliers={removeOutliers}
                  numberNeighborsUmap={numberNeighborsUmap}
                  setAnalysisInProcess={setAnalysisInProcess}
                  buttonDisabled={
                    !(parsedFile && smilesColumn && labelColumn && labelType)
                  }
                />
              </Paper>
            </Slide>
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Fade in={loaded} timeout={800}>
              <Typography
                sx={{
                  textShadow: "8px 8px 10px rgba(0,0,0,1)",
                  mt: 8,
                  mb: 18,
                }}
                variant="h1"
                fontSize={80}
                textAlign="center"
              >
                Molecular Similarity Tool
              </Typography>
            </Fade>
            <Fade in={loaded} timeout={800}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SelectFile
                  size="large"
                  setFile={setFile}
                  setSmilesColumn={setSmilesColumn}
                  setLabelColumn={setLabelColumn}
                  setAnalyzedData={setAnalyzedData}
                  setFileReady={setFileReady}
                  setFileSelectError={setFileSelectError}
                />

                <Typography
                  sx={{
                    color: "white",
                    textShadow: "4px 4px 8px rgba(0,0,0,1)",
                    mx: 4,
                  }}
                  variant="h5"
                  textAlign="center"
                >
                  OR
                </Typography>

                <SelectExampleData
                  setFile={setFile}
                  setFileReady={setFileReady}
                  setLabelColumn={setLabelColumn}
                  setLabelType={setLabelType}
                />
              </Box>
            </Fade>

            {fileSelectError && (
              <Alert sx={{ mt: 4 }} severity="error">
                {fileSelectError}
              </Alert>
            )}
            <Fade in={loaded} timeout={800}>
              <Box
                sx={{
                  position: "fixed",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                  pb: 2,
                }}
              >
                <img src="images/fimm_logo.png" height={120} />
                <img
                  src="images/HY__LD01_LogoFP_EN_B3____BW.png"
                  height={140}
                />
              </Box>
            </Fade>
          </Box>
        )}

        <div ref={scrollTargetRef}>
          {analysisInProcess ? (
            <PlotSkeleton />
          ) : (
            analyzedData &&
            labelColumn && (
              <InteractivePlot
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
      </Box>
    </Container>
  );
};

export default HomePage;
