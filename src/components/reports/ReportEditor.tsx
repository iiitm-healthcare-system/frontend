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
  MultiSelect,
  Checkbox,
  Textarea,
} from "@mantine/core";
import Link from "next/link";
import {
  IconActivityHeartbeat,
  IconChevronLeft,
  IconClothesRack,
  IconCross,
  IconPlus,
  IconScaleOutline,
  IconThermometer,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { IUser } from "@/app/interfaces/IUser";
import { useSearchUser } from "@/hooks/user.swr";
import { ICase } from "@/app/interfaces/ICase";
import { useDebouncedState } from "@mantine/hooks";

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
];

const DEFAULT_COMPLAIN: ICase["complaints"][0] = {
  description: "-",
  duration: 1,
  severity: "mild",
  frequency: "constant",
};

const DEFAULT_MEDICATION: ICase["prescription"]["medications"][0] = {
  name: "",
  quantity: 3,
  dosage: {
    morning: {
      beforeMeal: false,
      afterMeal: true,
    },
    afternoon: {
      beforeMeal: false,
      afterMeal: true,
    },
    night: {
      beforeMeal: false,
      afterMeal: true,
    },
  },
  notes: "",
  type: "dosage",
  provided: false,
};

function ReportEditor() {
  const [patient, setPatient] = React.useState<IUser | null>(null);
  // const [patientSearchQuery, setPatientSearchQuery] =
  //   React.useState<string>("");
  const [patientSearchQuery, setPatientSearchQuery] = useDebouncedState(
    "",
    200
  );
  const { searchUserData, errorSearchingUser, isSearchingUser } =
    useSearchUser(patientSearchQuery);

  const [vitals, setVitals] = React.useState({
    height: 0,
    weight: 0,
    pulse: 0,
    temperature: 0,
    bloodPressure: "0/0",
  });

  const [complainsData, setComplains] = React.useState<ICase["complaints"]>([
    { ...DEFAULT_COMPLAIN },
  ]);

  const [diagnosisOptions, setDiagnosisOptions] = React.useState<string[]>([]);
  const [diagnosis, setDiagnosis] = React.useState<string[]>([]);

  const [prescription, setPrescription] = React.useState<ICase["prescription"]>(
    {
      medications: [
        {
          ...DEFAULT_MEDICATION,
        },
      ],
      advice: "",
    }
  );

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
          <Autocomplete
            data={searchUserData.map((user) => ({
              label: user.name + " (" + user.email + ")",
              value: user.name + " (" + user.email + ")",
            }))}
            onChange={(value: string) => {
              setPatientSearchQuery(value);
              if (value.includes("(") && value.includes(")")) {
                const email = value.split("(")[1].split(")")[0];
                const foundData = searchUserData.find(
                  (item) => item.email == email
                );
                if (foundData) {
                  setPatient(foundData);
                }
              } else {
                setPatient(null);
              }
            }}
            rightSection={isSearchingUser ? <Loader size="1rem" /> : null}
            label="Patient"
            placeholder="Select Patient"
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
      <Section title="Diagnosis">
        <Flex
          direction="column"
          style={{
            maxWidth: "35rem",
          }}
        >
          <MultiSelect
            width={500}
            label="Diagnosis"
            data={[]}
            placeholder="Add items"
            searchable
            creatable
            getCreateLabel={(query) => `+ Add ${query}`}
            onCreate={(query) => {
              setDiagnosisOptions([...diagnosisOptions, query]);
              return query;
            }}
            onChange={setDiagnosis}
            size="md"
          />
        </Flex>
      </Section>
      <Section title="Prescription">
        <Flex
          direction="column"
          gap="lg"
          style={{
            width: "fit-content",
          }}
        >
          <Title order={6}>Medications</Title>
          {prescription.medications.map((medication, medicationIndex) => (
            <Flex
              direction="column"
              p={16}
              gap={12}
              key={medicationIndex}
              className={styles.medicationBox}
            >
              <Flex gap={12} align="center">
                <TextInput
                  style={{
                    width: "100%",
                  }}
                  size="md"
                  name="medication-name"
                  placeholder="Medication Name"
                  value={medication.name}
                  onChange={(event) => {
                    setPrescription((prev) => {
                      const newPrescription = { ...prev };
                      newPrescription.medications[medicationIndex].name =
                        event.target.value;
                      return newPrescription;
                    });
                  }}
                />
                <NumberInput
                  style={{
                    width: "fit-content",
                  }}
                  size="md"
                  value={medication.quantity}
                  onChange={(value) => {
                    setPrescription((prev) => {
                      const newPrescription = { ...prev };
                      newPrescription.medications[medicationIndex].quantity =
                        value || 0;
                      return newPrescription;
                    });
                  }}
                />
                <ActionIcon
                  onClick={() => {
                    setPrescription((prev) => {
                      const newPrescription = { ...prev };
                      newPrescription.medications.splice(medicationIndex, 1);
                      return newPrescription;
                    });
                  }}
                >
                  <IconX size={18} />
                </ActionIcon>
              </Flex>
              <Flex>
                <Select
                  variant="unstyled"
                  data={[
                    { label: "Dosage", value: "dosage" },
                    { label: "Notes", value: "notes" },
                  ]}
                  value={medication.type}
                  onChange={(value) => {
                    setPrescription((prev) => {
                      const newPrescription = { ...prev };
                      newPrescription.medications[medicationIndex].type =
                        (value?.toLocaleLowerCase() ??
                          "dosage") as ICase["prescription"]["medications"][0]["type"];
                      return newPrescription;
                    });
                  }}
                />
              </Flex>
              {medication.type == "dosage" ? (
                <Flex gap={12}>
                  {Object.keys(DEFAULT_MEDICATION.dosage).map(
                    (dosageTime, dosageIndex) => (
                      <Flex
                        direction="column"
                        gap="md"
                        key={dosageIndex}
                        p={12}
                        className={styles.dosageItem}
                      >
                        <Text transform="capitalize" weight="600">
                          {dosageTime}
                        </Text>
                        <Flex gap={16}>
                          <Checkbox
                            checked={
                              medication.dosage?.[
                                dosageTime as keyof typeof medication.dosage
                              ].beforeMeal
                            }
                            label="Before"
                            onChange={(event) => {
                              setPrescription((prev) => {
                                const newPrescription = { ...prev };
                                newPrescription.medications[
                                  medicationIndex
                                ].dosage[
                                  dosageTime as keyof typeof medication.dosage
                                ].beforeMeal = event.target.checked;

                                return newPrescription;
                              });
                            }}
                          />
                          <Checkbox
                            checked={
                              medication.dosage?.[
                                dosageTime as keyof typeof medication.dosage
                              ].afterMeal
                            }
                            label="After"
                            onChange={(event) => {
                              setPrescription((prev) => {
                                const newPrescription = { ...prev };
                                newPrescription.medications[
                                  medicationIndex
                                ].dosage[
                                  dosageTime as keyof typeof medication.dosage
                                ].afterMeal = event.target.checked;

                                return newPrescription;
                              });
                            }}
                          />
                        </Flex>
                      </Flex>
                    )
                  )}
                </Flex>
              ) : (
                <TextInput
                  label="Notes for Medication"
                  placeholder="Take when Headache"
                  value={medication.notes}
                  onChange={(event) => {
                    setPrescription((prev) => {
                      const newPrescription = { ...prev };
                      newPrescription.medications[medicationIndex].notes =
                        event.target.value ?? "";
                      return newPrescription;
                    });
                  }}
                />
              )}
            </Flex>
          ))}
          <Flex>
            <Button
              leftIcon={<IconPlus size={18} />}
              onClick={() => {
                setPrescription((prev) => {
                  const newPrescription = { ...prev };
                  newPrescription.medications = [
                    ...newPrescription.medications,
                    { ...DEFAULT_MEDICATION },
                  ];
                  return newPrescription;
                });
              }}
              variant="outline"
              size="md"
            >
              Add Medication
            </Button>
          </Flex>
        </Flex>
      </Section>
      <Section title="Advice">
        <Textarea
          style={{
            maxWidth: 500,
          }}
          size="md"
          value={prescription.advice}
          onChange={(event) =>
            setPrescription((prev) => ({ ...prev, advice: event.target.value }))
          }
          placeholder="Advice for Patient"
        />
      </Section>
      <Flex>
        <Button size="md">Continue</Button>
      </Flex>
    </Flex>
  );
}

export default ReportEditor;
