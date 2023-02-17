"use client";
import { collection, getDocs } from "firebase/firestore";
import React, { use, useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { auth, db } from "../../../firebase-config";

function Page() {
  const [currentUser, setCurrentUser] = useState(null);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);
  console.log(currentUser);
  return <div>Tutaj będą zamówienia</div>;
}

export default Page;
