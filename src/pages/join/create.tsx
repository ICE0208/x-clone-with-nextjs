import Button from "@/components/button";
import Input from "@/components/input";
import useMutation from "@/lib/client/useMutation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface CreateForm {
  email: string;
  password: string;
  nickname: string;
}

interface EnterMutationResult {
  ok: boolean;
  msg?: string;
}

export default function Create() {
  const { register, handleSubmit } = useForm<CreateForm>();
  const [
    enter,
    { loading: enterLoading, data: enterData, status: enterStatus },
  ] = useMutation<EnterMutationResult>("/api/users/enter");

  const onSubmit: SubmitHandler<CreateForm> = (data) => {
    if (enterLoading) return;
    enter(data);
  };

  const router = useRouter();
  useEffect(() => {
    if (enterStatus === 200 && enterData) {
      if (enterData.ok) {
        router.replace("/login");
      } else {
        alert(enterData.msg);
      }
    }
  }, [enterData, router, enterStatus]);

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <title>X | Join-Create</title>
      <header className="flex h-12 items-center justify-center">
        <div className="text-[40px] font-bold">𝕏</div>
        <button className="absolute left-5 top-5 text-3xl">
          <Link href="/">✕</Link>
        </button>
      </header>
      <main className="flex flex-grow items-center justify-center">
        <div className="fle flex w-[300px] flex-col xl:w-[360px]">
          <h3 className="text-[26px] font-bold">X 가입하기</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <Input
              register={register("email", { required: true })}
              placeholder="이메일 주소"
              type="email"
            />
            <Input
              register={register("password", { required: true })}
              placeholder="비밀번호"
              type="password"
            />
            <Input
              register={register("nickname", { required: true })}
              placeholder="닉네임"
            />
            <Button text="가입하기" kind="white-black" />
          </form>
        </div>
      </main>
    </div>
  );
}
