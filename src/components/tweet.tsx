import { TweetWithDetail } from "@/pages/tweets";
import { format } from "date-fns";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export default function TweetPreview({ tweet }: { tweet: TweetWithDetail }) {
  const [isOverflow, setIsOverflow] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current && boxRef.current) {
      const boxContainer = boxRef.current;
      const textContainer = textRef.current;
      if (textContainer) {
        const isOverflowed =
          textContainer.scrollHeight > boxContainer.clientHeight;
        if (isOverflowed) {
          setIsOverflow(true);
        }
      }
    }
  }, [tweet]);

  return (
    <div
      key={tweet.id}
      className="scrollbar-hide test-white box-border w-full resize-none rounded-2xl border border-white bg-black p-4"
    >
      <Link
        href={{
          pathname: `/tweets/${tweet.id}`,
          query: { tweetDetail: JSON.stringify(tweet) },
        }}
        as={`/tweets/${tweet.id}`}
      >
        <div className="flex flex-col space-x-2">
          <div className="flex space-x-2 text-lg">
            <div>🐹</div>
            <span>{tweet.user.name}</span>
          </div>
          <hr className="my-3" />
          <div
            ref={boxRef}
            className={`scrollbar-hide overflow max-h-[170px] flex-grow overflow-hidden`}
          >
            <div ref={textRef}>
              {tweet.text.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  <p className="break-all">{line}</p>
                  <br />
                </React.Fragment>
              ))}
            </div>
          </div>
          {isOverflow ? (
            <div className="mt-2 flex justify-center">⋮</div>
          ) : null}
          <div className="text-sm">
            <div className="mt-4 text-gray-400">
              <span>
                {format(new Date(tweet.createdAt), `a HH:mm · yyyy-MM-dd`)}
              </span>
            </div>
            <span className=" text-gray-400">Likes: {tweet._count.likes}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
