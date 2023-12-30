import React from "react";

type Props = {
  visible?: boolean;
};

export default function MobileMenu({ visible }: Props) {
  if (!visible) {
    return null;
  }
  return (
    <div className="bg-black w-[25vw] md:w-56  absolute top-7 left-0 py-3 md:py-6 flex flex-col border-2 border-gray-800">
      <div className="flex flex-col gap-4">
        <div className="px-3 text-center text-sm md:text-md text-white hover:underline">
          Home
        </div>
        <div className="px-3 text-center text-sm md:text-md text-white hover:underline">
          TV shows
        </div>
        <div className="px-3 text-center text-sm md:text-md text-white hover:underline">
          Movies
        </div>
        <div className="px-3 text-center text-sm md:text-md text-white hover:underline">
          New & Popular
        </div>
        <div className="px-3 text-center text-sm md:text-md text-white hover:underline">
          My List
        </div>
      </div>
    </div>
  );
}
