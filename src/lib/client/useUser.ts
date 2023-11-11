import { MeResponseType } from "@/pages/api/users/me";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

export default function useUser() {
  const { data, isLoading } = useSWR<MeResponseType>("/api/users/me");

  return { user: data?.profile, isLoading };
}
