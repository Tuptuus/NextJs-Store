"use client";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { auth } from "../../firebase-config";

function Layout({ children }) {
  const user = useSelector((state) => state.user.user);
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  const logoutUser = () => {
    signOut(auth);
    router.push("/");
  };

  return (
    <div className="flex flex-col justify-center lg:flex-row my-20">
      <div className="w-full lg:w-72">
        <p className="text-lg pl-5">
          Cześć,{" "}
          <span className="font-bold">
            {currentUser ? currentUser.displayName : null}
          </span>
        </p>
        <Link href={"konto/zamowienia"}>
          <div
            className={`text-lg cursor-pointer py-3 pl-5 hover:bg-zinc-800 transition-all decoration-teal-500 ${
              path == "/konto/zamowienia"
                ? "font-bold underline underline-offset-4"
                : null
            }`}
          >
            Zamówienia
          </div>
        </Link>
        <Link href={"konto/ustawienia-konta"}>
          <div
            className={`text-lg cursor-pointer py-3 pl-5 hover:bg-zinc-800 transition-all decoration-teal-500 ${
              path == "/konto/ustawienia-konta"
                ? "font-bold underline underline-offset-4"
                : null
            }`}
          >
            Ustawienia konta
          </div>
        </Link>
        <div
          onClick={logoutUser}
          className={`text-lg cursor-pointer py-3 pl-5 hover:bg-zinc-800 transition-all `}
        >
          Wyloguj się
        </div>
      </div>
      <div className="lg:w-1/2 w-full border-t-2 mt-5 pt-5 lg:pt-0 lg:mt-0 lg:border-l-2 lg:border-t-0 pl-10 ">
        {children}
      </div>
    </div>
  );
}

export default Layout;
