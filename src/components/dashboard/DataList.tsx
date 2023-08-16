"use client";

import { useRecords } from "@/hooks/records.swr";
import { Flex, Pagination, Skeleton, Table } from "@mantine/core";
import React from "react";
import styles from "./DataList.module.css";
import { useRouter } from "next/navigation";

const STATUS_COLOR = {
  admit: "red",
  ongoing: "yellow",
  completed: "teal",
};

function DataList() {
  const router = useRouter();

  const [page, setPage] = React.useState(1);
  const {
    recordsData,
    totalRecordsCount,
    isRecordsDataLoading,
    errorFetchingRecordsData,
  } = useRecords(page, 10);

  if (isRecordsDataLoading || errorFetchingRecordsData || !recordsData) {
    return (
      <Flex direction="column" gap="lg" className={styles.container}>
        <Skeleton height={50} width={300} />
        <Skeleton height={50} width={300} />
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      gap={30}
      align="center"
      className={styles.container}
    >
      <Table
        verticalSpacing="sm"
        striped
        highlightOnHover
        horizontalSpacing="md"
      >
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>People Involved</th>
            <th>Note</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {recordsData.map((record) => (
            <tr
              key={record._id}
              onClick={() => router.push(`/dashboard/case/${record._id}`)}
              style={{
                cursor: "pointer",
              }}
            >
              <td>{record.patient?.name}</td>
              <td>{record.patient?.email}</td>
              <td>{new Date(record.createdAt).toDateString()}</td>
              <td>
                {[record.doctor?.name, record.attendant?.name]
                  .filter((item) => item)
                  .join(", ")}
              </td>
              <td>{record.diagnosis.join(", ")}</td>
              <td color={STATUS_COLOR[record.status]}>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        value={page}
        onChange={setPage}
        total={totalRecordsCount / 10}
      />
    </Flex>
  );
}

export default DataList;
