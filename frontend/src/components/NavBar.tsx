import { Box, Link } from "@mui/material";
import { useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 10,
        width: "100%",
        backgroundColor: "transparent",
        mt: 2,
      }}
    >
      <Link
        href="/"
        variant="h4"
        underline="none"
        sx={{
          textShadow:
            location.pathname == "/"
              ? "8px 8px 5px rgba(0,0,0,1)"
              : "4px 4px 6px rgba(0,0,0,1)",
        }}
      >
        Home
      </Link>
      <Link
        href="/guide"
        underline="none"
        variant="h4"
        sx={{
          textShadow:
            location.pathname == "/guide"
              ? "8px 8px 5px rgba(0,0,0,1)"
              : "4px 4px 6px rgba(0,0,0,1)",
        }}
      >
        User guide
      </Link>
      <Link
        href="/contact"
        underline="none"
        variant="h4"
        sx={{
          textShadow:
            location.pathname == "/contact"
              ? "8px 8px 5px rgba(0,0,0,1)"
              : "4px 4px 6px rgba(0,0,0,1)",
        }}
      >
        Contact
      </Link>
    </Box>
  );
};

export default NavBar;
