"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart, FaCartPlus } from "react-icons/fa";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../features/liked/LikedSlice";

function Product({ item }) {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const { Desc, Category, Photo, Price, Quantity, Title, id, ...newItem } =
    item;

  let shortDesc = [];
  for (const key in newItem) {
    const value = newItem[key];
    shortDesc.push(` ${key}: ${value}`);
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
            <FiHeart
              onClick={() => dispatch(increment())}
              className="text-3xl absolute text-black top-0 right-0 mr-1 mt-1 cursor-pointer opacity-0 group-hover:opacity-100 transition-all"
            />
          </div>
          <div className="text-sm flex flex-col">
            <p title={Title} className="text-xl pl-3 font-bold">
              <span className="hover:underline underline-offset-2 cursor-pointer">
                <Link href={`/product/${id}`}>
                  {Title.length > 40 ? Title.slice(0, 40) + "..." : Title}
                </Link>
              </span>
            </p>
            <div title={shortDesc} className="pl-3 text-sm">
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
        <div className="flex pb-4 mt-auto pt-4 pl-3 items-center relative">
          <p className="text-xl font-bold">Cena: {Price}</p>
          <FaCartPlus
            onClick={() => {
              console.log(id);
            }}
            className="text-3xl absolute right-0 mr-5 cursor-pointer transition-all hover:text-teal-400"
          />
        </div>
      </div>
    </>
  );
}

export default Product;
