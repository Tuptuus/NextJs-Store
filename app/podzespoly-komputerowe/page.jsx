import { collection, getDocs } from "firebase/firestore";
import React, { use } from "react";
import Product from "../../components/Product";
import { db } from "../../firebase-config";

async function getPcComponents() {
  let componentsArray = [];
  const querySnapshot = await getDocs(collection(db, "PCcomponents"));
  querySnapshot.forEach((doc) => {
    componentsArray.push({ ...doc.data(), id: doc.id });
  });
  return componentsArray;
}

function page() {
  const componentsData = use(getPcComponents());
  return (
    <>
      <div className="bg-zinc-900 pt-6 pb-6">
        <p className="text-3xl font-medium ml-12">Podzespoły komputerowe:</p>
      </div>
      <div className="bg-zinc-900 grid gap-y-14 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center pb-3">
        {componentsData.map((item) => (
          <Product item={item} key={item.id} />
        ))}
      </div>
    </>
  );
}

export default page;
