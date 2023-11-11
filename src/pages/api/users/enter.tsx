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
  const { email, password, nickname } = req.body;

  let user = await client?.user.findUnique({
    where: { email: email },
  });
  if (user) {
    return res.json({ ok: false, msg: "This email already exists." });
  }

  try {
    user = await client?.user.create({
      data: {
        email: email,
        name: nickname,
        password: password,
      },
    });
  } catch (error) {
    console.log(error);

    return res.json({ ok: false, msg: "DB Error | User Create" });
  }

  res.json({ ok: true, msg: "Good." });
}

export default withHandler({
  methods: ["POST"],
  fn: handler,
  isPrivate: false,
});
