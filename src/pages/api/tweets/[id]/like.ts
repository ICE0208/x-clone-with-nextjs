import client from "@/lib/server/client";
import withHandler, { DefaultResponseType } from "@/lib/server/withHandler";
import { withApiSession } from "@/lib/server/withSession";
import { TweetWithDetail } from "@/pages/tweets";
import { IronSessionData } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";

export interface LikeResponseType extends DefaultResponseType {}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LikeResponseType>,
) {
  const {
    body: { tweetId },
    session: { user: sessionUser },
  }: { body: { userId: string; tweetId: string }; session: IronSessionData } =
    req;

  // body Data 검증
  if (!tweetId) {
    return res.status(400).json({ ok: false });
  }
  // session
  if (!sessionUser?.id) {
    return res.status(400).json({ ok: false });
  }

  try {
    const alreadyExists = await client.like.findFirst({
      where: {
        tweetId: +tweetId,
        userId: sessionUser.id,
      },
    });
    if (alreadyExists) {
      return res.status(200).json({ ok: false });
    } else {
      await client.like.create({
        data: {
          user: {
            connect: {
              id: sessionUser.id,
            },
          },
          tweet: {
            connect: {
              id: +tweetId,
            },
          },
        },
      });

      return res.json({ ok: true });
    }
  } catch (error) {
    console.log(`DB Error | Tweet Create | error: ${error}`);
    return res.status(500).json({ ok: false });
  }
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    fn: handler,
    access: "LOGGEDIN",
  }),
);
