import { InputAdornment, TextField, Toolbar } from "@mui/material";
import {
  QuickFilter,
  QuickFilterClear,
  QuickFilterControl,
} from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";

const SearchToolbar = () => {
  return (
    <Toolbar>
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
    </Toolbar>
  );
};

//return (
//  <Toolbar>
//    <TextField
//      variant="outlined"
//      size="small"
//      placeholder="Search…"
//      value={searchText}
//      onChange={handleSearch}
//      sx={{ mb: 2 }}
//      //fullWidth
//    />
//  </Toolbar>
//);

export default SearchToolbar;
