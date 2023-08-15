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
  NumberInput,
  TextInput,
  Table,
  ActionIcon,
} from "@mantine/core";
import Link from "next/link";
import {
  IconActivityHeartbeat,
  IconChevronLeft,
  IconClothesRack,
  IconCross,
  IconScaleOutline,
  IconThermometer,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
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
    <Flex direction="column" gap={16}>
      <Title order={5}>{title}</Title>
      {children}
    </Flex>
  );
};

// height: 167,
// weight: 87,
// pulse: 124,
// temperature: 103,
// bloodPressure: "120/80",
const VITALS_DATA = [
  {
    label: "Height",
    component: NumberInput,
    icon: IconClothesRack,
    key: "height",
  },
  {
    label: "Weight",
    component: NumberInput,
    icon: IconScaleOutline,
    key: "weight",
  },
  {
    label: "Pulse",
    component: NumberInput,
    icon: IconActivityHeartbeat,
    key: "pulse",
  },
  {
    label: "Temperature",
    component: NumberInput,
    icon: IconThermometer,
    key: "temperature",
  },
  // {
  //   label: "blood Pressure",
  //   component: TextInput,
  //   icon: IconActivityHeartbeat,
  //   key: "bloodPressure",
  // },
];

const DEFAULT_COMPLAIN: {
  description: string;
  duration: number;
  severity: "moderate" | "high" | "mild";
  frequency: "constant" | "hourly" | "daily" | "weekly" | "rarely";
} = {
  description: "-",
  duration: 1,
  severity: "mild",
  frequency: "constant",
};
function ReportEditor() {
  const [patient, setPatient] = React.useState<IUser | null>(null);
  const [patientSearchQuery, setPatientSearchQuery] =
    React.useState<string>("");
  const { searchUserData, errorSearchingUser, isSearchingUser } =
    useSearchUser(patientSearchQuery);

  const [vitals, setVitals] = React.useState({
    height: 0,
    weight: 0,
    pulse: 0,
    temperature: 0,
    bloodPressure: "0/0",
  });

  const [complainsData, setComplains] = React.useState<
    {
      description: string;
      duration: number;
      severity: "moderate" | "high" | "mild";
      frequency: "constant" | "hourly" | "daily" | "weekly" | "rarely";
    }[]
  >([{ ...DEFAULT_COMPLAIN }]);

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
      <Section title="Vitals">
        <Flex wrap="wrap" gap={16}>
          {VITALS_DATA.map((vital) => {
            const Component = vital.component;
            return (
              <Component
                key={vital.key}
                label={vital.label}
                icon={<vital.icon size={16} />}
                value={parseFloat(
                  vitals[vital.key as keyof typeof vitals].toString()
                )}
                onChange={(value) => {
                  setVitals((prev) => ({ ...prev, [vital.key]: value }));
                }}
              />
            );
          })}
          <TextInput
            label="Blood Pressure"
            icon={<IconActivityHeartbeat size={16} />}
            value={vitals.bloodPressure}
            onChange={(event) => {
              setVitals((prev) => ({
                ...prev,
                bloodPressure: event.target.value,
              }));
            }}
          />
        </Flex>
      </Section>
      <Section title="Complains">
        <Flex
          direction="column"
          gap={16}
          style={{
            maxWidth: "40rem",
          }}
        >
          <Table striped withBorder horizontalSpacing="md" verticalSpacing="sm">
            <thead>
              <tr>
                <th>Complaint</th>
                <th>Frequency</th>
                <th>Severity</th>
                <th>Duration</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {complainsData.map((complain, complainIndex) => {
                console.log({ complainIndex });
                return (
                  <tr key={complainIndex}>
                    <td>
                      <TextInput
                        variant="unstyled"
                        value={complainsData[complainIndex].description}
                        onChange={(event) => {
                          const newComplains = [...complainsData];
                          newComplains[complainIndex].description =
                            event.target.value;
                          setComplains(newComplains);
                        }}
                      />
                    </td>
                    <td>
                      <Select
                        variant="unstyled"
                        value={complainsData[complainIndex].frequency}
                        data={[
                          "constant",
                          "hourly",
                          "daily",
                          "weekly",
                          "rarely",
                        ]}
                        onChange={(value) => {
                          if (value)
                            setComplains((prev) => {
                              const newComplains = [...prev];
                              newComplains[complainIndex].frequency = value as
                                | "constant"
                                | "hourly"
                                | "daily"
                                | "weekly"
                                | "rarely";
                              return newComplains;
                            });
                        }}
                      />
                    </td>
                    <td>
                      <Select
                        variant="unstyled"
                        value={complainsData[complainIndex].severity}
                        data={["moderate", "high", "mild"]}
                        onChange={(value) => {
                          if (value)
                            setComplains((prev) => {
                              const newComplains = [...prev];
                              newComplains[complainIndex].severity = value as
                                | "moderate"
                                | "high"
                                | "mild";
                              return newComplains;
                            });
                        }}
                      />
                    </td>
                    <td>
                      <NumberInput
                        variant="unstyled"
                        value={complainsData[complainIndex].duration}
                        onChange={(value) => {
                          setComplains((prev) => {
                            const newComplains = [...prev];
                            newComplains[complainIndex].duration = value || 0;
                            return newComplains;
                          });
                        }}
                      />
                    </td>
                    <td>
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        onClick={() => {
                          setComplains((prev) => {
                            const newComplains = [...prev];
                            newComplains.splice(complainIndex, 1);
                            return newComplains;
                          });
                        }}
                      >
                        <IconX size={18} />
                      </ActionIcon>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Button
            variant="outline"
            onClick={() => {
              setComplains((prev) => [...prev, { ...DEFAULT_COMPLAIN }]);
            }}
          >
            Add Complain
          </Button>
        </Flex>
      </Section>
    </Flex>
  );
}

export default ReportEditor;
