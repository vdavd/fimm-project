import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
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
  setSmilesColumn: (smilesColumn: string) => void;
  setLabelColumn: (labelcolumn: string) => void;
}

const ColumnSelect = ({
  file,
  smilesColumn,
  labelColumn,
  setSmilesColumn,
  setLabelColumn,
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
          } else {
            const dataWithIds = data.map((item, index) => ({
              id: index,
              ...item,
            }));
            setRows(dataWithIds);
            const colsWithID = ["id", ...columns];
            console.log(colsWithID);
            setColumns(colsWithID);
          }
        },
        header: true,
        skipEmptyLines: true,
      });
    }
  }, [file]);

  const handleSmilesColumnChange = (event: SelectChangeEvent) => {
    setSmilesColumn(event.target.value);
  };

  const handleLabelColumnChange = (event: SelectChangeEvent) => {
    setLabelColumn(event.target.value);
    console.log(labelColumn);
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
