"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/app/store/auth/useAuthStore";
import AuthServices from "@/app/services/AuthServices";
import Spinner from "../shared/Spinner";

export default function AuthProvider({ children }) {
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const authServices = new AuthServices();
        const user = await authServices.me();
        setUser(user);
      } catch {
        setUser(null);
        if (!pathname.startsWith("/auth")) {
          router.replace("/auth/login");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [setUser, pathname, router]);

  if (loading) {
    return <Spinner />;
  }

  return <>{children}</>;
}
