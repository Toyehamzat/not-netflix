"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data, status } = useSession();
  const router = useRouter();

  const logouthandler = async () => {
    await signOut();
  };

  // const login = () => {
  //   router.push("/api/auth/signin");
  // };

  // Redirect to /auth when there is no session
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    }
  }, [status, router]);

  return (
    <div>
      <div className="text-white">WELCOME {JSON.stringify(data)}</div>
      {status === "authenticated" && (
        <button className="text-white" onClick={logouthandler}>
          LOGOUT
        </button>
      )}
      {/* {status === "unauthenticated" && (
        <button className="text-white" onClick={login}>
          LOGIN
        </button>
      )} */}
    </div>
  );
}
