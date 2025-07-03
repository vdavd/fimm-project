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
import type { LabelType } from "../types";

interface ColumnSelectProps {
  file: File | null;
  smilesColumn: string;
  labelColumn: string;
  setParsedFile: (parsedFile: string) => void;
  setSmilesColumn: (smilesColumn: string) => void;
  setLabelColumn: (labelcolumn: string) => void;
  setLabelType: (labelType: LabelType) => void;
  setHighlightedSmiles: (highLightedSmiles: string[]) => void;
}

const ColumnSelect = ({
  file,
  smilesColumn,
  labelColumn,
  setParsedFile,
  setSmilesColumn,
  setLabelColumn,
  setLabelType,
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
          // look for a smiles column in the data and automaticlly set it if found
          const smilesColumnCandidates = columns.filter((column) =>
            column.toLowerCase().includes("smiles")
          );
          if (smilesColumnCandidates.length !== 0) {
            setSmilesColumn(smilesColumnCandidates[0]);
          }
        },
        header: true,
        skipEmptyLines: true,
      });
    }
  }, [file, setParsedFile, setSmilesColumn]);

  const handleSmilesColumnChange = (event: SelectChangeEvent) => {
    const selectedColumn = event.target.value;
    setSmilesColumn(selectedColumn);
  };

  const handleLabelColumnChange = (event: SelectChangeEvent) => {
    const selectedColumn = event.target.value;
    setLabelColumn(event.target.value);

    // use number of unique values to guess whether the label is continuous or categorical
    const columnValues = rows.map(
      (row) => row[selectedColumn as keyof typeof row]
    );
    const uniqueValues = [...new Set(columnValues)];
    if (
      uniqueValues.length / columnValues.length < 0.1 &&
      uniqueValues.length <= 20
    ) {
      setLabelType("categorical");
    } else {
      setLabelType("continuous");
    }
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
