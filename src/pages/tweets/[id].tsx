import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { TweetWithDetail } from ".";
import useSWR from "swr";
import { TweetDetailResponseType } from "../api/tweets/[id]";
import Link from "next/link";
import { format } from "date-fns";

export default function TweetDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [queryDetail, setQueryDetail] = useState<TweetWithDetail | undefined>(
    undefined,
  );
  const { data: swrDetail, isLoading: isSWRLoading } =
    useSWR<TweetDetailResponseType>(id ? `/api/tweets/${id as string}` : null);
  const [detail, setDetail] = useState<TweetWithDetail | undefined>(undefined);

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
      setDetail(swrDetail.tweet);
    } else if (queryDetail) {
      setDetail(queryDetail);
    }
  }, [queryDetail, swrDetail]);

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
                <span>{detail.user.name}</span>
              </div>
              <hr className="my-3" />
              <div className="scrollbar-hide flex-grow overflow-auto">
                {detail.text.split("\n").map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </div>
              <div className="mt-4 text-gray-400">
                {format(new Date(detail.createdAt), `a HH:mm · yyyy-MM-dd`)}
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
}
