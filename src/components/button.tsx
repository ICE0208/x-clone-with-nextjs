import { cls } from "@/lib/client/utils";

interface ButtonProps {
  text?: string;
  kind: "blue-white" | "white-black" | "transparent-blue" | "transparent-white";
  [key: string]: any;
}

export default function Button({ text = "", kind, ...rest }: ButtonProps) {
  const DEFAULT_CLASS =
    "flex h-[38px] w-full items-center justify-center rounded-3xl text-sm";

  return (
    <>
      {kind === "white-black" && (
        <div
          className={cls(DEFAULT_CLASS, "bg-white font-semibold text-black")}
          {...rest}
        >
          <span>{text}</span>
        </div>
      )}
      {kind === "blue-white" && (
        <div
          className={cls(DEFAULT_CLASS, "bg-[#1D9BF1] font-bold text-white")}
          {...rest}
        >
          <span>{text}</span>
        </div>
      )}
      {kind === "transparent-blue" && (
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
      {kind === "transparent-white" && (
        <div
          className={cls(
            DEFAULT_CLASS,
            "border-[1px] border-[#546571] bg-transparent text-base font-extrabold text-[white]",
          )}
          {...rest}
        >
          <span>{text}</span>
        </div>
      )}
    </>
  );
}
