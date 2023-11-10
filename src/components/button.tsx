import { cls } from "@/lib/client/utils";
import { MouseEvent } from "react";

interface ButtonProps {
  text?: string;
  kind: "blue-white" | "white-black" | "transparent-blue" | "transparent-white";
  onClick?: (event: MouseEvent) => void;
  [key: string]: any;
}

export default function Button({
  text = "",
  kind,
  onClick,
  ...rest
}: ButtonProps) {
  const DEFAULT_CLASS =
    "flex h-[38px] w-full items-center justify-center rounded-3xl text-sm cursor-pointer";

  return (
    <>
      {kind === "white-black" && (
        <button
          type="submit"
          onClick={onClick}
          className={cls(DEFAULT_CLASS, "bg-white font-semibold text-black")}
          {...rest}
        >
          {text}
        </button>
      )}
      {kind === "blue-white" && (
        <button
          type="submit"
          onClick={onClick}
          className={cls(DEFAULT_CLASS, "bg-[#1D9BF1] font-bold text-white")}
          {...rest}
        >
          {text}
        </button>
      )}
      {kind === "transparent-blue" && (
        <button
          type="submit"
          onClick={onClick}
          className={cls(
            DEFAULT_CLASS,
            "border-[1px] border-[#546571] bg-transparent text-base font-extrabold text-[#1D9BF1]",
          )}
          {...rest}
        >
          {text}
        </button>
      )}
      {kind === "transparent-white" && (
        <button
          type="submit"
          onClick={onClick}
          className={cls(
            DEFAULT_CLASS,
            "border-[1px] border-[#546571] bg-transparent text-base font-extrabold text-[white]",
          )}
          {...rest}
        >
          {text}
        </button>
      )}
    </>
  );
}
