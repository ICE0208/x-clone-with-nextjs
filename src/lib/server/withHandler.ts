import { NextApiRequest, NextApiResponse } from "next";

export interface DefaultResponseType {
  ok: boolean;
}

type Method = "GET" | "POST" | "DELETE";

interface ConfigType {
  methods: Method[];
  fn: (req: NextApiRequest, res: NextApiResponse) => Promise<any>;
  access?: "PUBLIC" | "LOGGEDIN" | "NOT_LOGGEDIN";
}

export default function withHandler({
  methods,
  access = "PUBLIC",
  fn,
}: ConfigType) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse,
  ): Promise<any> {
    if (req.method && !methods.includes(req.method as Method)) {
      return res.status(405).end();
    }
    if (access === "LOGGEDIN" && !req.session.user) {
      return res.status(401).json({ ok: false });
    }
    if (access === "NOT_LOGGEDIN" && req.session.user) {
      return res.status(401).json({ ok: false });
    }

    try {
      await fn(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
