import {
  Box,
  Link,
  List,
  ListItem,
  ListItemText,
  Paper,
  Skeleton,
  Slide,
  Stack,
  Typography,
  Zoom,
} from "@mui/material";
import type { PlotDataObject, MoleculeProperties } from "../types";
import { useEffect, useState } from "react";
import { getMoleculeData } from "../services/pubChemApi";

interface MoleculeInfoProps {
  selectedMolecule: PlotDataObject | null;
  labelColumn: string;
  plotReady: boolean;
}

const MoleculeInfo = ({
  selectedMolecule,
  labelColumn,
  plotReady,
}: MoleculeInfoProps) => {
  const [moleculeProperties, setMoleculeProperties] =
    useState<MoleculeProperties | null>(null);
  const [moleculeSelected, setMoleculeSelected] = useState(false);

  useEffect(() => {
    const getMoleculeProperties = async (selectedMolecule: PlotDataObject) => {
      setMoleculeProperties(null);
      setMoleculeSelected(true);
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
            alignItems: "stretch",
            width: "20%",
          }}
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Slide in={moleculeSelected} timeout={500} direction="down">
              <Paper
                elevation={10}
                sx={{
                  px: 4,
                  py: 3,
                  mt: 2,
                  ml: 1.5,
                  borderRadius: 3,
                }}
              >
                <img src={selectedMolecule.svg} />
                <Typography variant="body2" fontWeight="bold">
                  {labelColumn}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedMolecule.label.toString()}
                </Typography>
              </Paper>
            </Slide>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Slide in={moleculeSelected} timeout={500} direction="up">
                <Paper
                  elevation={10}
                  sx={{
                    px: 4,
                    py: 3,
                    mt: 2,
                    mb: 4,
                    ml: 1.5,
                    borderRadius: 3,
                    height: "90%",
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
                          href={`https://pubchem.ncbi.nlm.nih.gov/compound/${moleculeProperties.cid}`}
                          underline="none"
                          target="_blank"
                          rel="noreferrer"
                          sx={{ py: 1, fontSize: 16, lineHeight: 0 }}
                        >
                          <img
                            src="/images/PubChem_logo.svg"
                            alt="PubChem link"
                            style={{
                              width: "10em",
                              height: "auto",
                              display: "inline-block",
                              verticalAlign: "middle",
                            }}
                          />
                        </Link>
                      </ListItem>
                    </List>
                  ) : (
                    <Stack spacing={1.5} sx={{ pt: 2, alignItems: "center" }}>
                      {Array.from({ length: 7 }).map((_, i) => (
                        <Skeleton
                          sx={{ borderRadius: 3 }}
                          variant="rectangular"
                          width="100%"
                          height={55}
                          animation="wave"
                          key={i}
                        />
                      ))}
                      <Skeleton
                        sx={{ borderRadius: 1 }}
                        variant="rectangular"
                        width="85%"
                        height={60}
                        animation="wave"
                      />
                    </Stack>
                  )}
                </Paper>
              </Slide>
            </Box>
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
          <Zoom in={plotReady} timeout={500} unmountOnExit>
            <Paper
              elevation={10}
              sx={{
                height: "90%",
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
          </Zoom>
        </Box>
      </>
    );
  }
};

export default MoleculeInfo;
