import { Container, Typography } from "@mui/material";

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
      <Typography>This is the contact page</Typography>
    </Container>
  );
};

export default ContactPage;
