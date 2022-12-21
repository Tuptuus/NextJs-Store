import React from "react";
import Product from "../components/Product";

function HomePage() {
  return (
    <div className="w-full text-white">
      <div className="bg-zinc-900 pt-6 pb-6">
        <p className="text-3xl font-medium ml-12">We Recommend:</p>
      </div>
      <div className="bg-zinc-900 grid gap-y-14 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center pb-5">
        <Product />
      </div>
    </div>
  );
}

export default HomePage;
