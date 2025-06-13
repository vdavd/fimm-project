import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
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

  const gridColumns: GridColDef[] = columns.map((column) => ({
    field: column,
    headerName: column,
  }));

  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="smiles-select">SMILES</InputLabel>
          <Select
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
      </Box>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="label-select">Label</InputLabel>
          <Select
            labelId="label-select"
            id="label-select"
            value={labelColumn}
            label="Label"
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
      <DataGrid
        rows={rows}
        columns={gridColumns}
        initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
      />
    </>
  );
};

export default ColumnSelect;
