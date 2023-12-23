import React from "react";

type Props = {
  visible?: boolean;
};

export default function MobileMenu({ visible }: Props) {
  if (!visible) {
    return null;
  }
  return (
    <div className="bg-black w-56 absolute top-8 left-0 py-6 flex flex-col border-2 border-gray-800">
      <div className="flex flex-col gap-4">
        <div className="px-3 text-center text-white hover:underline">Home</div>
        <div className="px-3 text-center text-white hover:underline">
          TV shows
        </div>
        <div className="px-3 text-center text-white hover:underline">
          Movies
        </div>
        <div className="px-3 text-center text-white hover:underline">
          New & Popular
        </div>
        <div className="px-3 text-center text-white hover:underline">
          My List
        </div>
        <div className="px-3 text-center text-white hover:underline">
          Browse by languages
        </div>
      </div>
    </div>
  );
}
