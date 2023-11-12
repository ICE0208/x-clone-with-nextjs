import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TweetWithDetail } from ".";
import useSWR from "swr";
import { TweetDetailResponseType } from "../api/tweets/[id]";

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

  console.log(detail);
}
