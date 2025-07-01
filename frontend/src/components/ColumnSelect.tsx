import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import Papa from "papaparse";

interface ColumnSelectProps {
  file: File | null;
  smilesColumn: string;
  labelColumn: string;
  setParsedFile: (parsedFile: string) => void;
  setSmilesColumn: (smilesColumn: string) => void;
  setLabelColumn: (labelcolumn: string) => void;
  setHighlightedSmiles: (highLightedSmiles: string[]) => void;
}

const ColumnSelect = ({
  file,
  smilesColumn,
  labelColumn,
  setParsedFile,
  setSmilesColumn,
  setLabelColumn,
  setHighlightedSmiles,
}: ColumnSelectProps) => {
  const [rows, setRows] = useState<object[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  useEffect(() => {
    if (file != null) {
      Papa.parse(file, {
        complete: (results) => {
          const data = results.data as object[];
          const columns = Object.keys(data[0]);

          if (columns.includes("id")) {
            setRows(data);
            setColumns(columns);
            setParsedFile(Papa.unparse(data));
          } else {
            const dataWithIds = data.map((item, index) => ({
              id: index,
              ...item,
            }));
            setRows(dataWithIds);
            const colsWithID = ["id", ...columns];
            console.log(colsWithID);
            setColumns(colsWithID);
            setParsedFile(Papa.unparse(dataWithIds));
          }
        },
        header: true,
        skipEmptyLines: true,
      });
    }
  }, [file, setParsedFile]);

  const handleSmilesColumnChange = (event: SelectChangeEvent) => {
    setSmilesColumn(event.target.value);
  };

  const handleLabelColumnChange = (event: SelectChangeEvent) => {
    setLabelColumn(event.target.value);
    console.log(labelColumn);
  };

  const handleHighlightSelectionChange = (selection: GridRowSelectionModel) => {
    const selectedIds = [...selection.ids.keys()].map((id) => String(id));
    setHighlightedSmiles(selectedIds);
  };

  const gridColumns: GridColDef[] = columns.map((column) => {
    if (column === "id" || column === "") {
      return { field: column, headerName: column, width: 75 };
    }
    return {
      field: column,
      headerName: column,
      flex: 1,
      minWidth: 150,
    };
  });

  return (
    <>
      <Typography variant="h6">{file?.name}</Typography>
      <DataGrid
        sx={{ my: 2 }}
        rows={rows}
        columns={gridColumns}
        initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
        showToolbar
        checkboxSelection
        onRowSelectionModelChange={handleHighlightSelectionChange}
        localeText={{ checkboxSelectionHeaderName: "Highlight" }}
      />
      <Box sx={{ minWidth: 120, display: "flex", gap: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="smiles-select" sx={{ my: 2 }}>
            SMILES
          </InputLabel>
          <Select
            sx={{ my: 2 }}
            labelId="smiles-select"
            id="smiles-select"
            value={smilesColumn}
            label="SMILES"
            onChange={handleSmilesColumnChange}
          >
            {columns
              .filter((column) => column !== "id")
              .map((column) => (
                <MenuItem value={column}>{column}</MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="label-select" sx={{ my: 2 }}>
            Labels
          </InputLabel>
          <Select
            sx={{ my: 2 }}
            labelId="label-select"
            id="label-select"
            value={labelColumn}
            label="Labels"
            onChange={handleLabelColumnChange}
          >
            {columns
              .filter((column) => column !== "id")
              .map((column) => (
                <MenuItem value={column}>{column}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default ColumnSelect;
