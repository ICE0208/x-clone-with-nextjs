import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getIronSession } from "iron-session/edge";

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();

  const session = await getIronSession(req, res, {
    cookieName: process.env.COOKIE_NAME!,
    password: process.env.COOKIE_PASSWORD!,
  });
  // do anything with session here:
  const { user } = session;

  const { pathname } = req.nextUrl;
  const onlyLoggedInPaths = [
    /^\/tweets(\/.*)*$/, // Regex to match /tweets and all their subpaths
  ];
  const onlyNotLoggedInPaths = [
    /^\/join(\/.*)*$/, // Regex to match /join and all their subpaths
    /^\/$/, // Regex to match the home path
    /^\/login$/, // Regex to match /login
  ];

  const isOnlyLoggedInPath = onlyLoggedInPaths.some((path) =>
    path.test(pathname),
  );
  const isOnlyNotLoggedInPath = onlyNotLoggedInPaths.some((path) =>
    path.test(pathname),
  );

  if (isOnlyLoggedInPath && !user) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(`${url}`);
  }
  if (isOnlyNotLoggedInPath && user) {
    const url = req.nextUrl.clone();
    url.pathname = "/tweets";
    return NextResponse.redirect(`${url}`);
  }
};

export const config = {
  matcher: ["/tweets/:path*", "/", "/login", "/join/:path*"],
};
