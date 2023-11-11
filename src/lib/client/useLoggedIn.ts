import { LoginCheckResponseType } from "@/pages/api/users/loginCheck";
import useSWR from "swr";

export default function useLoggedIn() {
  const { data, isLoading } = useSWR<LoginCheckResponseType>(
    "/api/users/loginCheck",
  );

  return { isLoggedIn: data?.isLoggedIn, isLoading };
}
