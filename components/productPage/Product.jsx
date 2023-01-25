"use client";
import Image from "next/image";
import React from "react";
import AddToCart from "./AddToCart";

function Product({ product }) {
  const { Photo, Category, Desc, Price, Quantity, Title, ...newItem } = product;
  let shortDesc = [];
  for (const key in newItem) {
    const value = newItem[key];
    shortDesc.push(` ${key}: ${value}`);
  }
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <div className="flex flex-col lg:flex-row items-center lg:items-start">
        <div className="lg:mr-10">
          <Image
            className="rounded-2xl h-[430px]"
            src={Photo}
            width={500}
            height={500}
            alt={Title}
          />
        </div>
        <div className="lg:w-[650px]">
          <div className="text-center text-2xl lg:text-4xl lg:text-left">
            {Title}
          </div>
          <div className="xl:flex-row mt-4 flex flex-col items-center">
            <div
              title={shortDesc}
              className="border-y-2 border-gray-400 w-full lg:w-3/4 xl:w-72"
            >
              <p className="text-lg py-3">
                {shortDesc[0].length > 40
                  ? shortDesc[0].slice(0, 40) + "..."
                  : shortDesc[0]}
              </p>
              <p className="text-lg py-3">
                {shortDesc[1].length > 40
                  ? shortDesc[1].slice(0, 40) + "..."
                  : shortDesc[1]}
              </p>
              <p className="text-lg py-3">
                {shortDesc[2].length > 40
                  ? shortDesc[2].slice(0, 40) + "..."
                  : shortDesc[2]}
              </p>
              <p className="text-lg py-3">
                {shortDesc[3].length > 40
                  ? shortDesc[3].slice(0, 40) + "..."
                  : shortDesc[3]}
              </p>
            </div>
            <div className="flex flex-col mt-4 xl:mt-0 items-center w-full lg:w-3/4 xl:w-80">
              <AddToCart item={product} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 px-5 text-justify text-2xl lg:w-full lg:px-20 xl:px-40 2xl:px-80 mb-20">
        {product.Desc}
      </div>
    </div>
  );
}

export default Product;
