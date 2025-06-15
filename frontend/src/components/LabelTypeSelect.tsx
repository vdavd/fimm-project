import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

interface LabelTypeSelectProps {
  labelType: string;
  setLabelType: (labelType: string) => void;
}

const LabelTypeSelect = ({ labelType, setLabelType }: LabelTypeSelectProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLabelType((event.target as HTMLInputElement).value);
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
