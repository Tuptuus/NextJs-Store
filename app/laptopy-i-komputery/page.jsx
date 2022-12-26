"use client";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { use } from "react";
import Product from "../../components/Product";
import { db } from "../../firebase-config";

async function getLaptops() {
  let laptopsArray = [];
  const querySnapshot = await getDocs(collection(db, "Laptops"));
  querySnapshot.forEach((doc) => {
    laptopsArray.push({ ...doc.data(), id: doc.id });
  });
  return laptopsArray;
}
function page() {
  const laptopsData = use(getLaptops());
  return (
    <>
      <div className="bg-zinc-900 pt-6 pb-6">
        <p className="text-3xl font-medium ml-12">Laptopy:</p>
      </div>
      <div className="bg-zinc-900 grid gap-y-14 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center pb-3">
        {laptopsData.map((item) => (
          <Product item={item} key={item.id} />
        ))}
      </div>
    </>
  );
}

export default page;
