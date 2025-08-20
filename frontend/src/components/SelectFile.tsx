import { Alert, Box, Button } from "@mui/material";
import { useState } from "react";

interface SelectFileProps {
  size: "small" | "large";
  setFile: (file: File | null) => void;
  setSmilesColumn: (smilesColumn: string) => void;
  setLabelColumn: (labelColumn: string) => void;
  setAnalyzedData: (analyzedData: string) => void;
  setFileReady: (fileReady: boolean) => void;
}

const SelectFile = ({
  size,
  setFile,
  setSmilesColumn,
  setLabelColumn,
  setAnalyzedData,
  setFileReady,
}: SelectFileProps) => {
  const [error, setError] = useState<string | null>(null);

  const MAX_SIZE_MB = 5;
  const MAX_SIZE = MAX_SIZE_MB * 1024 * 1024;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];

      const MAX_SIZE_MB = 5;
      const MAX_SIZE = MAX_SIZE_MB * 1024 * 1024;

      if (file.size > MAX_SIZE) {
        setError(
          `File size too large. Maximum allowed size: ${MAX_SIZE_MB} MB`
        );
        return;
      }

      setError(null);
      setFile(event.target.files[0]);
    }
    setAnalyzedData("");
    setSmilesColumn("");
    setLabelColumn("");
    setFileReady(true);
  };

  return (
    <div>
      {size === "large" ? (
        <>
          <Button
            variant="contained"
            component="label"
            sx={{
              height: 65,
              width: 210,
              fontSize: 26,
              boxShadow: 10,
            }}
          >
            Select File
            <input
              id="file"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              hidden
            />
          </Button>
          {error && <Alert severity="error">{error}</Alert>}
        </>
      ) : (
        <>
          <Button
            variant="contained"
            component="label"
            sx={{ boxShadow: 3, position: "absolute", top: 20, right: 35 }}
          >
            Select File
            <input
              id="file"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              hidden
            />
          </Button>
          {error && <Alert severity="error">{error}</Alert>}
        </>
      )}
    </div>
  );
};

export default SelectFile;
