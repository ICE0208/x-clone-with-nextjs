import { NextRouter, useRouter } from "next/router";

export function cls(...classnames: string[]) {
  return classnames.join(" ");
}

export function routerPushFn(router: NextRouter, url: string) {
  return () => {
    router.push(url);
  };
}
