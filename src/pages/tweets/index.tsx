import useOnlyLoggedIn from "@/lib/client/middleware/useOnlyLoggedIn";
import useUser from "@/lib/client/useUser";
import { Tweet } from "@prisma/client";
import Link from "next/link";
import useSWR from "swr";

interface TweetWithLikesCnt extends Tweet {
  user: {
    name: string;
  };
  _count: {
    likes: number;
  };
}

interface TweetsResponse {
  ok: boolean;
  tweets: TweetWithLikesCnt[];
}

export default function Tweets() {
  const { isLoading: loginCheckLoading } = useOnlyLoggedIn();
  const { user, isLoading: isUserLoading } = useUser();
  const {
    data: tweetsData,
    error,
    isLoading,
  } = useSWR<TweetsResponse>("/api/tweets");

  return (
    <main className="h-screen bg-black text-white">
      {user && tweetsData?.tweets && (
        <>
          <h1>Tweets</h1>
          <Link href="/tweets/upload">Upload</Link>
          {tweetsData.tweets.map((tweet) => {
            return (
              <div key={tweet.id}>
                <div className="space-x-2">
                  <span>{tweet.text}</span>
                  <span>{tweet.user.name}</span>
                  <span>{tweet._count.likes}</span>
                </div>
              </div>
            );
          })}
        </>
      )}
    </main>
  );
}
