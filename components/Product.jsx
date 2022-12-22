"use client";
import Image from "next/image";
import React from "react";
import phone from "../images/phone.png";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
function Product() {
  return (
    <>
      <div className="bg-zinc-700 w-72 h-96 rounded-2xl shadow-white hover:shadow-teal-500 shadow-md transition-shadow">
        <div className="relative">
          <Image
            src={phone}
            alt="pic of phone"
            placeholder="blur"
            className="rounded-t-2xl h-60 select-none"
          />
          <FiHeart className="text-3xl absolute text-black top-0 right-0 mr-3 mt-3 cursor-pointer" />
        </div>
        <div className="pl-3 text-sm">
          <span className="text-xl font-bold hover:underline underline-offset-2 cursor-pointer">
            Samsdwadwadwaung Galaxy coś tam
          </span>
          <div className="flex">
            <div className=" w-36">
              <p>RAM: 4GB</p>
              <p>Memory: 4GB</p>
              <p>processor: 4GB</p>
              <p>Screen size: 4GB</p>
            </div>
            <div className="flex w-36 items-end">
              <p className="text-xl font-bold">Prize: 2000zł</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
