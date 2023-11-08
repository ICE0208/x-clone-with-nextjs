import Button from "@/components/button";

export default function Home() {
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
            <div className="my-3 space-y-4">
              <Button text="₲oogle 계정으로 가입하기" kind="join-social" />
              <Button text="₳pple에서 가입하기" kind="join-social" />
            </div>
            <div className="self-center py-2">
              <span>또는</span>
            </div>
            <Button text="계정 만들기" kind="join" />
            <div className="my-14 space-y-4 text-lg">
              <span className="font-semibold">이미 가입하셨나요?</span>
              <Button text="로그인" kind="login" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
