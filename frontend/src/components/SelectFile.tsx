import { Button } from "@mui/material";

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
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
    setAnalyzedData("");
    setSmilesColumn("");
    setLabelColumn("");
    setFileReady(true);
  };

  return (
    <div>
      {size === "large" ? (
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
      ) : (
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
      )}
    </div>
  );
};

export default SelectFile;
