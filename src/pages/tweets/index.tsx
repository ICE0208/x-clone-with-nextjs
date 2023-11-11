import useUser from "@/lib/client/useUser";

export default function Home() {
  const { user, isLoading: isUserLoading } = useUser();

  return (
    <main className="h-screen bg-black text-white">
      {user && (
        <>
          <h1>Hello</h1>
        </>
      )}
    </main>
  );
}
