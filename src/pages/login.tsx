import Button from "@/components/button";
import Input from "@/components/input";
import useMutation from "@/lib/client/useMutation";
import useUser from "@/lib/client/useUser";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface LoginForm {
  email: string;
  password: string;
}

interface LoginMutationResult {
  ok: boolean;
  msg?: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const [
    login,
    { loading: loginLoading, data: loginData, status: loginStatus },
  ] = useMutation<LoginMutationResult>("/api/users/login");

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    if (loginLoading) return;
    login(data);
  };

  const router = useRouter();
  useEffect(() => {
    if (loginStatus === 200 && loginData) {
      if (loginData.ok) {
        router.push("/tweets");
      } else {
        alert(loginData.msg);
      }
    }
  }, [router, loginData, loginStatus]);

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
          <h3 className="text-[26px] font-bold">X 로그인하기</h3>
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
          <form onSubmit={handleSubmit(onSubmit)} className="mt-2 space-y-4">
            <Input
              register={register("email", { required: true })}
              type="email"
              placeholder="이메일 주소"
            />
            <Input
              register={register("password", { required: true })}
              type="password"
              placeholder="비밀번호"
            />
            <Button text="로그인" kind="white-black" />
          </form>
          <div className="mt-4 space-y-8">
            <Button text="비밀번호를 잊으셨나요?" kind="transparent-white" />
            <div className="text-sm">
              <span className="text-[#728b9b]">계정이 없으신가요? </span>
              <span className="font-semibold text-[#1D9BF1]">
                <Link href="join">가입하기</Link>
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
