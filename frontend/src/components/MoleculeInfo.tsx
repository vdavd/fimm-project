import {
  Box,
  Link,
  List,
  ListItem,
  ListItemText,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
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
      setMoleculeProperties(null);
      const responseData = await getMoleculeData(selectedMolecule.smiles);
      if (responseData) {
        const properties = responseData.PropertyTable.Properties[0];
        if (properties.CID != 0) {
          const moleculeData: MoleculeProperties = {
            cid: properties.CID,
            formula: {
              value: properties.MolecularFormula,
              label: "Molecular Formula",
            },
            molWeight: {
              value: properties.MolecularWeight,
              label: "Molecular Weight",
            },
            LogP: { value: properties.XLogP, label: "LogP" },
            hba: {
              value: properties.HBondAcceptorCount,
              label: "Hydrogen Bond Acceptors",
            },
            hbd: {
              value: properties.HBondDonorCount,
              label: "Hydrogen Bond Donors",
            },
            rtb: {
              value: properties.RotatableBondCount,
              label: "Rotatable Bonds",
            },
            psa: { value: properties.TPSA, label: "Polar Surface Area" },
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
            height: "100%",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              px: 4,
              py: 3,
              mt: 2,
              mb: 1,
              ml: 1.5,
              backgroundColor: "#f8f8f8",
              borderRadius: 3,
            }}
          >
            <img src={selectedMolecule.svg} />
            <Typography variant="body2" fontWeight="bold">
              {labelColumn}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {selectedMolecule.label}
            </Typography>
          </Paper>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              overflow: "hidden",
            }}
          >
            <Paper
              elevation={3}
              sx={{
                px: 4,
                py: 3,
                my: 2,
                ml: 1.5,
                backgroundColor: "#f8f8f8",
                borderRadius: 3,
                height: "100%",
                overflow: "auto",
              }}
            >
              {moleculeProperties ? (
                <List dense>
                  {Object.entries(moleculeProperties)
                    .filter(([key, _value]) => key !== "cid")
                    .map(([key, { value, label }]) => (
                      <ListItem key={key} disableGutters>
                        <Paper
                          elevation={0}
                          sx={{
                            width: "100%",
                            p: 0.5,
                            backgroundColor: "#ececec",
                            borderRadius: 3,
                          }}
                        >
                          <ListItemText
                            primary={
                              <Typography variant="body2" fontWeight="bold">
                                {label}
                              </Typography>
                            }
                            secondary={
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {value}
                              </Typography>
                            }
                          />
                        </Paper>
                      </ListItem>
                    ))}
                  <ListItem>
                    <Link
                      sx={{ py: 1, fontSize: 16 }}
                      href={`https://pubchem.ncbi.nlm.nih.gov/compound/${moleculeProperties.cid}`}
                      variant="button"
                      target="_blank"
                      rel="noreferrer"
                    >
                      PubChem Link
                    </Link>
                  </ListItem>
                </List>
              ) : (
                <Stack spacing={1.5} sx={{ py: 1 }}>
                  {Array.from({ length: 7 }).map((_, i) => (
                    <Skeleton
                      variant="rounded"
                      width="100%"
                      height={55}
                      animation="wave"
                      key={i}
                    />
                  ))}
                  <Skeleton
                    variant="text"
                    width="100%"
                    height={60}
                    animation="wave"
                  />
                </Stack>
              )}
            </Paper>
          </Box>
        </Box>
      </>
    );
  } else {
    return (
      <>
        <Box
          sx={{
            width: "20%",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              height: "100%",
              px: 4,
              py: 3,
              my: 2,
              ml: 1.5,
              backgroundColor: "#f8f8f8",
              borderRadius: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography sx={{ flexWrap: "wrap" }}>
                Click on molecules for additional information
              </Typography>
            </Box>
          </Paper>
        </Box>
      </>
    );
  }
};

export default MoleculeInfo;
