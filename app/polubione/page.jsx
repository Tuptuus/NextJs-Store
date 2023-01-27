"use client";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Product from "../../components/Product";
import { db } from "../../firebase-config";
import { useSelector } from "react-redux";

function Page() {
  const [likedProdsArr, setLikedProdsArr] = useState([]);
  const likedID = useSelector((state) => state.likedProds.likedIDs);

  useEffect(() => {
    let likedProdsTempArr = [];
    const likedProdsArrIDs = JSON.parse(localStorage.getItem("shopList"));
    if (likedProdsArrIDs.length > 0) {
      likedProdsArrIDs.forEach(async (id) => {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        likedProdsTempArr.push({ ...docSnap.data(), id: docSnap.id });
        setLikedProdsArr(likedProdsTempArr);
      });
    } else {
      setLikedProdsArr([]);
    }
  }, [likedID]);

  return (
    <>
      <div className="bg-zinc-900 pt-6 pb-6">
        <p className="text-3xl font-medium ml-12">Polubione:</p>
      </div>
      {likedProdsArr.length > 0 ? (
        <div className="bg-zinc-900 grid gap-y-14 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center pb-3">
          {likedProdsArr.map((item) => (
            <Product item={item} key={item.id} />
          ))}
        </div>
      ) : (
        <div className="bg-zinc-900 justify-items-center pb-3 mb-20">
          <p className="text-3xl text-center">
            Nie masz żadnych polubionych przedmiotów. <br />
            Możesz to zrobić klikając serce w prawym górnym rogu przedmiotu.
          </p>
        </div>
      )}
    </>
  );
}

export default Page;
