import { collection, getDocs, limit, query } from "firebase/firestore";
import React, { use } from "react";
import Product from "../components/Product";
import { db } from "../firebase-config";

async function getHomeProducts() {
  let allProducts = [];
  const products = await getDocs(collection(db, "products"));
  products.forEach((doc) => {
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
        {homeProducts.map((product) => (
          <Product item={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
