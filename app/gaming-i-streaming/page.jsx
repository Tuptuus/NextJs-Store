import { collection, getDocs, query, where } from "firebase/firestore";
import React, { use } from "react";
import Product from "../../components/Product";
import { db } from "../../firebase-config";

async function getGaming() {
  let gamingArray = [];
  const q = query(
    collection(db, "products"),
    where("Category", "==", "Gaming")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    gamingArray.push({ ...doc.data(), id: doc.id });
  });
  return gamingArray;
}

function page() {
  const gamingData = use(getGaming());
  return (
    <>
      <div className="bg-zinc-900 pt-6 pb-6">
        <p className="text-3xl font-medium ml-12">Gaming:</p>
      </div>
      <div className="bg-zinc-900 grid gap-y-14 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center pb-3">
        {gamingData.map((item) => (
          <Product item={item} key={item.id} />
        ))}
      </div>
    </>
  );
}

export default page;
