import { Box, Paper, Skeleton, Typography } from "@mui/material";
import { Helix } from "ldrs/react";
import "ldrs/react/Helix.css";

interface PlotSkeletonProps {
  size: "small" | "large";
}

const PlotSkeleton = ({ size }: PlotSkeletonProps) => {
  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          display: "flex",
          minHeight: size === "large" ? "90vh" : "55vh",
        }}
      >
        <Paper
          elevation={10}
          sx={{
            width: "100%",
            height: size === "large" ? "90vh" : "55vh",
            px: 4,
            py: 3,
            my: 2,
            mr: 1.5,
            backgroundColor: "#f8f8f8",
            borderRadius: 3,
          }}
        >
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{ borderRadius: 3 }}
            height="100%"
            width="100%"
          />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Helix size="80" color="#1f77b4" />
            <Typography variant="body1" color="gray" sx={{ mt: 3 }}>
              Analyzing data...
            </Typography>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default PlotSkeleton;
