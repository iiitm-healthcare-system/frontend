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

export const useSearchUser = (query: string) => {
  return {
    searchUserData: new Array(3).fill(0).map((_, index) => ({
      _id: `${query}${index + 1}`,
      name: `${query}` + (index ? index + 1 : ""),
      email: `test${query}@gmail.com`,
      phone: "1234567890",
      role: "doctor",
    })) as IUser[],
    isSearchingUser: false,
    errorSearchingUser: false,
  };
};
