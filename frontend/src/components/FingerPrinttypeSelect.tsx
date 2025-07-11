import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import type { FingerPrintTypeType } from "../types";

interface fingerPrintTypeSelectProps {
  fingerPrintType: FingerPrintTypeType;
  setFingerPrintType: (fingerPrintType: FingerPrintTypeType) => void;
}

const FingerPrintTypeSelect = ({
  fingerPrintType,
  setFingerPrintType,
}: fingerPrintTypeSelectProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fingerPrintTypeValue = (event.target as HTMLInputElement).value;

    const isFingerPrintTypeType = (
      value: string
    ): value is FingerPrintTypeType => {
      return value === "Morgan" || value === "Topological" || value === "MACCS";
    };

    if (isFingerPrintTypeType(fingerPrintTypeValue)) {
      setFingerPrintType(fingerPrintTypeValue);
    }
  };

  return (
    <FormControl sx={{ my: 1 }}>
      <FormLabel id="fingerprint-type-select-label">Fingerprint type</FormLabel>
      <RadioGroup
        row
        aria-labelledby="fingerprint-type-select-label"
        name="fingerprint-type-select"
        value={fingerPrintType}
        onChange={handleChange}
      >
        <FormControlLabel value="Morgan" control={<Radio />} label="Morgan" />
        <FormControlLabel
          value="Topological"
          control={<Radio />}
          label="RDKit Topological"
        />
        <FormControlLabel value="MACCS" control={<Radio />} label="MACCS" />
      </RadioGroup>
    </FormControl>
  );
};

export default FingerPrintTypeSelect;
