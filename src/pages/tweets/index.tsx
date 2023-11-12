import Button from "@/components/button";
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
      {tweetsData?.tweets && user && (
        <>
          <header className="flex h-12 items-center justify-center">
            <div className="text-[40px] font-bold">𝕏</div>
            <div className="absolute right-3 top-3 flex items-center">
              <span className="mr-2 text-lg">🐹 {user.name}</span>
              <button
                onClick={handleLogoutButton}
                className="rounded-md border-2 px-2 py-1 font-semibold"
              >
                LogOut
              </button>
            </div>
          </header>
          <main className="flex flex-grow justify-center">
            <div className="flex w-[300px] flex-col md:w-[400px] xl:w-[500px]">
              <h3 className="mb-4 border-b border-b-white py-2 text-[26px] font-bold">
                모든 게시글
              </h3>
              <div className="scrollbar-hide test-white box-border w-full resize-none space-y-3 rounded-3xl border border-white bg-black p-4">
                <span>당신의 경험을 공유해보세요.</span>
                <Button
                  kind="transparent-blue"
                  text="글쓰러 가기"
                  onClick={() => {
                    router.push("/tweets/upload");
                  }}
                />
              </div>
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
