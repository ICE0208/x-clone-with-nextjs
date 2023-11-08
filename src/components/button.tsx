import { cls } from "@/lib/client/utils";

interface ButtonProps {
  text?: string;
  kind: "join" | "join-social" | "login";
  [key: string]: any;
}

export default function Button({ text = "", kind, ...rest }: ButtonProps) {
  const DEFAULT_CLASS =
    "flex h-[42px] w-full items-center justify-center rounded-3xl text-sm";

  return (
    <>
      {kind === "join-social" && (
        <div className={cls(DEFAULT_CLASS, "bg-white text-black")} {...rest}>
          <span>{text}</span>
        </div>
      )}
      {kind === "join" && (
        <div
          className={cls(DEFAULT_CLASS, "bg-[#1D9BF1] font-bold text-white")}
          {...rest}
        >
          <span>{text}</span>
        </div>
      )}
      {kind === "login" && (
        <div
          className={cls(
            DEFAULT_CLASS,
            "border-[1px] border-[#546571] bg-transparent text-base font-extrabold text-[#1D9BF1]",
          )}
          {...rest}
        >
          <span>{text}</span>
        </div>
      )}
    </>
  );
}
