"use client";
import Image from "next/image";
import React from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart, FaCartPlus } from "react-icons/fa";
function Product({ item }) {
  const { Desc, Photo, Prize, Title, id, ...newItem } = item;

  let test = [];
  for (const key in newItem) {
    const value = newItem[key];
    test.push(` ${key}: ${value}`);
  }
  return (
    <>
      <div className="group bg-zinc-700 w-72 rounded-2xl shadow-white hover:shadow-teal-500 shadow-md flex flex-col transition-all">
        <div className="h-96">
          <div className="relative">
            <Image
              src={Photo}
              alt="pic of phone"
              width={500}
              height={500}
              className="rounded-t-2xl select-none"
            />
            <FiHeart className="text-3xl absolute text-black top-0 right-0 mr-1 mt-1 cursor-pointer opacity-0 group-hover:opacity-100 transition-all" />
          </div>
          <div className="text-sm flex flex-col">
            <p
              title={Title}
              className="text-xl pl-3 overflow-hidden font-bold hover:underline underline-offset-2 cursor-pointer"
            >
              {Title.length > 40 ? Title.slice(0, 40) + "..." : Title}
            </p>
            <div title={test} className="pl-3 text-sm">
              <p>
                {test[0].length > 40 ? test[0].slice(0, 40) + "..." : test[0]}
              </p>
              <p>
                {test[1].length > 40 ? test[1].slice(0, 40) + "..." : test[1]}
              </p>
              <p>
                {test[2].length > 40 ? test[2].slice(0, 40) + "..." : test[2]}
              </p>
              <p>
                {test[3].length > 40 ? test[3].slice(0, 40) + "..." : test[3]}
              </p>
            </div>
          </div>
        </div>
        <div className="flex pb-4 mt-auto pt-4 pl-3 items-center relative">
          <p className="text-xl font-bold">Cena: {Prize}</p>
          <FaCartPlus className="text-3xl absolute right-0 mr-5 cursor-pointer" />
        </div>
      </div>
    </>
  );
}

export default Product;
