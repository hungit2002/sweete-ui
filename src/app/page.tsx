"use client"
import isAuthenticated from "@/Utils/Auth";
import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";

export default function Home() {
  useLayoutEffect(() => {
    const isAuth = isAuthenticated();
    if(!isAuth){
      redirect("/login")
    }
  }, [])
  return (
    <div>Home page</div>
  );
}
