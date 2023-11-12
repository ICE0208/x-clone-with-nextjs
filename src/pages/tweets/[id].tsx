import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { TweetWithDetail } from ".";
import useSWR from "swr";
import { TweetDetailResponseType } from "../api/tweets/[id]";
import Link from "next/link";
import { format } from "date-fns";
import { cls } from "@/lib/client/utils";
import useMutation from "@/lib/client/useMutation";

interface TweetWithDetailwithLike {
  tweet: TweetWithDetail;
  isLiked: boolean;
}

export default function TweetDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [queryDetail, setQueryDetail] = useState<TweetWithDetail | undefined>(
    undefined,
  );
  const {
    data: swrDetail,
    isLoading: isSWRLoading,
    mutate: swrDetailMutate,
  } = useSWR<TweetDetailResponseType>(
    id ? `/api/tweets/${id as string}` : null,
  );
  const [detail, setDetail] = useState<TweetWithDetailwithLike | undefined>(
    undefined,
  );

  useEffect(() => {
    const parseTweetDetail = () => {
      try {
        if (router.query.tweetDetail) {
          const parsedDetail = JSON.parse(
            router.query.tweetDetail as string,
          ) as TweetWithDetail;
          setQueryDetail(parsedDetail);
        }
      } catch (error) {
        console.error("Error parsing tweetDetail:", error);
      }
    };

    parseTweetDetail();
  }, [router]);

  useEffect(() => {
    if (swrDetail?.tweet) {
      setDetail({
        tweet: swrDetail.tweet,
        isLiked: Boolean(swrDetail.isLiked),
      });
    } else if (queryDetail) {
      setDetail({ tweet: queryDetail, isLiked: false });
    }
  }, [queryDetail, swrDetail]);

  const [likePost] = useMutation(`/api/tweets/${id}/like`);
  const [removeLikePost] = useMutation(`/api/tweets/${id}/removeLike`);
  const onLikeClick = () => {
    if (!swrDetail) return;
    if (swrDetail.isLiked) {
      swrDetailMutate((prev) => {
        if (!prev?.tweet?._count) {
          return prev;
        }
        return {
          ...prev,
          tweet: {
            ...prev.tweet,
            _count: { likes: prev.tweet._count.likes - 1 },
          },
          isLiked: false,
        };
      }, false);
      removeLikePost({ tweetId: id });
    } else {
      swrDetailMutate((prev) => {
        if (!prev?.tweet?._count) {
          return prev;
        }
        return {
          ...prev,
          tweet: {
            ...prev.tweet,
            _count: { likes: prev.tweet._count.likes + 1 },
          },
          isLiked: true,
        };
      }, false);
      likePost({ tweetId: id });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {detail && (
        <>
          <header className="flex h-12 items-center justify-center">
            <div className="text-[40px] font-bold">𝕏</div>
            <button className="absolute left-3 top-3 text-[18px]">
              <Link href="/tweets">✕</Link>
            </button>
          </header>
          <main className="flex flex-grow items-center justify-center">
            <div className="test-white box-border flex h-[300px] w-[300px] resize-none flex-col rounded-2xl border border-white bg-black p-4">
              <div className="flex space-x-2 text-lg">
                <div>🐹</div>
                <span>{detail.tweet.user.name}</span>
              </div>
              <hr className="my-3" />
              <div className="scrollbar-hide flex-grow overflow-y-auto">
                {detail.tweet.text.split("\n").map((line, index) => (
                  <React.Fragment key={index}>
                    <p className="break-all">{line}</p>
                  </React.Fragment>
                ))}
              </div>
              <div className="text-sm">
                <div className="mt-4 text-gray-400">
                  <span>
                    {format(
                      new Date(detail.tweet.createdAt),
                      `a HH:mm · yyyy-MM-dd`,
                    )}
                  </span>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={onLikeClick}
                    className={cls(
                      detail.isLiked
                        ? "text-red-400  hover:text-red-500"
                        : "text-gray-400  hover:text-gray-500",
                    )}
                  >
                    <svg
                      className="h-5 w-5 "
                      xmlns="http://www.w3.org/2000/svg"
                      fill={detail?.isLiked ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                  <span className="ml-1 text-gray-400">
                    {detail.tweet._count.likes}
                  </span>
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
}
