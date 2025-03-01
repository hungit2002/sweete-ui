"use client";
import isAuthenticated from "@/Utils/Auth";
import { redirect } from "next/navigation";
import React, { useLayoutEffect } from "react";
import Home from "@/app/(sites)/(home)/Home";

export default function Index() {
  useLayoutEffect(() => {
    const isAuth = isAuthenticated();
    if (!isAuth) {
      redirect("/login");
    }
  }, []);
  return <Home/>;
}
