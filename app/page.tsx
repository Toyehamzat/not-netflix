"use client";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/navbar";
import useMovies from "@/hooks/useMovies";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    }
  }, [status, router]);

  const { data: movies = [] } = useMovies();
  return (
    <div className="flex flex-col">
      <Navbar />
      <Billboard />
      <div className="pb-40 text-white">
        <MovieList title="Trending now" data={movies} />
      </div>
    </div>
  );
}
