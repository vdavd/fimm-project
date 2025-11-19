import { InputAdornment, TextField, Toolbar, Tooltip } from "@mui/material";
import {
  ExportCsv,
  QuickFilter,
  QuickFilterClear,
  QuickFilterControl,
} from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const SearchToolbar = () => {
  return (
    <Toolbar sx={{ justifyContent: "space-between" }}>
      <QuickFilter expanded>
        <QuickFilterControl
          render={({ ref, ...other }) => (
            <TextField
              {...other}
              sx={{ width: 260 }}
              inputRef={ref}
              aria-label="Search"
              placeholder="Search..."
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: other.value ? (
                    <InputAdornment position="end">
                      <QuickFilterClear
                        edge="end"
                        size="small"
                        aria-label="Clear search"
                        material={{ sx: { marginRight: -0.75 } }}
                      >
                        <CancelIcon fontSize="small" />
                      </QuickFilterClear>
                    </InputAdornment>
                  ) : null,
                  ...other.slotProps?.input,
                },
                ...other.slotProps,
              }}
            />
          )}
        />
      </QuickFilter>
      <Tooltip title="Download as CSV">
        <ExportCsv>
          <FileDownloadIcon fontSize="small" />
        </ExportCsv>
      </Tooltip>
    </Toolbar>
  );
};

export default SearchToolbar;
