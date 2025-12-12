import { useEffect, useState } from "react";
import type { FingerPrintTypeType, SimilarityDataUploadParams } from "../types";
import SimilaritySearch from "./SimilaritySearch";
import SmilesColumnSelect from "./SmilesColumnSelect";
import FingerPrintTypeSelect from "./FingerPrintTypeSelect";
import { Alert, Box, Button } from "@mui/material";
import { uploadSimilarityData } from "../services/data";
import { Helix } from "ldrs/react";

interface SimilaritySearchSettingsProps {
  parsedFile: string;
  columns: string[];
  smilesColumn: string;
  setSmilesColumn: (smilesColumn: string) => void;
  targetSmiles: string[];
  setTargetSmiles: (targetSmiles: string[]) => void;
  setSimilarityData: (similarityData: string) => void;
  similarityAnalysisInProcess: boolean;
  setSimilarityAnalysisInProcess: (
    similarityAnalysisInProcess: boolean
  ) => void;
}

const SimilaritySearchSettings = ({
  parsedFile,
  columns,
  smilesColumn,
  setSmilesColumn,
  targetSmiles,
  setTargetSmiles,
  setSimilarityData,
  similarityAnalysisInProcess,
  setSimilarityAnalysisInProcess,
}: SimilaritySearchSettingsProps) => {
  const [similarityDataError, setSimilarityDataError] = useState("");
  const [fingerPrintType, setFingerPrintType] =
    useState<FingerPrintTypeType>("Morgan");

  useEffect(() => {
    setSimilarityDataError("");
  }, [parsedFile]);

  const handleUpload = async () => {
    if (
      targetSmiles.length > 0 &&
      targetSmiles.length < 6 &&
      parsedFile &&
      smilesColumn
    ) {
      setSimilarityDataError("");

      const params: SimilarityDataUploadParams = {
        smilesColumn: smilesColumn,
        targetSmiles: targetSmiles,
        fingerPrintType: fingerPrintType,
      };
      try {
        setSimilarityAnalysisInProcess(true);
        const data: string = await uploadSimilarityData(parsedFile, params);
        setSimilarityData(data);
        setSimilarityAnalysisInProcess(false);
      } catch (err: any) {
        setSimilarityAnalysisInProcess(false);
        setSimilarityDataError(err.message);
      }
    }
  };
  return (
    <>
      <Box sx={{ minWidth: 120, display: "flex", gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <SmilesColumnSelect
            columns={columns}
            smilesColumn={smilesColumn}
            setSmilesColumn={setSmilesColumn}
          />
          <FingerPrintTypeSelect
            fingerPrintType={fingerPrintType}
            setFingerPrintType={setFingerPrintType}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <SimilaritySearch
            targetSmiles={targetSmiles}
            setTargetSmiles={setTargetSmiles}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", mt: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={
              targetSmiles.length > 5 ||
              targetSmiles.length < 1 ||
              similarityAnalysisInProcess
            }
            sx={{ width: "6em" }}
          >
            Upload
          </Button>
        </Box>
        {similarityDataError && (
          <Box
            sx={{
              mx: 2,
            }}
          >
            <Alert sx={{}} severity="error">
              {similarityDataError}
            </Alert>
          </Box>
        )}
        {similarityAnalysisInProcess && (
          <Box
            sx={{
              mx: 2,
            }}
          >
            <Alert
              sx={{
                "& .MuiAlert-message": {
                  display: "flex",
                  alignItems: "center",
                  gap: 1, // spacing between text and spinner
                },
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
              severity="info"
            >
              Analyzing data...
              <Helix size="30" color="#1f77b4" />
            </Alert>
          </Box>
        )}
      </Box>
    </>
  );
};

export default SimilaritySearchSettings;
