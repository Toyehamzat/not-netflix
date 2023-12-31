// FavoriteButton Component
import React, { useCallback, useMemo } from "react";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import useFavorites from "@/hooks/useFavorites";
import useCurrentUser from "@/hooks/useCurrentUser";
import axios from "axios";

type Props = {
  movieId?: string;
};

const FavoriteButton = ({ movieId }: Props) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    console.log("Toggling favorites for movieId:", movieId);
    try {
      let response;

      if (isFavorite) {
        response = await axios.delete("/api/DeleteFavorite", {
          data: { movieId },
        });
      } else {
        response = await axios.post("/api/PostFavorite", { movieId });
      }

      const updatedFavoriteIds = response?.data?.favoriteIds;

      mutate({
        ...currentUser,
        favoriteIds: updatedFavoriteIds,
      });
      mutateFavorites();
    } catch (error) {
      console.error("Error toggling favorites:", error);
    }
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
    </div>
  );
};

export default FavoriteButton;
