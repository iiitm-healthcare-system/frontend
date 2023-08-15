import { useRecords } from "@/hooks/records.swr";
import React from "react";

function DataList() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const {} = useRecords(page, pageSize);
  return <div>DataList</div>;
}

export default DataList;
