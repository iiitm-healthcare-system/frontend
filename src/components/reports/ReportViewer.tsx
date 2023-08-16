"use client";

import React from "react";
import styles from "./ReportViewer.module.css";
import {
  Autocomplete,
  Button,
  Flex,
  Loader,
  Select,
  Title,
  Text,
  NumberInput,
  TextInput,
  Table,
  ActionIcon,
  MultiSelect,
  Checkbox,
  Textarea,
  Chip,
  Skeleton,
} from "@mantine/core";
import Link from "next/link";
import {
  IconActivityHeartbeat,
  IconChevronLeft,
  IconClothesRack,
  IconCross,
  IconDownload,
  IconPlus,
  IconScaleOutline,
  IconThermometer,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { IUser } from "@/app/interfaces/IUser";
import { useSearchUser, useUser } from "@/hooks/user.swr";
import { ICase } from "@/app/interfaces/ICase";
import { useRecord } from "@/hooks/records.swr";
import { redirect, useParams } from "next/navigation";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <Flex direction="column" gap={16}>
      <Title order={5}>{title}</Title>
      {children}
    </Flex>
  );
};

function ReportViewer() {
  const params = useParams();
  const { recordData, errorFetchingRecordData, isRecordDataLoading } =
    useRecord(params.id as string);
  const { userData, errorFetchingUserData, isUserDataLoading } = useUser();

  if (isRecordDataLoading || isUserDataLoading) {
    return <Skeleton height={500} />;
  }

  if (
    errorFetchingRecordData ||
    errorFetchingUserData ||
    !userData ||
    !recordData
  ) {
    redirect("/");
  }

  return (
    <Flex className={styles.container} direction="column" gap="xl">
      <Flex gap={12} align="center" justify="space-between">
        <Flex gap={12} align="center">
          <Button unstyled component={Link} href="/dashboard">
            <Flex gap={12} align="center">
              <IconChevronLeft size={32} />
              <Title order={4}>Case Information</Title>
            </Flex>
          </Button>
          <Chip
            styles={{
              iconWrapper: {
                display: "none",
              },
            }}
            checked
            variant="light"
          >
            {params.id}
          </Chip>
        </Flex>
        <Button size="md" leftIcon={<IconDownload size={18} />} variant="subtle">
          Download Data
        </Button>
      </Flex>
    </Flex>
  );
}

export default ReportViewer;
