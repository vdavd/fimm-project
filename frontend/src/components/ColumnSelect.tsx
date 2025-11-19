import {
  DataGrid,
  GRID_CHECKBOX_SELECTION_COL_DEF,
  useGridApiRef,
} from "@mui/x-data-grid";
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
import SearchToolbar from "./CustomToolbar";

interface ColumnSelectProps {
  file: File | null;
  smilesColumn: string;
  labelColumn: string;
  setParsedFile: (parsedFile: string) => void;
  setSmilesColumn: (smilesColumn: string) => void;
  setLabelColumn: (labelcolumn: string) => void;
  setLabelType: (labelType: LabelType) => void;
  setHighlightedSmiles: (highLightedSmiles: string[]) => void;
  analyzedData: string;
}

type RowObject = Record<string, any> & { molSimToolId: number };

const ColumnSelect = ({
  file,
  smilesColumn,
  labelColumn,
  setParsedFile,
  setSmilesColumn,
  setLabelColumn,
  setLabelType,
  setHighlightedSmiles,
  analyzedData,
}: ColumnSelectProps) => {
  const [rows, setRows] = useState<RowObject[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [missingRowIds, setMissingRowIds] = useState<number[]>([]);

  const gridApiRef = useGridApiRef();

  useEffect(() => {
    if (file != null) {
      Papa.parse(file, {
        complete: (results) => {
          const data = results.data as object[];
          const columns = Object.keys(data[0]);

          const dataWithIds = data.map((item, index) => ({
            molSimToolId: index,
            ...item,
          }));
          setRows(dataWithIds);
          const colsWithID = ["molSimToolId", ...columns];
          setColumns(colsWithID);
          setParsedFile(Papa.unparse(dataWithIds));
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

  useEffect(() => {
    const findMissingIds = (analyzedData: string, rows: RowObject[]) => {
      const objectData = JSON.parse(analyzedData);
      const analyzedDataIds = Object.values(objectData.molSimToolId).map((id) =>
        Number(id)
      );
      const rowIds = rows.map((row) => Number(row.molSimToolId));

      const missingIds = rowIds.filter((id) => !analyzedDataIds.includes(id));
      setMissingRowIds(missingIds);
    };
    if (analyzedData !== "" && rows.length !== 0) {
      findMissingIds(analyzedData, rows);
    }
  }, [analyzedData]);

  useEffect(() => {
    if (gridApiRef.current) {
      gridApiRef.current.setRowSelectionModel({
        type: "include",
        ids: new Set(),
      });
    }
  }, [rows, gridApiRef]);

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

  const visibleColumns = columns.filter((column) => column !== "molSimToolId");

  const gridColumns: GridColDef[] = visibleColumns.map((column) => {
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

  const gridColumnsCheckboxSelection: GridColDef[] = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      headerName: "Highlight",
      description: "Select molecules to highlight",
    },
    ...gridColumns,
  ];

  const getRowId = (row: RowObject) => {
    return row.molSimToolId;
  };

  return (
    <>
      <Typography variant="h6">{file?.name}</Typography>
      <DataGrid
        getRowId={getRowId}
        apiRef={gridApiRef}
        sx={{
          my: 2,
          "& .disabled-row": {
            backgroundColor: "#f5f5f5",
            color: "#9e9e9e",
            pointerEvents: "none", // optional: block hover/click
          },
        }}
        rows={rows}
        columns={gridColumnsCheckboxSelection}
        initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
        slots={{
          toolbar: SearchToolbar,
        }}
        showToolbar
        checkboxSelection
        keepNonExistentRowsSelected
        disableRowSelectionOnClick
        onRowSelectionModelChange={handleHighlightSelectionChange}
        localeText={{ checkboxSelectionHeaderName: "Highlight" }}
        isRowSelectable={(params) =>
          !missingRowIds.includes(params.row.molSimToolId)
        }
        getRowClassName={(params) =>
          missingRowIds.includes(params.row.molSimToolId) ? "disabled-row" : ""
        }
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
