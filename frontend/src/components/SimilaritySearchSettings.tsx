import { useState } from "react";
import type { FingerPrintTypeType, SimilarityDataUploadParams } from "../types";
import SimilaritySearch from "./SimilaritySearch";
import SmilesColumnSelect from "./SmilesColumnSelect";
import FingerPrintTypeSelect from "./FingerPrintTypeSelect";
import { Alert, Box, Button } from "@mui/material";
import { uploadSimilarityData } from "../services/data";
import SimilaritySearchResult from "./SimilaritySearchResult";

interface SimilaritySearchSettingsProps {
  parsedFile: string;
  columns: string[];
  highlightedSmiles: string[];
  smilesColumn: string;
  setSmilesColumn: (smilesColumn: string) => void;
}

const SimilaritySearchSettings = ({
  parsedFile,
  columns,
  smilesColumn,
  setSmilesColumn,
}: SimilaritySearchSettingsProps) => {
  const [targetSmiles, setTargetSmiles] = useState<string[]>([]);
  const [similarityData, setSimilarityData] = useState("");
  const [similarityDataError, setSimilarityDataError] = useState("");
  const [fingerPrintType, setFingerPrintType] =
    useState<FingerPrintTypeType>("Morgan");

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
        const data: string = await uploadSimilarityData(parsedFile, params);
        setSimilarityData(data);
      } catch (err: any) {
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
      <Button
        variant="contained"
        onClick={handleUpload}
        disabled={targetSmiles.length > 5 || targetSmiles.length < 1}
        sx={{ width: "6em", mt: 2 }}
      >
        Upload
      </Button>
      {similarityDataError && (
        <Alert sx={{}} severity="error">
          {similarityDataError}
        </Alert>
      )}
      {similarityData && (
        <SimilaritySearchResult similarityData={similarityData} />
      )}
    </>
  );
};

export default SimilaritySearchSettings;
