import { Container, Typography } from "@mui/material";
import NavBar from "./NavBar";

const ContactPage = () => {
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
      <Typography>This is the contact page</Typography>
    </Container>
  );
};

export default ContactPage;
