import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material";

interface SmilesColumnSelectProps {
  columns: string[];
  smilesColumn: string;
  setSmilesColumn: (smilesColumn: string) => void;
}

const SmilesColumnSelect = ({
  columns,
  smilesColumn,
  setSmilesColumn,
}: SmilesColumnSelectProps) => {
  const handleSmilesColumnChange = (event: SelectChangeEvent) => {
    const selectedColumn = event.target.value;
    setSmilesColumn(selectedColumn);
  };
  return (
    <FormControl fullWidth>
      <InputLabel id="smiles-select" sx={{ my: 2 }}>
        SMILES
      </InputLabel>
      <Select
        sx={{ my: 2 }}
        labelId="smiles-select"
        id="smiles-select"
        value={smilesColumn}
        label="SMILES"
        onChange={handleSmilesColumnChange}
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

export default SmilesColumnSelect;
