import { useRouter } from "next/router";
import useLoggedIn from "../useLoggedIn";
import { useEffect } from "react";

export default function useOnlyNotLoggedIn() {
  const { loggedIn, isLoading } = useLoggedIn();

  const router = useRouter();
  useEffect(() => {
    if (!isLoading && loggedIn === true) {
      router.replace("/tweets");
    }
  }, [router, loggedIn, isLoading]);

  return { isLoading };
}
