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
    return res.json({ ok: true });
  }
  if (req.method === "POST") {
    const {
      body: { userId, text },
      session: { user: sessionUser },
    }: { body: { userId: string; text: string }; session: IronSessionData } =
      req;

    // body Data 검증
    if (!userId || !text) {
      return res
        .status(400)
        .json({ ok: false, msg: "need more data (userId AND text)" });
    }
    // session 유저 인증
    if (sessionUser?.id !== +userId) {
      return res.status(400).json({ ok: false, msg: "user auth error" });
    } // 텍스트 길이 제한
    if (text.length > 300) {
      return res.json({ ok: false, msg: "the text is too long" });
    }

    try {
      const tweet = await client.tweet.create({
        data: {
          text: text,
          user: {
            connect: {
              id: sessionUser.id,
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
      console.log(`DB Error | User Find | error: ${error}`);
      return res.status(500).json({ ok: false, msg: "DB Error | User Find" });
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
