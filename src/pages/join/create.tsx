import Button from "@/components/button";
import Input from "@/components/input";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

interface CreateForm {
  email: string;
  password: string;
  nickname: string;
}

export default function Create() {
  const { register, watch, handleSubmit } = useForm<CreateForm>();

  console.log(watch());

  const onSubmit: SubmitHandler<CreateForm> = (data) => {
    console.log(data);
  };

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
