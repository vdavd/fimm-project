import {
  DataGrid,
  GRID_CHECKBOX_SELECTION_COL_DEF,
  useGridApiRef,
} from "@mui/x-data-grid";
import type { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Papa from "papaparse";
import type { RowObject } from "../types";
import SearchToolbar from "./CustomToolbar";

interface DisplayDataProps {
  file: File | null;
  rows: RowObject[];
  columns: string[];
  setRows: (rows: RowObject[]) => void;
  setColumns: (columns: string[]) => void;
  setParsedFile: (parsedFile: string) => void;
  setSmilesColumn: (smilesColumn: string) => void;
  setHighlightedSmiles: (highLightedSmiles: string[]) => void;
  analyzedData: string;
}

const DisplayData = ({
  file,
  rows,
  columns,
  setRows,
  setColumns,
  setParsedFile,
  setSmilesColumn,
  setHighlightedSmiles,
  analyzedData,
}: DisplayDataProps) => {
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
    <Box sx={{ pb: 2, borderBottom: "2px solid #ccc" }}>
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
    </Box>
  );
};

export default DisplayData;
