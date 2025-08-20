"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const handleClick = () => router.push("/");

  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        404 - Page introuvable
      </h1>
      <p className="text-gray-600 mb-6">
        Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
      </p>

      <button
        onClick={handleClick}
        className="px-4 py-1.5 sm:py-2 text-white bg-green-600 rounded-sm hover:bg-green-700 focus:outline-none cursor-pointer transition"
      >
        Aller à la page d'accueil
      </button>
    </div>
  );
}
