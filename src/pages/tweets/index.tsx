import useMutation from "@/lib/client/useMutation";
import useUser from "@/lib/client/useUser";
import { Tweet } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

export interface TweetWithDetail extends Tweet {
  user: {
    id: number;
    name: string;
  };
  _count: {
    likes: number;
  };
}

interface TweetsResponse {
  ok: boolean;
  tweets: TweetWithDetail[];
}

export default function Tweets() {
  const router = useRouter();
  const { user, isLoading: isUserLoading, logout } = useUser();
  const {
    data: tweetsData,
    error,
    isLoading,
  } = useSWR<TweetsResponse>("/api/tweets");

  const handleLogoutButton = async () => {
    logout();
  };

  return (
    <main className="h-screen bg-black text-white">
      {user && tweetsData?.tweets && (
        <>
          <h1>Tweets</h1>
          <Link href="/tweets/upload">Upload</Link>
          <div>
            <button onClick={handleLogoutButton}>Logout</button>
          </div>
          {tweetsData.tweets.map((tweet) => {
            return (
              <div key={tweet.id}>
                <Link
                  href={{
                    pathname: `/tweets/${tweet.id}`,
                    query: { tweetDetail: JSON.stringify(tweet) },
                  }}
                  as={`/tweets/${tweet.id}`}
                >
                  <div className="space-x-2">
                    <span>{tweet.text}</span>
                    <span>{tweet.user.name}</span>
                    <span>{tweet._count.likes}</span>L
                  </div>
                </Link>
              </div>
            );
          })}
        </>
      )}
    </main>
  );
}
