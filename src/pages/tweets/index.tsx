import Button from "@/components/button";
import useUser from "@/lib/client/useUser";
import { routerPushFn } from "@/lib/client/utils";
import { useRouter } from "next/router";
import useSWR from "swr";
import { LoginCheckResponseType } from "../api/users/loginCheck";

export default function Home() {
  const { user, isLoading: isUserLoading } = useUser();
  const { data, isLoading: loginCheckLoading } = useSWR<LoginCheckResponseType>(
    "/api/users/loginCheck",
  );

  return (
    <main className="h-screen bg-black text-white">
      {!isUserLoading && (
        <>
          <h1>Hello</h1>
        </>
      )}
    </main>
  );
}
