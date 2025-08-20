import { Box, Link } from "@mui/material";
import { useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 6,
        width: "100%",
        backgroundColor: "transparent",
        mt: 2,
      }}
    >
      <Link
        href="/"
        underline={location.pathname == "/" ? "always" : "none"}
        variant="h4"
      >
        HOME
      </Link>
      <Link href="/guide" underline="none" variant="h4">
        USER GUIDE
      </Link>
      <Link href="/contact" underline="none" variant="h4">
        CONTACT
      </Link>
    </Box>
  );
};

export default NavBar;
