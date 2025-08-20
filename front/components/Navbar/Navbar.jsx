"use client";
import React, { useState } from "react";
import { LuMenu } from "react-icons/lu";
import { TfiReload } from "react-icons/tfi";
import { FaCaretDown } from "react-icons/fa";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
// import Search from "./Search";
import Sidebar from "../Sidebar/Sidebar";
// import { useAuthStore } from "@/app/store/auth/useAuthStore";

export default function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  // const user = useAuthStore((state) => state.user);
  const user = {firstname: "Nouha", lastname: "Ait Ouaoua"};

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-green-700 shadow-md text-white px-3 py-3 md:px-4 md:py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowSidebar(true)}
              className="block md:hidden text-xl sm:text-2xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-600 rounded-sm p-1.5"
              aria-label="Open sidebar"
            >
              <LuMenu className="-ml-0.5" />
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/"
                className="hover:text-gray-300 transition hidden md:block"
              >
                <span className="text-base sm:text-lg md:text-2xl font-semibold uppercase">
                  CV-ANALYZER
                </span>
              </Link>
            </div>
          </div>

          <div className="flex-1 max-w-xs md:max-w-md">{/* <Search /> */}</div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex border border-gray-300 rounded">
              <button className="p-2 hover:text-gray-300 border-r border-gray-300">
                <TfiReload />
              </button>
              <button className="p-2 hover:text-gray-300">
                <FaCaretDown />
              </button>
            </div>
            <button
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm rounded-full bg-gray-200 hover:bg-gray-300 transition duration-200 text-black font-medium cursor-pointer select-none"
              onClick={() => setShowUserDropdown(true)}
            >
              {user?.firstname.charAt(0).toUpperCase()}
              {user?.lastname.charAt(0).toUpperCase()}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {showSidebar && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setShowSidebar(false)}
            />
            <Sidebar isMobile onClose={() => setShowSidebar(false)} />
          </>
        )}
      </AnimatePresence>
    </>
  );
}
