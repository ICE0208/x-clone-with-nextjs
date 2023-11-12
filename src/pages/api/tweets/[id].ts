import client from "@/lib/server/client";
import withHandler, { DefaultResponseType } from "@/lib/server/withHandler";
import { withApiSession } from "@/lib/server/withSession";
import { TweetWithDetail } from "@/pages/tweets";
import { IronSessionData } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";

export interface TweetDetailResponseType extends DefaultResponseType {
  tweet: TweetWithDetail | null;
  [key: string]: any;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TweetDetailResponseType>,
) {
  const id = req.query.id;
  if (typeof id !== "string") {
    return res.status(400).end();
  }

  try {
    const tweet = await client.tweet.findUnique({
      where: {
        id: +id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });

    if (!tweet) {
      return res.status(404).json({ ok: false, tweet: null });
    }
    return res.status(200).json({ ok: true, tweet: tweet });
  } catch (error) {
    console.log(`DB Error | Tweet Find | error: ${error}`);
    return res
      .status(500)
      .json({ ok: false, tweet: null, msg: "DB Error | Tweet Find" });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    fn: handler,
    access: "LOGGEDIN",
  }),
);
