import { Button } from "@mui/material";
import exampleDataUrl from "../data/BBBP_sample.csv";
import type { LabelType } from "../types";

interface SelectExampleDataProps {
  setFile: (file: File | null) => void;
  setFileReady: (fileReady: boolean) => void;
  setLabelColumn: (labelColumn: string) => void;
  setLabelType: (labelType: LabelType) => void;
}
const LABEL_COLUMN = "p_np";
const LABEL_TYPE: LabelType = "categorical";

const SelectExampleData = ({
  setFile,
  setFileReady,
  setLabelColumn,
  setLabelType,
}: SelectExampleDataProps) => {
  const loadFile = async () => {
    // Fetch the file as a blob
    const response = await fetch(exampleDataUrl);
    const blob = await response.blob();

    // Create a File object from the blob
    const file = new File([blob], "example.pdf", { type: blob.type });
    setFile(file);
    setFileReady(true);
    setLabelColumn(LABEL_COLUMN);
    setLabelType(LABEL_TYPE);
  };
  return (
    <Button
      variant="contained"
      component="label"
      color="secondary"
      onClick={loadFile}
      sx={{
        py: 1,
        px: 3,
        fontSize: 34,
        boxShadow: 10,
        textShadow: "4px 4px 6px rgba(0,0,0,0.5)",
      }}
    >
      Example data
    </Button>
  );
};

export default SelectExampleData;
