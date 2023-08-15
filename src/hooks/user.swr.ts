import useSWR from "swr";
import API_CONSTANTS from "@/utils/apiConstants";
import { genericAPIFetcher } from "@/utils/helpers/swr.helper";
import { IUser } from "@/app/interfaces/IUser";

export function useUser() {
  //   const { data, error, isLoading } = useSWR(
  //     [API_CONSTANTS.GET_USER, "get"],
  //     genericAPIFetcher
  //   );

  //   return {
  //     userData: data?.data?.response?.customer as IUser,
  //     isUserDataLoading: isLoading as boolean,
  //     errorFetchingUserData: error,
  //   };

  return {
    userData: {
      _id: "1",
      name: "Dr. Subhash Gupta",
      email: "test@gmail.com",
      phone: "1234567890",
      role: "admin",
    } as IUser,
    isUserDataLoading: false,
    errorFetchingUserData: false
  };
}
