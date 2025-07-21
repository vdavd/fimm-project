import { FormControl, FormControlLabel, Switch } from "@mui/material";

interface removeOutliersSelectProps {
  removeOutliers: boolean;
  setremoveOutliers: (removeOutliers: boolean) => void;
}

const removeOutliersSelect = ({
  removeOutliers,
  setremoveOutliers,
}: removeOutliersSelectProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setremoveOutliers(event.target.checked);
  };

  return (
    <FormControl sx={{ my: 1 }}>
      <FormControlLabel
        control={<Switch onChange={handleChange} checked={removeOutliers} />}
        label="Remove outliers"
      />
    </FormControl>
  );
};

export default removeOutliersSelect;
