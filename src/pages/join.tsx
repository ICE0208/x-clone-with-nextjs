import Button from "@/components/button";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <header className="flex h-12 items-center justify-center">
        <div className="text-[40px] font-bold">𝕏</div>
        <button className="absolute left-3 top-3 text-[18px]">
          <Link href="/">✕</Link>
        </button>
      </header>
      <main className="flex flex-grow items-center justify-center">
        <div className="fle flex w-[300px] flex-col">
          <h3 className="text-[26px] font-bold">지금 X에 가입하세요</h3>
          <div className="mt-6 space-y-4">
            <Button text="₲oogle 계정으로 로그인하기" kind="white-black" />
            <Button text="₳pple로 로그인하기" kind="white-black" />
          </div>
          <div className="relative m-1 flex h-[34px] w-full flex-col justify-center self-center py-2">
            <hr className="h-[0.6px] border-0 bg-[#546571a0]" />
            <div className="absolute left-0 right-0 flex h-full w-full items-center justify-center">
              <span className="bg-black px-[8px]">또는</span>
            </div>
          </div>
          <div className="space-y-8">
            <Button text="계정 만들기" kind="white-black" />
            <div className="text-sm">
              <span className="text-[#728b9b]">이미 계정이 있으신가요? </span>
              <span className="font-semibold text-[#1D9BF1]">
                <Link href="login">로그인</Link>
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
