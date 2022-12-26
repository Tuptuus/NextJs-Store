import { collection, getDocs, limit, query } from "firebase/firestore";
import React, { use } from "react";
import Product from "../components/Product";
import { db } from "../firebase-config";

async function getHomeProducts() {
  let allProducts = [];
  const qAccessories = query(collection(db, "Accessories"), limit(3));
  const qGaming = query(collection(db, "Gaming"), limit(3));
  const qLaptops = query(collection(db, "Laptops"), limit(3));
  const qPcComponents = query(collection(db, "PCcomponents"), limit(3));
  const qPeripherals = query(collection(db, "Peryferia"), limit(3));
  const qSmartphones = query(collection(db, "Smartphones"), limit(3));
  const qTV = query(collection(db, "TVAudio"), limit(3));
  const getAccessories = await getDocs(qAccessories);
  const getGaming = await getDocs(qGaming);
  const getLaptops = await getDocs(qLaptops);
  const getPcComponents = await getDocs(qPcComponents);
  const getPeripherals = await getDocs(qPeripherals);
  const getSmartphones = await getDocs(qSmartphones);
  const getTVAudio = await getDocs(qTV);
  getAccessories.forEach((doc) => {
    allProducts.push({ ...doc.data(), id: doc.id });
  });
  getGaming.forEach((doc) => {
    allProducts.push({ ...doc.data(), id: doc.id });
  });
  getLaptops.forEach((doc) => {
    allProducts.push({ ...doc.data(), id: doc.id });
  });
  getPcComponents.forEach((doc) => {
    allProducts.push({ ...doc.data(), id: doc.id });
  });
  getPeripherals.forEach((doc) => {
    allProducts.push({ ...doc.data(), id: doc.id });
  });
  getSmartphones.forEach((doc) => {
    allProducts.push({ ...doc.data(), id: doc.id });
  });
  getTVAudio.forEach((doc) => {
    allProducts.push({ ...doc.data(), id: doc.id });
  });
  return allProducts;
}

function HomePage() {
  const homeProducts = use(getHomeProducts());
  return (
    <div className="w-full text-white">
      <div className="bg-zinc-900 pt-6 pb-6">
        <p className="text-3xl font-medium ml-12">Polecamy:</p>
      </div>
      <div className="bg-zinc-900 grid gap-y-14 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center pb-3">
        {homeProducts.map((item) => (
          <Product item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
