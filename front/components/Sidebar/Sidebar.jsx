"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { sidebarItems } from "../../data";

export default function Sidebar({ isMobile = false, onClose }) {
  const pathname = usePathname();

  const handleClose = () => {
    if (onClose) onClose();
  };

  const SidebarContent = (
    <>
      {isMobile && (
        <div className="flex justify-between items-center px-3 py-2 border-b border-gray-300">
          <Link href="/">
            <span className="text-base sm:text-lg font-semibold text-green-800 uppercase">
              Siège MUSDEEL
            </span>
          </Link>
          <button
            onClick={handleClose}
            aria-label="Fermer la sidebar"
            className="text-xl text-gray-600 hover:text-black p-2 rounded-md hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer"
          >
            <IoClose />
          </button>
        </div>
      )}

      <nav className="text-sm text-gray-800">
        <ul className={`flex flex-col py-4 ${!isMobile && "pb-20"}`}>
          {sidebarItems.map((item, index) =>
            item.break ? (
              <li
                key={index}
                className="px-4 py-2 text-xs uppercase tracking-wider text-gray-500 font-bold"
              >
                {item.name}
              </li>
            ) : (
              <li
                key={index}
                className={`px-4 cursor-pointer text-gray-800 hover:bg-gray-600 hover:text-white ${
                  pathname === item.path ? "bg-gray-300" : ""
                }`}
              >
                <Link
                  href={item.path}
                  onClick={handleClose}
                  className="py-3 flex items-center gap-2"
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            )
          )}
        </ul>
      </nav>
    </>
  );

  if (isMobile) {
    return (
      <motion.aside
        className="fixed top-0 left-0 w-72 sm:w-80 h-full bg-white z-50 overflow-y-auto border-r border-gray-300 md:hidden"
        role="dialog"
        tabIndex={-1}
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {SidebarContent}
      </motion.aside>
    );
  }

  return (
    <aside className="hidden md:block fixed top-[68px] w-64 h-full bg-white overflow-y-auto border-r border-gray-300 z-40">
      {SidebarContent}
    </aside>
  );
}
