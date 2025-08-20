"use client";
import React from "react";
import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { TbMenuDeep } from "react-icons/tb";
import { formatName } from "../../utils";

export default function Breadcrumb({ items, action }) {
  return (
    <div className="flex items-center mt-0 justify-between bg-white p-3 sm:p-4 shadow-md mb-3">
      <nav className="flex items-center space-x-2 text-sm text-gray-600">
        <Link
          href="/"
          className="flex items-center text-sm text-gray-700 font-medium hover:underline hover:text-gray-950"
        >
          <IoHomeOutline className="mr-0 sm:mr-1 text-black" />
          <span className="hidden sm:flex">Accueil</span>
        </Link>

        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-1 sm:space-x-2">
            <IoIosArrowForward className="text-xs text-gray-400" />
            {item.active ? (
              <span className="text-gray-600">{formatName(item.name)}</span>
            ) : (
              <Link
                href={item.path}
                className="text-gray-700 font-medium hover:text-gray-900 hover:underline"
              >
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        {action ? (
          <Link
            href={action.path}
            className="flex items-center justify-center gap-1 rounded-sm bg-green-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-800 duration-200"
          >
            {action.icon}
            <span>{action.name}</span>
          </Link>
        ) : (
          <button className="text-gray-600 hover:text-gray-800 transition cursor-pointer text-lg">
            <TbMenuDeep />
          </button>
        )}
      </div>
    </div>
  );
}
