"use client";
import Navbar from "@/components/navbar";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data, status } = useSession();
  const router = useRouter();

  const logouthandler = async () => {
    await signOut();
  };
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    }
  }, [status, router]);

  return (
    <div className="flex flex-col">
      <Navbar />
      {/* <div className="text-white">WELCOME {data?.user?.name}</div>
      {status === "authenticated" && (
        <button
          className="text-black text-4xl bg-white"
          onClick={logouthandler}
        >
          LOGOUT
        </button>
      )} */}
    </div>
  );
}
