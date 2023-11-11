import { LoginCheckResponseType } from "@/pages/api/users/loginCheck";
import useSWR from "swr";

export default function useIsLoggedIn() {
  const { data, isLoading } = useSWR<LoginCheckResponseType>(
    "/api/users/loginCheck",
  );

  return { isLoggedIn: data?.isLoggedIn, isLoading };
}
