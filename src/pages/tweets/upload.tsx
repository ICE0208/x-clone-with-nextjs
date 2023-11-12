import Button from "@/components/button";
import useMutation from "@/lib/client/useMutation";
import useUser from "@/lib/client/useUser";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TweetResponseType } from "../api/tweets";

interface PostForm {
  text: string;
}

export default function Upload() {
  const [post, { loading: postLoading, status, data }] =
    useMutation<TweetResponseType>("/api/tweets");
  const { register, handleSubmit } = useForm<PostForm>();

  const onSubmit: SubmitHandler<PostForm> = (data) => {
    if (postLoading) return;
    post({
      text: data.text.trim(),
    });
  };
  const router = useRouter();
  useEffect(() => {
    if (data && data.ok) {
      router.replace("/tweets");
    }
  }, [router, data]);

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <>
        <header className="flex h-12 items-center justify-center">
          <div className="text-[40px] font-bold">𝕏</div>
          <button className="absolute left-3 top-3 text-[18px]">
            <Link href="/tweets">✕</Link>
          </button>
        </header>
        <main className="flex flex-grow items-center justify-center">
          <div className="flex w-[300px] flex-col">
            <h3 className="text-[26px] font-bold">글쓰기</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-2 space-y-4">
              <textarea
                {...register("text", { required: true, maxLength: 300 })}
                maxLength={300}
                className="scrollbar-hide test-white box-border w-full resize-none rounded-2xl border border-white bg-black p-4 focus:outline-none"
                rows={10}
              ></textarea>
              <Button text="게시" kind="white-black" />
            </form>
            <div className="mt-4 space-y-8">
              <Button
                onClick={() => {
                  router.push("/tweets");
                }}
                text="취소"
                kind="transparent-white"
              />
            </div>
          </div>
        </main>
      </>
    </div>
  );
}
