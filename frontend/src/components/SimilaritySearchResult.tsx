import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import SearchToolbar from "./SearchToolbar";

interface SimilaritySearchresultProps {
  similarityData: string;
}

type RowObject = Record<string, any> & { molSimToolId: number };

const SimilaritySearchResult = ({
  similarityData,
}: SimilaritySearchresultProps) => {
  const [rows, setRows] = useState<RowObject[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  useEffect(() => {
    if (similarityData) {
      const objectData = JSON.parse(similarityData);
      console.log(objectData);
      setRows(objectData);
      const columns = Object.keys(objectData[0]);
      console.log(columns);
      setColumns(columns);
    }
  }, [similarityData]);

  const getRowId = (row: RowObject) => {
    return row.molSimToolId;
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
  return (
    <DataGrid
      getRowId={getRowId}
      //apiRef={gridApiRef}
      sx={{
        my: 2,
      }}
      rows={rows}
      columns={gridColumns}
      initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
      slots={{
        toolbar: SearchToolbar,
      }}
      showToolbar
      disableRowSelectionOnClick
    />
  );
};

export default SimilaritySearchResult;
