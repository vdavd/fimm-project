import { Box, Typography } from "@mui/material";

const HeaderBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Typography
        sx={{
          textShadow: "4px 4px 6px rgba(0,0,0,1)",
        }}
        variant="h2"
        textAlign="center"
      >
        Molecular Similarity Tool
      </Typography>
      <img src="images/fimm_logo.png" height={80} />
      <img src="images/HY__LD01_LogoFP_EN_B3____BW.png" height={90} />
    </Box>
  );
};

export default HeaderBar;
