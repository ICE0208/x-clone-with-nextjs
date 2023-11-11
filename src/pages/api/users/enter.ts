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

  let user;
  try {
    user = await client?.user.findUnique({
      where: { email: email },
    });
  } catch (error) {
    console.log(`DB Error | User Find | error: ${error}`);
    return res.status(500).json({ ok: false, msg: "DB Error | User Find" });
  }

  if (user) {
    return res
      .status(200)
      .json({ ok: false, msg: "This email already exists." });
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
    console.log(`DB Error | User Create | error: ${error}`);
    return res.status(500).json({ ok: false, msg: "DB Error | User Create" });
  }

  res.status(200).json({ ok: true, msg: "Good." });
}

export default withHandler({
  methods: ["POST"],
  fn: handler,
  access: "NOT_LOGGEDIN",
});
