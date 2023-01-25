"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Layout({ children }) {
  const user = useSelector((state) => state.user.user);
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  return (
    <div className="flex justify-center mb-20">
      <div className="w-72">
        <p className="text-lg mt-10 pl-5">
          Cześć,{" "}
          <span className="font-bold">
            {currentUser ? currentUser.displayName : null}
          </span>
        </p>
        <Link href={"konto/zamowienia"}>
          <div
            className={`text-lg cursor-pointer py-3 pl-5 hover:bg-zinc-800 transition-all ${
              path == "/konto/zamowienia" ? "font-bold" : null
            }`}
          >
            Zamówienia
          </div>
        </Link>
        <Link href={"konto/dane-do-zamowien"}>
          <div
            className={`text-lg cursor-pointer py-3 pl-5 hover:bg-zinc-800 transition-all ${
              path == "/konto/dane-do-zamowien" ? "font-bold" : null
            }`}
          >
            Dane do zamówień
          </div>
        </Link>
        <Link href={"konto/ustawienia-konta"}>
          <div
            className={`text-lg cursor-pointer py-3 pl-5 hover:bg-zinc-800 transition-all ${
              path == "/konto/ustawienia-konta" ? "font-bold" : null
            }`}
          >
            Ustawienia konta
          </div>
        </Link>
      </div>
      <div className="bg-yellow-500 w-[900px]">{children}</div>
    </div>
  );
}

export default Layout;
