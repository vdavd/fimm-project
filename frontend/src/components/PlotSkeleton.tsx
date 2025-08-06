import {
  Box,
  CircularProgress,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";

const PlotSkeleton = () => {
  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          display: "flex",
          minHeight: "90vh",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            height: "90vh",
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
            <CircularProgress size={46} />
            <Typography variant="body1" sx={{ mt: 1 }}>
              Analyzing data...
            </Typography>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default PlotSkeleton;
