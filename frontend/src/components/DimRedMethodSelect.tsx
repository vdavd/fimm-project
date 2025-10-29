import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import type { DimRedMethodType } from "../types";

interface DimRedMethodSelectProps {
  dimRedMethod: DimRedMethodType;
  setDimRedMethod: (dimRedMethod: DimRedMethodType) => void;
  numberNeighborsUmap: number | null;
  setNumberNeighborsUmap: (numberNeighborsUmap: number | null) => void;
}

const DimRedMethodSelect = ({
  dimRedMethod,
  setDimRedMethod,
  numberNeighborsUmap,
  setNumberNeighborsUmap,
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
      <Stack direction="row" spacing={4} alignItems="baseline">
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
        <FormControl sx={{ my: 1 }}>
          <FormLabel
            id="n-neighbors-umap"
            sx={{ visibility: dimRedMethod == "UMAP" ? "visible" : "hidden" }}
          >
            n_neighbors
            <Tooltip
              title="Number of neighbors -hyperparameter for UMAP. Smaller value focuses on local structure, larger value preserves global relationships. Min: 5, Max: 150"
              placement="right"
            >
              <InfoIcon fontSize="small" sx={{ ml: 1 }} />
            </Tooltip>
          </FormLabel>

          <TextField
            type="number"
            value={numberNeighborsUmap}
            onChange={(e) => {
              const num = e.target.value === "" ? null : Number(e.target.value);
              setNumberNeighborsUmap(num);
            }}
            onBlur={() => {
              setNumberNeighborsUmap(
                Math.min(150, Math.max(5, Number(numberNeighborsUmap)))
              );
            }}
            sx={{
              width: 80,
              visibility: dimRedMethod === "UMAP" ? "visible" : "hidden",
            }}
          />
        </FormControl>
      </Stack>
    </FormControl>
  );
};

export default DimRedMethodSelect;
