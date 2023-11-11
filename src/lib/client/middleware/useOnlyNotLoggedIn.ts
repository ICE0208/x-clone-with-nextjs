import { useRouter } from "next/router";
import useLoggedIn from "../useLoggedIn";
import { useEffect } from "react";

export default function useOnlyNotLoggedIn() {
  const { isLoggedIn, isLoading } = useLoggedIn();

  const router = useRouter();
  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      router.replace("/tweets");
    }
  }, [isLoading, isLoggedIn, router]);

  return { isLoading };
}
