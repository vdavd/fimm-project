import { Button } from "@mui/material";

interface FileSelectProps {
  size: "small" | "large";
  setFile: (file: File | null) => void;
  setSmilesColumn: (smilesColumn: string) => void;
  setLabelColumn: (labelColumn: string) => void;
  setAnalyzedData: (analyzedData: string) => void;
  setFileReady: (fileReady: boolean) => void;
  setFileSelectError: (fileSelectError: string | null) => void;
}

const FileSelect = ({
  size,
  setFile,
  setSmilesColumn,
  setLabelColumn,
  setAnalyzedData,
  setFileReady,
  setFileSelectError,
}: FileSelectProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];

      const MAX_SIZE_MB = 5;
      const MAX_SIZE = MAX_SIZE_MB * 1024 * 1024;

      if (file.size > MAX_SIZE) {
        setFileSelectError(
          `File size too large. Maximum allowed size: ${MAX_SIZE_MB} MB`
        );
        return;
      }

      setFileSelectError(null);
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
        </>
      ) : (
        <>
          <Button
            variant="contained"
            component="label"
            sx={{ boxShadow: 3, position: "absolute", top: 15, right: 35 }}
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
        </>
      )}
    </div>
  );
};

export default FileSelect;
