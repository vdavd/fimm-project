import {
  Box,
  Link,
  List,
  ListItem,
  ListItemText,
  Paper,
  Skeleton,
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
  const [hoverPubChemLink, setHoverPubChemLink] = useState(false);

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
            height: "100vh",
            minHeight: 700,
            alignItems: "space-between",
            width: "20%",
          }}
        >
          <Zoom in={moleculeSelected} timeout={500}>
            <Paper
              elevation={10}
              sx={{
                px: 4,
                py: 2,
                mt: 2,
                ml: 1.5,
                borderRadius: 3,
              }}
            >
              <img src={selectedMolecule.svg} style={{ width: 170 }} />
              <Typography variant="body2" fontWeight="bold" overflow="auto">
                {labelColumn}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                overflow="auto"
              >
                {selectedMolecule.label.toString()}
              </Typography>
            </Paper>
          </Zoom>

          <Zoom in={moleculeSelected} timeout={500}>
            <Paper
              elevation={10}
              sx={{
                px: 4,
                py: 1,
                my: 2,
                ml: 1.5,
                borderRadius: 3,
                overflow: "auto",
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {moleculeProperties ? (
                <List>
                  {Object.entries(moleculeProperties)
                    .filter(([key, _value]) => key !== "cid")
                    .map(([key, { value, label }]) => (
                      <ListItem key={key} disableGutters>
                        <ListItemText
                          primary={
                            <Typography
                              variant="body2"
                              fontWeight="bold"
                              sx={{
                                whiteSpace: "nowrap",
                                overflowX: "auto",
                              }}
                            >
                              {label}
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                whiteSpace: "nowrap",
                                overflowX: "auto",
                              }}
                            >
                              {value}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  <ListItem sx={{ pl: 0 }}>
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
                          cursor: "pointer",
                          transition: "0.2s",
                          opacity: hoverPubChemLink ? 0.75 : 1,
                          transform: hoverPubChemLink
                            ? "scale(1.02)"
                            : "scale(1)",
                        }}
                        onMouseEnter={() => setHoverPubChemLink(true)}
                        onMouseLeave={() => setHoverPubChemLink(false)}
                      />
                    </Link>
                  </ListItem>
                </List>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    pt: 2,
                  }}
                >
                  {Array.from({ length: 7 }).map((_, i) => (
                    <>
                      <Skeleton
                        sx={{ mt: 3, mb: 1 }}
                        variant="rectangular"
                        width="90%"
                        height="1.2rem"
                        animation="wave"
                        key={i}
                      />
                      <Skeleton
                        sx={{}}
                        variant="rectangular"
                        width="30%"
                        height="1rem"
                        animation="wave"
                        key={i}
                      />
                    </>
                  ))}
                  <Skeleton
                    sx={{ borderRadius: 1, my: 2 }}
                    variant="rectangular"
                    width="85%"
                    height="3rem"
                    animation="wave"
                  />
                </Box>
              )}
            </Paper>
          </Zoom>
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
                flexGrow: 1,
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
