import withHandler, { DefaultResponseType } from "@/lib/server/withHandler";
import { withApiSession } from "@/lib/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

export interface LoginCheckResponseType extends DefaultResponseType {
  isLoggedIn: boolean;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginCheckResponseType>,
) {
  const isLoggedIn = Boolean(req.session.user?.id);
  return res.status(200).json({
    ok: true,
    isLoggedIn: isLoggedIn,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    fn: handler,
    access: "PUBLIC",
  }),
);
