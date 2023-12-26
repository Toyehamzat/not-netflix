"use client";
import Billboard from "@/components/Billboard";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Billboard />
    </div>
  );
}
