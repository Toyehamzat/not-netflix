import React, { useCallback, useMemo } from "react";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";
import useFavorites from "@/hooks/useFavorites";
import { useSession } from "next-auth/react";
type Props = {
  movieId: string;
};

const FavoriteButton = ({ movieId }: Props) => {
  return (
    <div className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
      <AiOutlinePlus className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
    </div>
  );
};

export default FavoriteButton;
