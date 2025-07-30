import { Box, Typography } from "@mui/material";
import type { PlotDataObject } from "../types";

interface MoleculeInfoProps {
  selectedMolecule: PlotDataObject | null;
  labelColumn: string;
}

const MoleculeInfo = ({ selectedMolecule, labelColumn }: MoleculeInfoProps) => {
  if (selectedMolecule) {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={selectedMolecule.svg} />
          <Typography>
            {labelColumn}: {selectedMolecule.label}
          </Typography>
        </Box>
      </>
    );
  } else {
    return (
      <div>
        <Typography>Click on molecules for additional information</Typography>
      </div>
    );
  }
};

export default MoleculeInfo;
