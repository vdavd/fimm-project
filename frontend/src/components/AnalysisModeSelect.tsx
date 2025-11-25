import { Box, ButtonGroup, Button } from "@mui/material";
import type { AnalysisMode } from "../types";

interface AnalysisModeSelectProps {
  analysisMode: AnalysisMode;
  setAnalysisMode: (analysisMode: AnalysisMode) => void;
}

const AnalysisModeSelect = ({
  analysisMode,
  setAnalysisMode,
}: AnalysisModeSelectProps) => {
  return (
    <Box sx={{ mt: 3, mb: 2 }}>
      <ButtonGroup variant="outlined">
        <Button
          size="large"
          onClick={() => setAnalysisMode("Visualization")}
          variant={analysisMode === "Visualization" ? "contained" : "outlined"}
          sx={{ borderRadius: 40 }}
        >
          Visualization
        </Button>
        <Button
          size="large"
          onClick={() => setAnalysisMode("Similarity")}
          variant={analysisMode === "Similarity" ? "contained" : "outlined"}
          sx={{ borderRadius: 40 }}
        >
          Similarity search
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default AnalysisModeSelect;
