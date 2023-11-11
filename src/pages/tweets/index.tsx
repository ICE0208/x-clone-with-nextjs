import Button from "@/components/button";
import useUser from "@/lib/client/useUser";
import { routerPushFn } from "@/lib/client/utils";
import { useRouter } from "next/router";

export default function Home() {
  const { user, isLoading: isUserLoading } = useUser();

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
