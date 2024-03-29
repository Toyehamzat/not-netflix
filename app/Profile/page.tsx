"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    }
  }, [status, router]);
  return (
    <div className="flex items-center h-full justify-center ">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who is watching?{" "}
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div
            onClick={() => {
              router.push("/");
            }}
          >
            <div className="group flex-row w-44 mx-auto">
              <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent hover:scale-105 transition group-hover:cursor-pointer group-hover:border-white overflow-hidden ">
                <img src="/images/default-blue.png" alt="profile" />
              </div>
              <div className=" mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                {data?.user?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
