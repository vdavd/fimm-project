import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material";
import type { LabelType, RowObject } from "../types";

interface LabelColumnSelectProps {
  columns: string[];
  rows: RowObject[];
  labelColumn: string;
  setLabelColumn: (smilesColumn: string) => void;
  setLabelType: (labelType: LabelType) => void;
}

const LabelColumnSelect = ({
  columns,
  rows,
  labelColumn,
  setLabelColumn,
  setLabelType,
}: LabelColumnSelectProps) => {
  const handleLabelColumnChange = (event: SelectChangeEvent) => {
    const selectedColumn = event.target.value;
    setLabelColumn(event.target.value);

    // use number of unique values to guess whether the label is continuous or categorical
    const columnValues = rows.map(
      (row) => row[selectedColumn as keyof typeof row]
    );
    const uniqueValues = [...new Set(columnValues)];
    if (
      uniqueValues.length / columnValues.length < 0.1 &&
      uniqueValues.length <= 20
    ) {
      setLabelType("categorical");
    } else {
      setLabelType("continuous");
    }
  };
  return (
    <FormControl fullWidth>
      <InputLabel id="label-select" sx={{ my: 2 }}>
        Labels
      </InputLabel>
      <Select
        sx={{ my: 2 }}
        labelId="label-select"
        id="label-select"
        value={labelColumn}
        label="Labels"
        onChange={handleLabelColumnChange}
      >
        {columns
          .filter((column) => column !== "id")
          .map((column) => (
            <MenuItem value={column}>{column}</MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default LabelColumnSelect;
