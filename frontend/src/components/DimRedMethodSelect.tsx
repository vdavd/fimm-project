import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import type { DimRedMethodType } from "../types";

interface DimRedMethodSelectProps {
  dimRedMethod: DimRedMethodType;
  setDimRedMethod: (dimRedMethod: DimRedMethodType) => void;
}

const DimRedMethodSelect = ({
  dimRedMethod,
  setDimRedMethod,
}: DimRedMethodSelectProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dimRedMethodValue = (event.target as HTMLInputElement).value;

    const isDimRedMethodType = (value: string): value is DimRedMethodType => {
      return value === "PCA" || value === "UMAP";
    };

    if (isDimRedMethodType(dimRedMethodValue)) {
      setDimRedMethod(dimRedMethodValue);
    }
  };

  return (
    <FormControl sx={{ my: 1 }}>
      <FormLabel id="dim-red-method-select-label">
        Dimensionality reduction method
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="dim-red-method-select-label"
        name="label-type-select"
        value={dimRedMethod}
        onChange={handleChange}
      >
        <FormControlLabel value="PCA" control={<Radio />} label="PCA" />
        <FormControlLabel value="UMAP" control={<Radio />} label="UMAP" />
      </RadioGroup>
    </FormControl>
  );
};

export default DimRedMethodSelect;
