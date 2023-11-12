import TweetPreview from "@/components/tweet";
import useMutation from "@/lib/client/useMutation";
import useUser from "@/lib/client/useUser";
import { Tweet } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
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
    <div className="flex min-h-screen flex-col bg-black text-white">
      {tweetsData?.tweets && (
        <>
          <header className="flex h-12 items-center justify-center">
            <div className="text-[40px] font-bold">𝕏</div>
            <button
              onClick={handleLogoutButton}
              className="absolute right-3 top-3 rounded-md border-2 px-2 py-1"
            >
              LogOut
            </button>
          </header>
          <main className="flex flex-grow justify-center">
            <div className="flex w-[300px] flex-col">
              <h3 className="mb-4 border-b border-b-white py-2 text-[26px] font-bold">
                모든 게시글
              </h3>

              <div className="space-y-4 pb-12 pt-4">
                {tweetsData.tweets.map((tweet) => (
                  <TweetPreview key={tweet.id} tweet={tweet} />
                ))}
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
}
