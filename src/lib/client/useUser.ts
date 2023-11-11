import { MeResponseType } from "@/pages/api/users/me";
import { NextRouter, useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import useMutation from "./useMutation";

export default function useUser() {
  const { data, isLoading } = useSWR<MeResponseType>("/api/users/me");

  const router = useRouter();
  async function logout() {
    const response = await fetch("api/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      router.replace("/login");
    } else {
      console.error("로그아웃 실패. 서버 응답을 확인하십시오.");
    }
  }

  return { user: data?.profile, isLoading, logout };
}
