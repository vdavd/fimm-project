import { Button } from "@mui/material";
import exampleDataUrl from "../data/example_data_BBB.csv";
import type { LabelType } from "../types";

interface SelectExampleDataProps {
  setFile: (file: File | null) => void;
  setFileReady: (fileReady: boolean) => void;
  setLabelColumn: (labelColumn: string) => void;
  setLabelType: (labelType: LabelType) => void;
  setFileSelectError: (fileSelectError: string | null) => void;
}
const LABEL_COLUMN = "passes_blood_brain_barrier";
const LABEL_TYPE: LabelType = "categorical";

const SelectExampleData = ({
  setFile,
  setFileReady,
  setLabelColumn,
  setLabelType,
  setFileSelectError,
}: SelectExampleDataProps) => {
  const loadFile = async () => {
    // Fetch the file as a blob
    const response = await fetch(exampleDataUrl);
    const blob = await response.blob();

    // Create a File object from the blob
    const file = new File([blob], "example_data_BBB.csv", { type: blob.type });
    setFile(file);
    setFileReady(true);
    setLabelColumn(LABEL_COLUMN);
    setLabelType(LABEL_TYPE);
    setFileSelectError(null);
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
        fontSize: 28,
        boxShadow: 10,
        textShadow: "4px 4px 6px rgba(0,0,0,0.5)",
      }}
    >
      Example data
    </Button>
  );
};

export default SelectExampleData;
