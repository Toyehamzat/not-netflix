import React from "react";
import { MovieInterface } from "@/types";
import MovieCard from "./MovieCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {
  data: MovieInterface[];
  title: string;
};

const MovieList = ({ title, data }: Props) => {
  const { status } = useSession();

  // If the user is not authenticated, you can choose to return null or display a loading indicator.
  if (status === "loading" || status === "unauthenticated") {
    return null;
  }

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold">
          {title}
        </p>
        <div className="grid grid-cols-4 mt-4 gap-2">
          {data.map((movie: any) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
