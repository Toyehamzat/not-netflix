import React from "react";

type Props = {
  id: string;
  onChange: any;
  value: any;
  label: string;
  type?: string;
};

export default function Input({ id, onChange, value, label, type }: Props) {
  return (
    <div className="relative">
      <input
        value={value}
        type={type}
        onChange={onChange}
        id={id}
        className="rounded-md block px-6 py-6 pb-1 w-full bg-neutral-800 text-white appearance-none focus:outline-none focus:ring-0 peer invalid:border-b-1 "
        placeholder=" "
        autoComplete="true"
      />
      <label
        className=" absolute 
        text-md
      text-zinc-400
        duration-150 
        transform 
        -translate-y-3 
        scale-75 
        top-4 
        z-10 
        origin-[0] 
        left-6
        peer-placeholder-shown:scale-100 
        peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75
        peer-focus:-translate-y-3"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
}
