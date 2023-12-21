"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
export default function Home() {
  const router = useRouter();

  // const { data } = useSession();
  return (
    <main>
      {/* <div className="">{JSON.stringify(data)}</div> */}
      <button className="text-white">WELCOME</button>
    </main>
  );
}
