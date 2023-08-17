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
  Timeline,
  ThemeIcon,
} from "@mantine/core";
import Link from "next/link";
import {
  IconActivityHeartbeat,
  IconAlertTriangle,
  IconCheck,
  IconChevronLeft,
  IconCircleCheckFilled,
  IconClothesRack,
  IconCross,
  IconDiscountCheck,
  IconDownload,
  IconFileText,
  IconPlus,
  IconScaleOutline,
  IconStethoscope,
  IconThermometer,
  IconTrash,
  IconWebhook,
  IconX,
} from "@tabler/icons-react";
import { IUser } from "@/app/interfaces/IUser";
import { useSearchUser, useUser } from "@/hooks/user.swr";
import { ICase } from "@/app/interfaces/ICase";
import { useRecord } from "@/hooks/records.swr";
import { redirect, useParams } from "next/navigation";
import { IconDiscountCheckFilled } from "@tabler/icons-react";
import { IconAlertTriangleFilled } from "@tabler/icons-react";

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
        <Button
          size="md"
          leftIcon={<IconDownload size={18} />}
          variant="subtle"
        >
          Download Data
        </Button>
      </Flex>
      <Section title="Overview">
        <Flex direction="row" gap={20}>
          <Flex
            direction="column"
            gap={10}
            p={16}
            className={styles.patientInfo}
          >
            <Text weight="500">Patient</Text>
            <Title transform="capitalize" order={5}>
              {recordData.patient.name}
            </Title>
            <Flex direction="column" gap={4}>
              <Text weight="500">{recordData.patient.email}</Text>
              <Text weight="500" color="primary">
                DOB: {new Date(recordData.patient.dob).toDateString()}
              </Text>
              <Text weight="500" color="primary">
                Gender: {recordData.patient.gender}
              </Text>
            </Flex>
          </Flex>
          <Flex direction="column" gap={16}>
            <Chip
              styles={{
                iconWrapper: {
                  display: "none",
                },
              }}
              checked
              variant="light"
            >
              {recordData.status}
            </Chip>
            <Flex direction="column" gap={4}>
              <Title order={6}>Complaints</Title>
              <Text color="black.4">
                {recordData.complaints
                  .map((item) => item.description)
                  .join(", ")}
              </Text>
            </Flex>
            <Flex direction="column" gap={4}>
              <Title order={6}>Diagnosis</Title>
              <Text color="black.4">{recordData.diagnosis.join(", ")}</Text>
            </Flex>
          </Flex>
        </Flex>
      </Section>
      <Section title="Diagnosis History">
        <Timeline active={3} bulletSize={30} lineWidth={4}>
          <Timeline.Item
            title={<Title order={6}>Case Filed</Title>}
            bullet={<IconStethoscope size={14} />}
          >
            <Text size="lg" transform="capitalize">
              By{" "}
              <Text transform="capitalize" span weight="700" color="primary">
                {recordData.doctor.name}
              </Text>
            </Text>
            <Text size="sm" color="dimmed" mt={4}>
              {new Date(recordData.createdAt).toLocaleString()}
            </Text>
          </Timeline.Item>
          <Timeline.Item
            title={<Title order={6}>Prescription Given</Title>}
            bullet={<IconFileText size={14} />}
          >
            <Flex direction="column" gap="sm">
              <Title order={6} color="black.4">
                Medications
              </Title>
              <Flex
                direction="column"
                gap={16}
                style={{
                  width: "fit-content",
                }}
              >
                {recordData.prescription.medications.map(
                  (medication, index) => (
                    <Flex
                      key={index}
                      p={16}
                      gap={12}
                      direction="column"
                      className={styles.medicationCard}
                    >
                      {medication.provided ? (
                        <Flex gap={14} align="center">
                          <ThemeIcon size={40} variant="light" color="teal">
                            <IconDiscountCheckFilled />
                          </ThemeIcon>
                          <Flex direction="column">
                            <Text color="dimmed" size="sm">
                              Provided by
                            </Text>
                            <Text
                              color="primary"
                              weight={600}
                              transform="capitalize"
                            >
                              {recordData.attendant?.name}
                            </Text>
                          </Flex>
                        </Flex>
                      ) : (
                        <>
                          {userData.role == "attendant" ? (
                            <Flex>
                              <Button color="teal" size="md">
                                Mark As Given
                              </Button>
                            </Flex>
                          ) : (
                            <Flex gap={14} align="center">
                              <ThemeIcon
                                size={36}
                                variant="light"
                                color="yellow"
                              >
                                <IconAlertTriangleFilled size={20} />
                              </ThemeIcon>
                              <Flex direction="column">
                                <Text color="yellow" size="md" weight={600}>
                                  Medication Not Provided Yet
                                </Text>
                              </Flex>
                            </Flex>
                          )}
                        </>
                      )}
                      <Flex gap={12} align="center">
                        <Text size="xl" weight="700" transform="capitalize">
                          {medication.name}
                        </Text>
                        <Text>Quantity: {medication.quantity}</Text>
                      </Flex>
                      <Flex direction="column" gap={8}>
                        <Title order={6} transform="capitalize" color="dimmed">
                          {medication.type}
                        </Title>
                        {medication.type == "dosage" ? (
                          <Flex gap={12}>
                            {Object.keys(medication.dosage).map(
                              (dosage, index) => (
                                <Chip
                                  styles={{
                                    iconWrapper: {
                                      display: "none",
                                    },
                                  }}
                                  checked
                                  variant="outline"
                                  key={index}
                                >
                                  {dosage.toUpperCase()} -{" "}
                                  {Object.keys(
                                    medication.dosage[
                                      dosage as keyof typeof medication.dosage
                                    ]
                                  )
                                    .filter(
                                      (item) =>
                                        medication.dosage[
                                          dosage as keyof typeof medication.dosage
                                        ][
                                          item as keyof ICase["prescription"]["medications"][0]["dosage"]["afternoon"]
                                        ]
                                    )
                                    .map((item) => {
                                      const data = {
                                        beforeMeal: "Before Meal",
                                        afterMeal: "After Meal",
                                      };
                                      return data[item as keyof typeof data];
                                    })
                                    .join(", ")}
                                </Chip>
                              )
                            )}
                          </Flex>
                        ) : (
                          <Text>{medication.notes}</Text>
                        )}
                      </Flex>
                    </Flex>
                  )
                )}
              </Flex>
              <Title order={6} color="black.4">
                Advice
              </Title>
              <Text>{recordData.prescription.advice}</Text>
            </Flex>
          </Timeline.Item>
          <Timeline.Item
            title={
              <Title order={6}>
                {recordData.status == "completed"
                  ? "Marked As Complete"
                  : "Actions"}
              </Title>
            }
            bullet={<IconWebhook size={14} />}
          >
            {recordData.status == "completed" ? (
              <>
                <Text size="lg">
                  By{" "}
                  <Text
                    span
                    weight="700"
                    color="primary"
                    transform="capitalize"
                  >
                    {recordData.completedBy?.name}
                  </Text>
                </Text>
                <Text size="sm" color="dimmed" mt={4}>
                  {new Date(recordData.completedAt ?? 0).toLocaleString()}
                </Text>
              </>
            ) : (
              <Button
                rightIcon={<IconCheck size={16} />}
                variant="filled"
                color="teal"
              >
                Mark As Complete
              </Button>
            )}
          </Timeline.Item>
        </Timeline>
      </Section>
    </Flex>
  );
}

export default ReportViewer;
