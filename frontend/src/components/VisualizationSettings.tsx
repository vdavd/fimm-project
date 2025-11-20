import { Box } from "@mui/material";
import DimRedMethodSelect from "./DimRedMethodSelect";
import FingerPrintTypeSelect from "./FingerPrintTypeSelect";
import LabelColumnSelect from "./LabelColumnSelect";
import LabelTypeSelect from "./LabelTypeSelect";
import RemoveOutliersSelect from "./RemoveOutliersSelect";
import SmilesColumnSelect from "./SmilesColumnSelect";
import type {
  DimRedMethodType,
  FingerPrintTypeType,
  LabelType,
  RowObject,
} from "../types";

interface VisualizationSettingsProps {
  columns: string[];
  rows: RowObject[];
  labelColumn: string;
  setLabelColumn: (smilesColumn: string) => void;
  smilesColumn: string;
  setSmilesColumn: (smilesColumn: string) => void;
  labelType: LabelType;
  setLabelType: (labelType: LabelType) => void;
  fingerPrintType: FingerPrintTypeType;
  setFingerPrintType: (fingerPrintType: FingerPrintTypeType) => void;
  dimRedMethod: DimRedMethodType;
  setDimRedMethod: (dimRedMethod: DimRedMethodType) => void;
  numberNeighborsUmap: number | null;
  setNumberNeighborsUmap: (numberNeighborsUmap: number | null) => void;
  removeOutliers: boolean;
  setremoveOutliers: (removeOutliers: boolean) => void;
}

const VisualizationSettings = ({
  columns,
  rows,
  labelColumn,
  setLabelColumn,
  smilesColumn,
  setSmilesColumn,
  labelType,
  setLabelType,
  fingerPrintType,
  setFingerPrintType,
  dimRedMethod,
  setDimRedMethod,
  numberNeighborsUmap,
  setNumberNeighborsUmap,
  removeOutliers,
  setremoveOutliers,
}: VisualizationSettingsProps) => {
  return (
    <>
      <Box sx={{ minWidth: 120, display: "flex", gap: 2 }}>
        <SmilesColumnSelect
          columns={columns}
          smilesColumn={smilesColumn}
          setSmilesColumn={setSmilesColumn}
        />
        <LabelColumnSelect
          columns={columns}
          rows={rows}
          labelColumn={labelColumn}
          setLabelColumn={setLabelColumn}
          setLabelType={setLabelType}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            pl: 2,
            borderLeft: "2px solid #ccc",
          }}
        >
          <FingerPrintTypeSelect
            fingerPrintType={fingerPrintType}
            setFingerPrintType={setFingerPrintType}
          />
          <DimRedMethodSelect
            dimRedMethod={dimRedMethod}
            setDimRedMethod={setDimRedMethod}
            numberNeighborsUmap={numberNeighborsUmap}
            setNumberNeighborsUmap={setNumberNeighborsUmap}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            ml: 2,
            pl: 2,
            borderLeft: "2px solid #ccc",
          }}
        >
          <LabelTypeSelect labelType={labelType} setLabelType={setLabelType} />

          <RemoveOutliersSelect
            removeOutliers={removeOutliers}
            setremoveOutliers={setremoveOutliers}
          />
        </Box>
      </Box>
    </>
  );
};

export default VisualizationSettings;
