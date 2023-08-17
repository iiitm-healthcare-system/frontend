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
  const { data, error, isLoading, mutate } = useSWR(
    [API_CONSTANTS.GET_CASE_DATA(recordId), "get"],
    genericAPIFetcher
  );

  return {
    recordData: data?.data as ICase,
    isRecordDataLoading: isLoading as boolean,
    errorFetchingRecordData: error,
    mutateRecordData: mutate,
  };
}

export function useAnalytics(timeframe: string, type: string) {
  const { data, error, isLoading, mutate } = useSWR(
    [
      API_CONSTANTS.GET_ANALYTICS,
      "get",
      {
        params: {
          timeframe,
          type,
        },
      },
    ],
    genericAPIFetcher
  );

  return {
    analytiicsData: data?.data as {
      label: string;
      count: string;
    }[],
    isAnalyticsDataLoading: isLoading as boolean,
    errorFetchingAnalyticsData: error,
    mutateRecordData: mutate,
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
