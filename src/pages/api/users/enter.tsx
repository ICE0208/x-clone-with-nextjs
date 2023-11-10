import withHandler, { ResponseType } from "@/lib/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const { email, password, nickname } = req.body;
  console.log(email, password, nickname);

  res.json({ ok: true });
}

export default withHandler({
  methods: ["POST"],
  fn: handler,
  isPrivate: false,
});
