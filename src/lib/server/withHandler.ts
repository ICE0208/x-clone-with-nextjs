import { NextApiRequest, NextApiResponse } from "next";

export interface DefaultResponseType {
  ok: boolean;
}

type Method = "GET" | "POST" | "DELETE";

interface NextApiRequestWithSession extends NextApiRequest {
  session: {
    user: any;
    [key: string]: any;
  };
}

interface ConfigType {
  methods: Method[];
  fn: (req: NextApiRequestWithSession, res: NextApiResponse) => Promise<any>;
  isPrivate?: boolean;
}

export default function withHandler({
  methods,
  isPrivate = true,
  fn,
}: ConfigType) {
  return async function (
    req: NextApiRequestWithSession,
    res: NextApiResponse,
  ): Promise<any> {
    if (req.method && !methods.includes(req.method as Method)) {
      return res.status(405).end();
    }
    if (isPrivate && !req.session.user) {
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
