import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Fade,
  List,
  ListItem,
  ListItemText,
  Paper,
  Slide,
  Typography,
} from "@mui/material";
import NavBar from "./NavBar";
import HeaderBar from "./HeaderBar";
import PanIcon from "./icons/PanIcon";
import CameraIcon from "./icons/CameraIcon";
import { useEffect, useState } from "react";

const UserGuide = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Fade in={loaded} timeout={300}>
        <Box>
          <NavBar />
        </Box>
      </Fade>
      <Box
        sx={{
          width: "100%",
          maxWidth: "90%",
          px: 4,
          py: 3,
        }}
      >
        <Fade in={loaded} timeout={600}>
          <Box>
            <HeaderBar />
          </Box>
        </Fade>
        <Slide in={loaded} timeout={800} direction="up">
          <Paper
            elevation={0}
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              px: 4,
              py: 3,
              my: 4,
              borderRadius: 3,
              backgroundColor: "#FFFFFF00",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                mb: 2,
                textAlign: "center",
                textShadow: "4px 4px 6px rgba(0,0,0,1)",
              }}
            >
              User Guide
            </Typography>
            <Card elevation={10} sx={{ my: 2, borderRadius: 2 }}>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  Step 1. Select File
                </Typography>
                <Typography variant="body1">
                  Click
                  {
                    <Button
                      variant="contained"
                      component="label"
                      sx={{
                        py: 1,
                        px: 1.5,
                        mx: 1,
                        fontSize: 14,
                        boxShadow: 10,
                        textShadow: "2px 2px 6px rgba(0,0,0,0.5)",
                      }}
                    >
                      Select File
                    </Button>
                  }
                  to upload your own <strong>.csv</strong> file with:
                </Typography>
                <List dense>
                  <ListItem>
                    <Typography variant="body1">
                      - A column with SMILES strings
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="body1">
                      - A column with labels (e.g. activity values or
                      categories)
                    </Typography>
                  </ListItem>
                </List>
                <Typography variant="body1">
                  <strong>or</strong> use the
                  {
                    <Button
                      variant="contained"
                      component="label"
                      color="secondary"
                      sx={{
                        py: 1,
                        px: 1.5,
                        mx: 1,
                        fontSize: 14,
                        boxShadow: 10,
                        textShadow: "2px 2px 6px rgba(0,0,0,0.5)",
                      }}
                    >
                      Example data
                    </Button>
                  }
                </Typography>
              </CardContent>
            </Card>

            <Card elevation={10} sx={{ my: 2, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Step 2. Confirm Columns and Choose Analysis Settings
                </Typography>
                <Typography variant="body1">
                  After selecting your file, confirm your{" "}
                  <strong>SMILES</strong> and <strong>Label</strong> columns,{" "}
                  <strong>label type</strong>, and select your analysis
                  parameters:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Fingerprint type"
                      secondary="Morgan / MACCS / RDKit — determines how molecular features are encoded before comparison"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Dimensionality reduction method"
                      secondary="PCA / UMAP — reduces high-dimensional data to 2D for visualization"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Outlier removal"
                      secondary="On / Off — removes structurally distant points that may distort the plot"
                    />
                  </ListItem>
                </List>
              </CardContent>
              <CardMedia
                component="video"
                src="/videos/analysis_settings.webm"
                autoPlay
                loop
                muted
                playsInline
                sx={{ width: "60vw", objectFit: "cover", mx: 2 }}
              />
              <CardContent>
                <Typography variant="body1">
                  {" "}
                  After selecting your analysis parameters, click{" "}
                  {
                    <Button
                      className="submit"
                      variant="contained"
                      sx={{ my: 2 }}
                    >
                      Upload
                    </Button>
                  }{" "}
                  to generate the plot.
                </Typography>
              </CardContent>
            </Card>
            <Card elevation={10} sx={{ my: 2, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Step 3. Explore and Visualize
                </Typography>
                <List dense>
                  <ListItem>
                    <Typography variant="body1">
                      - Select a region of the plot with the cursor to zoom in
                      and enter molecular view
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="body1">
                      - Adjust the <strong>Molecule size</strong> -slider to get
                      a clearer view
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="body1">
                      - Select the <strong>panning tool</strong> {<PanIcon />}{" "}
                      in the top right corner to adjust the view
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="body1">
                      - To save the plot, select{" "}
                      <strong>Download plot as png</strong> {<CameraIcon />} in
                      the top right corner
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="body1">
                      - To return to global view, simply double click on the
                      plot
                    </Typography>
                  </ListItem>
                </List>
              </CardContent>
              <CardMedia
                component="video"
                src="/videos/zoom_pan_select_guide.webm"
                autoPlay
                loop
                muted
                playsInline
                sx={{ width: "60vw", objectFit: "cover", mt: 2, mb: 4 }}
              />
              <CardContent>
                <Typography variant="body1">
                  Click on the molecules to fetch additional molecular
                  information from the <strong>PubChem API</strong>. Click the{" "}
                  {
                    <img
                      src="images/PubChem_logo.svg"
                      alt="PubChem"
                      style={{
                        height: "4vh",
                        verticalAlign: "middle",
                      }}
                    />
                  }{" "}
                  icon to open the compound's PubChem page in a new tab.
                </Typography>
              </CardContent>
            </Card>
            <Card elevation={10} sx={{ my: 2, borderRadius: 2 }}>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  Step 4. Highlight Molecules
                </Typography>
                <Typography variant="body1">
                  Use the data grid's search function and select molecules to
                  highlight them in the plot.
                </Typography>
              </CardContent>
              <CardMedia
                component="video"
                src="/videos/search_select.webm"
                autoPlay
                loop
                muted
                playsInline
                sx={{ width: "60vw", objectFit: "cover", mt: 2, mb: 4 }}
              />
            </Card>
          </Paper>
        </Slide>
      </Box>
    </Container>
  );
};

export default UserGuide;
