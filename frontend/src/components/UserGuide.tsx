import { Container, Typography } from "@mui/material";
import NavBar from "./NavBar";

const UserGuide = () => {
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
      <NavBar />
      <Typography>This is the user guide page</Typography>
    </Container>
  );
};

export default UserGuide;
