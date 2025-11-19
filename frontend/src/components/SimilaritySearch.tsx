import { Alert, Button, Chip, Paper, Stack, TextField } from "@mui/material";
import { useState } from "react";
import type { SimilarityDataUploadParams } from "../types";
import { uploadSimilarityData } from "../services/data";
import SimilaritySearchResult from "./SimilaritySearchResult";

interface SimilaritySearchProps {
  parsedFile: string;
  smilesColumn: string;
  fingerprintType: string;
}

const SimilaritySearch = ({
  parsedFile,
  smilesColumn,
  fingerprintType,
}: SimilaritySearchProps) => {
  const [manualInputSmiles, setManualInputSmiles] = useState("");
  const [targetSmiles, setTargetSmiles] = useState<string[]>([]);
  const [similarityData, setSimilarityData] = useState("");
  const [similarityDataError, setSimilarityDataError] = useState("");

  const handleButtonClick = () => {
    if (
      manualInputSmiles.length > 0 &&
      !targetSmiles.includes(manualInputSmiles)
    ) {
      const newTargetSmiles = [...targetSmiles, manualInputSmiles];
      setTargetSmiles(newTargetSmiles);
      setManualInputSmiles("");
    }
  };

  const handleTargetSmilesDelete = (removedSmiles: string) => {
    const newtargetSmiles = targetSmiles.filter(
      (smiles) => smiles !== removedSmiles
    );
    setTargetSmiles(newtargetSmiles);
  };

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
        fingerprintType: fingerprintType,
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
      <Stack direction="row" spacing={2} alignItems="baseline" sx={{ mb: 2 }}>
        <TextField
          id="manual-input-smiles"
          label="Input target SMILES"
          variant="outlined"
          value={manualInputSmiles}
          onChange={(e) => setManualInputSmiles(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleButtonClick}
          disabled={targetSmiles.length >= 5}
        >
          Add
        </Button>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="baseline">
        {targetSmiles.map((smiles, i) => (
          <Chip
            key={`${smiles}-${i}`}
            label={smiles}
            onDelete={() => handleTargetSmilesDelete(smiles)}
            sx={{
              maxWidth: 200,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          />
        ))}
      </Stack>
      <Button
        variant="contained"
        onClick={handleUpload}
        disabled={targetSmiles.length > 5}
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
    </Paper>
  );
};

export default SimilaritySearch;
