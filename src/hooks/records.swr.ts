import useSWR from "swr";
import API_CONSTANTS from "@/utils/apiConstants";
import { genericAPIFetcher } from "@/utils/helpers/swr.helper";
import { ICase } from "@/app/interfaces/ICase";

export function useRecords(page: number, limit: number) {
  const { data, error, isLoading } = useSWR(
    [API_CONSTANTS.GET_ALL_CASES, "get", { params: { page, limit } }],
    genericAPIFetcher
  );

  return {
    recordsData: data?.data?.cases as ICase[],
    totalRecordsCount: (data?.data?.count || 0) as number,
    isRecordsDataLoading: isLoading as boolean,
    errorFetchingRecordsData: error,
  };
}

export function useRecord(recordId: string) {
  const index = recordId;
  return {
    recordData: {
      _id: index.toString(),
      patient: {
        _id: (50 + index).toString(),
        name: "patinet " + index,
        email: `imt_2020${index + 1}@iiitm.ac.in`,
        dob: "1999-08-01" as string,
        phone: "1234567890",
        gender: "Male",
        role: "patient",
      },
      doctor: {
        _id: (100 + index).toString(),
        name: "Dr John " + index,
        email: `dcotor_${index + 1}@iiitm.ac.in`,
        dob: "1995-08-01" as string,
        gender: "Male",
        phone: "1234567890",
        role: "doctor",
      },
      attendant: {
        _id: (150 + index).toString(),
        name: "Ms Attendant " + index,
        email: `attendant_${index + 1}iiitm.ac.in`,
        dob: "1995-08-01" as string,
        gender: "Female",
        phone: "1234567890",
        role: "attendant",
      },
      vitals: {
        height: 167,
        weight: 87,
        pulse: 124,
        temperature: 103,
        bloodPressure: "120/80",
      },
      complaints: [
        {
          description: "weakness",
          duration: 5,
          severity: "high",
          frequency: "constant",
        },
        {
          description: "headache",
          duration: 5,
          severity: "high",
          frequency: "constant",
        },
      ],
      diagnosis: ["fever", "cough", "cold"],
      status: "ongoing",
      prescription: {
        medications: [
          {
            name: "Amoxicillin - 500 mg",
            quantity: 8,
            dosage: {
              morning: {
                beforeMeal: true,
                afterMeal: false,
              },
              afternoon: {
                beforeMeal: true,
                afterMeal: false,
              },
              night: {
                beforeMeal: true,
                afterMeal: true,
              },
            },
            notes: "",
            type: "dosage",
            provided: true,
          },
          {
            name: "Amoxicillin - 500 mg",
            quantity: 8,
            dosage: {
              morning: {
                beforeMeal: true,
                afterMeal: false,
              },
              afternoon: {
                beforeMeal: true,
                afterMeal: false,
              },
              night: {
                beforeMeal: true,
                afterMeal: false,
              },
            },
            notes: "Take When headache",
            type: "notes",
          },
        ],
        advice: "Take Bed Rest",
      },
      createdAt: new Date("2021-08-01T18:30:00.000Z"),
      completedAt: new Date("2021-08-01T18:30:00.000Z"),
      completedBy: {
        _id: (200 + index).toString(),
        name: "Admin " + index,
        email: `attendant_${index + 1}iiitm.ac.in`,
        dob: "1995-08-01" as string,
        gender: "Female",
        phone: "1234567890",
        role: "attendant",
      },
    } as ICase,
    isRecordDataLoading: false,
    errorFetchingRecordData: false,
  };
}

export function useAnalytics(timeframe: string, type: string) {
  return {
    analytiicsData: new Array(10).fill(0).map((_, index) => ({
      name: "Data " + index,
      amt: Math.floor(Math.random() * 1000),
    })),
    isAnalyticsDataLoading: false,
    errorFetchingAnalyticsData: false,
  };
}

export function useQuickStats() {
  return {
    quickStatsData: {
      cases: 647,
      admitted: 3,
      recovered: 544,
      ongoing: 46,
    },
    isQuickStatsDataLoading: false,
    errorFetchingQuickStatsData: false,
  };
}
