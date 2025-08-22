"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../../components/shared/Footer";
import { authRoutes } from "../../data/index";
import { usePathname } from "next/navigation";
import '../../app/globals.css';

export default function Layout({ children }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {authRoutes.includes(pathname) ? (
        <div>
          <main className="bg-gray-100 rounded-md p-3 md:p-6 h-screen w-full">
            {children}
          </main>
        </div>
      ) : (
        <>
          <Navbar />
          <div className="flex flex-1 pt-[65px]">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-gray-100 p-3 md:p-4 w-full md:ml-64">
              {children}
            </main>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}