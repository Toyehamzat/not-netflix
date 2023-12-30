// useMovie.ts
import moviesData from "@/data/movies.json";

const useMovie = (movieId: string) => {
  const movie = moviesData.find((m) => m.movieId === movieId);
  return { data: movie, error: null, isLoading: false };
};

export default useMovie;
