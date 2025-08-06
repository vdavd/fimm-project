import { Button } from "@mui/material";

interface SelectFileProps {
  size: "small" | "large";
  setFile: (file: File | null) => void;
  setSmilesColumn: (smilesColumn: string) => void;
  setLabelColumn: (labelColumn: string) => void;
  setAnalyzedData: (analyzedData: string) => void;
}

const SelectFile = ({
  size,
  setFile,
  setSmilesColumn,
  setLabelColumn,
  setAnalyzedData,
}: SelectFileProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
    setAnalyzedData("");
    setSmilesColumn("");
    setLabelColumn("");
  };

  return (
    <div>
      {size === "large" ? (
        <Button
          variant="contained"
          component="label"
          sx={{ height: 60, width: 200, fontSize: 24 }}
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
        <Button variant="contained" component="label">
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
