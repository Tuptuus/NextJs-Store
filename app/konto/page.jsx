"use client";
import { signOut } from "firebase/auth";
import React from "react";
import { useSelector } from "react-redux";
import { auth } from "../../firebase-config";
import { useRouter } from "next/navigation";

function Page() {
  const user = useSelector((state) => state.user.user);
  const router = useRouter();

  const logout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <div>
      twoje konto {user ? user.displayName : null} <br />
      <span onClick={logout} className="cursor-pointer">
        Wyloguj się
      </span>
    </div>
  );
}

export default Page;
