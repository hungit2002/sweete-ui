"use client";
import Header from "@/app/layouts/header";
import isAuthenticated from "@/Utils/Auth";
import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";

export default function Market({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useLayoutEffect(() => {
    const isAuth = isAuthenticated();
    if (!isAuth) {
      redirect("/login");
    }
  }, []);
  return (
    <div className="bg-white h-[100vh]">
      <Header />
    </div>
  );
}
