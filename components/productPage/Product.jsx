"use client";
import Image from "next/image";
import React from "react";

function Product({ product }) {
  const { Photo, Category, Desc, Price, Quantity, Title, ...newItem } = product;
  let shortDesc = [];
  for (const key in newItem) {
    const value = newItem[key];
    shortDesc.push(` ${key}: ${value}`);
  }
  return (
    <div className="flex justify-center mt-20">
      <div className="mr-10">
        <Image
          className="rounded-2xl"
          src={Photo}
          width={500}
          height={500}
          alt={Title}
        />
      </div>
      <div>
        <div className="text-4xl">{Title}</div>
        <div title={shortDesc} className="text-sm">
          <p>
            {shortDesc[0].length > 40
              ? shortDesc[0].slice(0, 40) + "..."
              : shortDesc[0]}
          </p>
          <p>
            {shortDesc[1].length > 40
              ? shortDesc[1].slice(0, 40) + "..."
              : shortDesc[1]}
          </p>
          <p>
            {shortDesc[2].length > 40
              ? shortDesc[2].slice(0, 40) + "..."
              : shortDesc[2]}
          </p>
          <p>
            {shortDesc[3].length > 40
              ? shortDesc[3].slice(0, 40) + "..."
              : shortDesc[3]}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Product;
