import React from "react";
import { signOut, useSession } from "next-auth/react";
import { RiLogoutBoxFill } from "react-icons/ri";
import Image from "next/image";
type Props = {
  visible?: boolean;
};

export default function AccountMenu({ visible }: Props) {
  const { data } = useSession();
  if (!visible) return null;
  return (
    <div className="bg-black w-52 absolute top-11 right-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <img
            className="w-8 rounded-md"
            src="/images/default-blue.png"
            alt=""
          />
          <p className="text-white text-sm group-hover/item:underline">
            {data?.user?.name}
          </p>
        </div>
      </div>
      <hr className="bg-gray-600 border-0 h-px my-4" />
      <div
        onClick={() => signOut()}
        className="px-3 text-center flex flex-row items-center text-white text-sm hover:underline"
      >
        <div className=" w-8 rounded-md text-white">
          <RiLogoutBoxFill />
        </div>
        <p> Sign out of Netflix</p>
      </div>
    </div>
  );
}
