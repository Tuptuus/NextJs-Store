"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Page({ children }) {
  const router = useRouter();
  useEffect(() => {
    router.push("konto/zamowienia");
    console.log("e");
  });
  return <>{children}</>;
}

export default Page;
