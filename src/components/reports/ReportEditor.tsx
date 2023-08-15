"use client";

import React from "react";
import styles from "./ReportEditor.module.css";
import {
  Autocomplete,
  Button,
  Flex,
  Loader,
  Select,
  Title,
  Text,
} from "@mantine/core";
import Link from "next/link";
import { IconChevronLeft } from "@tabler/icons-react";
import { IUser } from "@/app/interfaces/IUser";
import { useSearchUser } from "@/hooks/user.swr";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <Flex direction="column" gap={20}>
      <Title order={5}>{title}</Title>
      {children}
    </Flex>
  );
};

function ReportEditor() {
  const [patient, setPatient] = React.useState<IUser | null>(null);
  const [patientSearchQuery, setPatientSearchQuery] =
    React.useState<string>("");
  const { searchUserData, errorSearchingUser, isSearchingUser } =
    useSearchUser(patientSearchQuery);
  return (
    <Flex className={styles.container} direction="column" gap="xl">
      <Button unstyled component={Link} href="/dashboard">
        <Flex gap={12} align="center">
          <IconChevronLeft size={32} />
          <Title order={4}>File New Case</Title>
        </Flex>
      </Button>
      <Section title="Overview">
        <Flex direction="column" className={styles.overview}>
          <Select
            label="Patient"
            required
            placeholder="Select Patient"
            data={searchUserData.map((user) => ({
              value: user._id,
              label: user.name,
            }))}
            value={patient?._id}
            onChange={(value) => {
              setPatient(
                searchUserData.find((user) => user._id === value) || null
              );
            }}
            searchable
            rightSection={isSearchingUser ? <Loader size="1rem" /> : null}
            onSearchChange={setPatientSearchQuery}
            size="md"
          />
          {patient && <Text color="primary">{patient.email}</Text>}
        </Flex>
      </Section>
    </Flex>
  );
}

export default ReportEditor;
