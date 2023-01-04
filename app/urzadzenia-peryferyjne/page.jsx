import { collection, getDocs, query, where } from "firebase/firestore";
import React, { use } from "react";
import Product from "../../components/Product";
import { db } from "../../firebase-config";

async function getPeripherals() {
  let peripheralArray = [];
  const q = query(
    collection(db, "products"),
    where("Category", "==", "Peripherals")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    peripheralArray.push({ ...doc.data(), id: doc.id });
  });
  return peripheralArray;
}

function page() {
  const peripheralsData = use(getPeripherals());
  return (
    <>
      <div className="bg-zinc-900 pt-6 pb-6">
        <p className="text-3xl font-medium ml-12">Urządzenia peryferyjne:</p>
      </div>
      <div className="bg-zinc-900 grid gap-y-14 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center pb-3">
        {peripheralsData.map((item) => (
          <Product item={item} key={item.id} />
        ))}
      </div>
    </>
  );
}

export default page;
