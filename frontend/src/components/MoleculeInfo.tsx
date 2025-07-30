import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import type { PlotDataObject, MoleculeProperties } from "../types";
import { useEffect, useState } from "react";
import { getMoleculeData } from "../services/pubChemApi";

interface MoleculeInfoProps {
  selectedMolecule: PlotDataObject | null;
  labelColumn: string;
}

const MoleculeInfo = ({ selectedMolecule, labelColumn }: MoleculeInfoProps) => {
  const [moleculeProperties, setMoleculeProperties] =
    useState<MoleculeProperties | null>(null);

  useEffect(() => {
    const getMoleculeProperties = async (selectedMolecule: PlotDataObject) => {
      const responseData = await getMoleculeData(selectedMolecule.smiles);
      if (responseData) {
        const properties = responseData.PropertyTable.Properties[0];
        if (properties.CID != 0) {
          const moleculeData: MoleculeProperties = {
            formula: properties.MolecularFormula,
            molWeight: properties.MolecularWeight,
            LogP: properties.XLogP,
            hba: properties.HBondAcceptorCount,
            hbd: properties.HBondDonorCount,
            rtb: properties.RotatableBondCount,
            psa: properties.TPSA,
          };

          setMoleculeProperties(moleculeData);
          return;
        }
        setMoleculeProperties(null);
      }
    };

    if (selectedMolecule) {
      getMoleculeProperties(selectedMolecule);
    }
  }, [selectedMolecule]);

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
          {moleculeProperties && (
            <List dense>
              {Object.entries(moleculeProperties).map(([key, value]) => (
                <ListItem key={key} disableGutters>
                  <ListItemText
                    primary={
                      <Typography variant="body2" fontWeight="bold">
                        {key}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {value}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
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
