import useSWR from "swr";
import API_CONSTANTS from "@/utils/apiConstants";
import { genericAPIFetcher } from "@/utils/helpers/swr.helper";
import { ICase } from "@/app/interfaces/ICase";

export function useRecords(page: number, limit: number) {
  // const { data, error, isLoading } = useSWR(
  //   [API_CONSTANTS.GET_RECORDS, "get", page, limit],
  //   genericAPIFetcher
  // );

  // return {
  //   recordsData: data?.data?.response?.records as ICase[],
  //   isRecordsDataLoading: isLoading as boolean,
  //   errorFetchingRecordsData: error,
  // };

  return {
    recordsData: new Array(10).fill(0).map((_, index) => ({
      _id: index.toString(),
      patient: {
        _id: (50 + index).toString(),
        name: "patinet " + index,
        email: `imt_2020${index + 1}@iiitm.ac.in`,
      },
      doctor: {
        _id: (100 + index).toString(),
        name: "Dr John " + index,
        email: `dcotor_${index + 1}@iiitm.ac.in`,
      },
      attendant: {
        _id: (150 + index).toString(),
        name: "Mr Attendant " + index,
        email: `attendant_${index + 1}iiitm.ac.in`,
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
          since: "2021-08-01T18:30:00.000Z",
        },
        {
          description: "headache",
          duration: 5,
          severity: "high",
          frequency: "constant",
          since: "2021-08-01T18:30:00.000Z",
        },
      ],
      diagnosis: ["fever", "cough", "cold"],
      prescriptions: [
        {
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
                evening: {
                  beforeMeal: false,
                  afterMeal: false,
                },
                night: {
                  beforeMeal: true,
                  afterMeal: false,
                },
              },
            },
            {
              name: "Medications - 200 mg",
              quantity: 6,
              notes: "Take when headache",
            },
          ],
          advice: "Take Bed Rest",
        },
      ],
      createdAt: new Date("2021-08-01T18:30:00.000Z"),
    })) as ICase[],
    isRecordsDataLoading: false,
    errorFetchingRecordsData: false,
  };
}
