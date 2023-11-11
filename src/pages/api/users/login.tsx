import client from "@/lib/server/client";
import withHandler, { DefaultResponseType } from "@/lib/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

interface ResponseType extends DefaultResponseType {
  msg: string;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const { email, password } = req.body;

  let user;
  try {
    user = await client?.user.findUnique({
      where: { email: email },
    });
  } catch (error) {
    console.log(`DB Error | User Find | error: ${error}`);
    return res.status(500).json({ ok: false, msg: "DB Error | User Find" });
  }

  if (!user) {
    return res
      .status(200)
      .json({ ok: false, msg: "This user does not exist." });
  }

  if (user.password !== password) {
    return res.status(200).json({ ok: false, msg: "wrong password :(" });
  }

  res.status(200).json({ ok: true, msg: "Good." });
}

export default withHandler({
  methods: ["POST"],
  fn: handler,
  isPrivate: false,
});
