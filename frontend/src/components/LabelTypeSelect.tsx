import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import type { LabelType } from "../types";

interface LabelTypeSelectProps {
  labelType: LabelType;
  setLabelType: (labelType: LabelType) => void;
}

const LabelTypeSelect = ({ labelType, setLabelType }: LabelTypeSelectProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const labelTypeValue = (event.target as HTMLInputElement).value;

    const isLabelType = (value: string): value is LabelType => {
      return value === "categorical" || value === "continuous" || value === "";
    };

    if (isLabelType(labelTypeValue)) {
      setLabelType(labelTypeValue);
    }
  };

  return (
    <FormControl sx={{ my: 1 }}>
      <FormLabel id="label-type-select-label">Label Type</FormLabel>
      <RadioGroup
        row
        aria-labelledby="label-type-select-label"
        name="label-type-select"
        value={labelType}
        onChange={handleChange}
      >
        <FormControlLabel
          value="continuous"
          control={<Radio />}
          label="Continuous"
        />
        <FormControlLabel
          value="categorical"
          control={<Radio />}
          label="Categorical"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default LabelTypeSelect;
