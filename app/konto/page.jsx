"use client";
import { signOut } from "firebase/auth";
import React from "react";
import { useSelector } from "react-redux";
import { auth } from "../../firebase-config";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";

function Page() {
  const user = useSelector((state) => state.user.user);
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  const logout = () => {
    router.push("/");
    signOut(auth);
  };

  return (
    <div>
      <span
        onClick={() => {
          console.log(currentUser);
        }}
      >
        twoje konto {currentUser ? currentUser.displayName : null}
      </span>{" "}
      <br />
      <span onClick={logout} className="cursor-pointer">
        Wyloguj się
      </span>
    </div>
  );
}

export default Page;
