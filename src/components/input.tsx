import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  placeholder?: string;
  register?: UseFormRegisterReturn;
}

export default function Input({ placeholder = "", register }: InputProps) {
  return (
    <input
      {...register}
      className="h-[50px] w-full border-[0.7px] border-[#546571] bg-transparent p-3 text-white focus:outline-none "
      placeholder={placeholder}
    ></input>
  );
}
