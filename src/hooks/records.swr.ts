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
  const { data, error, isLoading } = useSWR(
    [API_CONSTANTS.GET_CASE_DATA(recordId), "get"],
    genericAPIFetcher
  );

  return {
    recordData: data?.data as ICase,
    isRecordDataLoading: isLoading as boolean,
    errorFetchingRecordData: error,
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
