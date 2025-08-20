import { Container, Typography } from "@mui/material";

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
      <Typography>This is the user guide page</Typography>
    </Container>
  );
};

export default UserGuide;
