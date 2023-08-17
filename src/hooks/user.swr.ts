import useSWR from "swr";
import API_CONSTANTS from "@/utils/apiConstants";
import { genericAPIFetcher } from "@/utils/helpers/swr.helper";
import { IUser } from "@/app/interfaces/IUser";

export function useUser() {
  const { data, error, isLoading } = useSWR(
    [API_CONSTANTS.GET_USER, "get"],
    genericAPIFetcher
  );

  return {
    userData: data?.data as IUser,
    isUserDataLoading: isLoading as boolean,
    errorFetchingUserData: error,
  };
}

export const useSearchUser = (query: string = "") => {
  if (!query) {
    query = " ";
  }
  if (query.includes("(")) {
    query = query.split("(")[0];
  }
  query = query.trim();
  query = query.replace(" ", "%20");
  const { data, error, isLoading } = useSWR(
    [
      API_CONSTANTS.SEARCH_PATIENTS,
      "get",
      {
        params: { query: query },
      },
      ,
    ],
    genericAPIFetcher
  );

  console.log(data?.data);
  return {
    searchUserData: (data?.data || []) as IUser[],
    isSearchingUser: isLoading as boolean,
    errorSearchingUser: error,
  };
};
