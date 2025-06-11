import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Papa from "papaparse";

interface ColumnSelectProps {
  file: File | null;
}

const ColumnSelect = ({ file }: ColumnSelectProps) => {
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

  const gridColumns: GridColDef[] = columns.map((column) => ({
    field: column,
    headerName: column,
  }));

  return (
    <DataGrid
      rows={rows}
      columns={gridColumns}
      initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
    />
  );
};

export default ColumnSelect;
