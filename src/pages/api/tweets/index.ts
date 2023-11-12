import client from "@/lib/server/client";
import withHandler, { DefaultResponseType } from "@/lib/server/withHandler";
import { withApiSession } from "@/lib/server/withSession";
import { IronSessionData } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";

export interface TweetResponseType extends DefaultResponseType {
  [key: string]: any;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TweetResponseType>,
) {
  if (req.method === "GET") {
    try {
      const tweets = await client.tweet.findMany({
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
        orderBy: {
          createdAt: "desc",
        },
      });

      return res.json({ ok: true, tweets });
    } catch (error) {
      console.log(`DB Error | Tweet Find | error: ${error}`);
      return res.status(500).json({ ok: false, msg: "DB Error | Tweet Find" });
    }
  }
  if (req.method === "POST") {
    const {
      body: { text },
      session: { user: sessionUser },
    }: { body: { userId: string; text: string }; session: IronSessionData } =
      req;

    // body Data 검증
    if (!text) {
      return res.status(400).json({ ok: false, msg: "need more data (text)" });
    }
    // session
    if (!sessionUser?.id) {
      return res.status(400).json({ ok: false });
    }
    // 텍스트 길이 제한
    const trimText = text.trim();
    if (trimText.length > 300) {
      return res.json({ ok: false, msg: "the text is too long" });
    }

    try {
      const tweet = await client.tweet.create({
        data: {
          text: trimText,
          user: {
            connect: {
              id: sessionUser?.id,
            },
          },
        },
      });
      res.json({
        ok: true,
        tweet: tweet,
        msg: "Good.",
      });
    } catch (error) {
      console.log(`DB Error | Tweet Create | error: ${error}`);
      return res
        .status(500)
        .json({ ok: false, msg: "DB Error | Tweet Create" });
    }
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    fn: handler,
    access: "LOGGEDIN",
  }),
);
