import client from "@/lib/server/client";
import withHandler, { DefaultResponseType } from "@/lib/server/withHandler";
import { withApiSession } from "@/lib/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

export interface Profile {
  id: number;
  email: string;
  name: string;
}
export interface MeResponseType extends DefaultResponseType {
  msg: string;
  profile: Profile | null;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MeResponseType>,
) {
  if (!req.session.user) {
    return res
      .status(200)
      .json({ ok: false, msg: "can't find the user.", profile: null });
  }

  let profile;
  try {
    profile = await client.user.findUnique({
      where: { id: req.session.user?.id },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  } catch (error) {
    console.log(`DB Error | User Find | error: ${error}`);
    return res
      .status(500)
      .json({ ok: false, msg: "DB Error | User Find", profile: null });
  }

  return res.status(200).json({ ok: true, msg: "Good.", profile: profile });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    fn: handler,
    access: "PUBLIC",
  }),
);
