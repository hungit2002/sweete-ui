"use client";
import isAuthenticated from "@/Utils/Auth";
import { redirect } from "next/navigation";
import React, { useLayoutEffect } from "react";

export default function Index() {
  useLayoutEffect(() => {
    const isAuth = isAuthenticated();
    if (!isAuth) {
      redirect("/login");
    } else {
      redirect("/home");
    }
  }, []);
  return <div></div>;
}
