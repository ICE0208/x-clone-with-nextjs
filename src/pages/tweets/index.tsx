import Button from "@/components/button";
import { routerPushFn } from "@/lib/client/utils";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <main className="h-screen bg-black text-white">
      <h1>Hello</h1>
    </main>
  );
}
