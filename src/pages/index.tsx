import Button from "@/components/button";
import useOnlyNotLoggedIn from "@/lib/client/middleware/useOnlyNotLoggedIn";
import { routerPushFn } from "@/lib/client/utils";
import { useRouter } from "next/router";

export default function Home() {
  const { isLoading } = useOnlyNotLoggedIn();

  const router = useRouter();
  return (
    <main className="h-screen bg-black text-white">
      <div className="flex h-full flex-col items-center justify-center px-8 py-6">
        <div className="max-w-[400px]">
          <div className="text-[56px] font-bold">𝕏</div>
          <h2 className="my-4 py-4 text-[38px] font-bold">
            지금 일어나고 있는 일
          </h2>
          <div className="flex w-[300px] flex-col py-1">
            <h3 className="text-[22px] font-semibold">지금 가입하세요.</h3>
            <div className="mt-3 space-y-4">
              <Button text="₲oogle 계정으로 가입하기" kind="white-black" />
              <Button text="₳pple에서 가입하기" kind="white-black" />
            </div>
            <div className="relative m-1 flex h-[34px] w-full flex-col justify-center self-center py-2">
              <hr className="h-[0.6px] border-0 bg-[#546571a0]" />
              <div className="absolute left-0 right-0 flex h-full w-full items-center justify-center">
                <span className="bg-black px-[8px]">또는</span>
              </div>
            </div>
            <Button
              text="계정 만들기"
              kind="blue-white"
              onClick={routerPushFn(router, "/join")}
            />
            <div className="my-14 space-y-4 text-lg">
              <span className="font-semibold">이미 가입하셨나요?</span>
              <Button
                text="로그인"
                kind="transparent-blue"
                onClick={routerPushFn(router, "/login")}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
