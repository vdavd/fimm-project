import { Box, Button, Chip, Stack, TextField } from "@mui/material";
import { useState } from "react";

interface SimilaritySearchProps {
  targetSmiles: string[];
  setTargetSmiles: (targetSmiles: string[]) => void;
}

const SimilaritySearch = ({
  targetSmiles,
  setTargetSmiles,
}: SimilaritySearchProps) => {
  const [manualInputSmiles, setManualInputSmiles] = useState("");
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

  return (
    <>
      <Stack direction="row" spacing={2} alignItems="baseline" sx={{ my: 2 }}>
        <TextField
          id="manual-input-smiles"
          label="Manually input target SMILES"
          variant="outlined"
          value={manualInputSmiles}
          onChange={(e) => setManualInputSmiles(e.target.value)}
          sx={{ width: "34em" }}
        />
        <Button
          variant="contained"
          onClick={handleButtonClick}
          disabled={targetSmiles.length >= 5}
        >
          Add
        </Button>
      </Stack>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {targetSmiles.map((smiles, i) => (
          <Chip
            key={`${smiles}-${i}`}
            label={smiles}
            onDelete={() => handleTargetSmilesDelete(smiles)}
            sx={{
              margin: 0.5,
              maxWidth: 200,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          />
        ))}
      </Box>
    </>
  );
};

export default SimilaritySearch;
