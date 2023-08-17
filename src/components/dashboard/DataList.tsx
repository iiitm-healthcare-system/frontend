"use client";

import { useRecords } from "@/hooks/records.swr";
import { Flex, Pagination, Skeleton, Table, Text } from "@mantine/core";
import React from "react";
import styles from "./DataList.module.css";
import { useRouter } from "next/navigation";
import { getTitleCase } from "@/utils/helpers/titlecase";
import { ICase } from "@/app/interfaces/ICase";
import { useUser } from "@/hooks/user.swr";

const STATUS_COLOR = {
  admit: "red",
  ongoing: "yellow",
  completed: "teal",
};

const LIST_DATA_FIELDS = [
  {
    title: "Patient Name",
    accessor: (record: ICase) => getTitleCase(record.patient?.name),
    roles: ["admin", "attendant", "doctor"],
  },
  {
    title: "Patient Email",
    accessor: (record: ICase) => record.patient?.email,
    roles: ["admin", "attendant", "doctor"],
  },
  {
    title: "Doctor",
    accessor: (record: ICase) => getTitleCase(record.doctor?.name),
    roles: ["admin", "attendant"],
  },
  {
    title: "Attendant",
    accessor: (record: ICase) => getTitleCase(record.doctor?.name || "-"),
    roles: ["admin"],
  },
  {
    title: "Doctor Name",
    accessor: (record: ICase) => getTitleCase(record.doctor?.name),
    roles: ["patient"],
  },
  {
    title: "Doctor Email",
    accessor: (record: ICase) => record.doctor?.email,
    roles: ["patient"],
  },
  {
    title: "Date",
    accessor: (record: ICase) => new Date(record.createdAt).toDateString(),
    roles: ["admin", "attendant", "doctor", "patient"],
  },
  {
    title: "People Involved",
    accessor: (record: ICase) =>
      getTitleCase(
        [record.doctor?.name, record.attendant?.name]
          .filter((item) => item)
          .join(", ")
      ),
    roles: ["doctor", "patient"],
  },
  {
    title: "Note",
    accessor: (record: ICase) => getTitleCase(record.diagnosis.join(", ")),
    roles: ["admin", "attendant", "doctor", "patient"],
  },
  {
    title: "Status",
    accessor: (record: ICase) => (
      <Text weight="600" color={STATUS_COLOR[record.status as keyof typeof STATUS_COLOR]}>
        {getTitleCase(record.status)}
      </Text>
    ),
    roles: ["admin", "attendant", "doctor", "patient"],
  },
];

function DataList() {
  const router = useRouter();

  const [page, setPage] = React.useState(1);
  const {
    recordsData,
    totalRecordsCount,
    isRecordsDataLoading,
    errorFetchingRecordsData,
  } = useRecords(page, 10);
  const { userData, errorFetchingUserData, isUserDataLoading } = useUser();

  if (
    isRecordsDataLoading ||
    errorFetchingRecordsData ||
    !recordsData ||
    errorFetchingUserData ||
    isUserDataLoading ||
    !userData
  ) {
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
            {/* <th>Patient Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>People Involved</th>
            <th>Note</th>
            <th>Status</th> */}

            {LIST_DATA_FIELDS.filter((item) =>
              item.roles.includes(userData.role)
            ).map((item, index) => (
              <th key={index}>{item.title}</th>
            ))}
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
              {/* <td>{getTitleCase(record.patient?.name)}</td>
              <td>{record.patient?.email}</td>
              <td>{new Date(record.createdAt).toDateString()}</td>
              <td>
                {getTitleCase(
                  [record.doctor?.name, record.attendant?.name]
                    .filter((item) => item)
                    .join(", ")
                )}
              </td>
              <td>{getTitleCase(record.diagnosis.join(", "))}</td>
              <td color={STATUS_COLOR[record.status]}>
                {getTitleCase(record.status)}
              </td> */}
              {LIST_DATA_FIELDS.filter((item) =>
                item.roles.includes(userData.role)
              ).map((item, index) => (
                <td key={index}>{item.accessor(record)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        value={page}
        onChange={setPage}
        total={Math.ceil(totalRecordsCount / 10)}
      />
    </Flex>
  );
}

export default DataList;
