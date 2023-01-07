"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  FaUserAlt,
  FaHeart,
  FaBalanceScale,
  FaShoppingCart,
} from "react-icons/fa";
import { useSelector } from "react-redux";

function Header() {
  const likedID = useSelector((state) => state.likedProds.likedIDs);
  const cartID = useSelector((state) => state.cartProds.cartIDs);
  const [likedProds, setLikedProds] = useState("");
  const [cartProds, setCartProds] = useState("");

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("shopList")) == null) {
      setLikedProds("");
    } else {
      setLikedProds(JSON.parse(localStorage.getItem("shopList")).length);
    }
  }, [likedID]);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("cartList")) == null) {
      setCartProds("");
    } else {
      setCartProds(JSON.parse(localStorage.getItem("cartList")).length);
    }
  }, [cartID]);

  return (
    <>
      <div className="bg-zinc-900 text-white w-full h-20 flex">
        <div className="w-48 text-4xl font-bold italic text-center flex justify-center pl-2 mt-5">
          <Link href={"/"} className="cursor-pointer h-max">
            <span>Tup</span>
            <span className="text-teal-500">S</span>
            <span>tore</span>
          </Link>
        </div>
        <div className=" w-full flex">
          <div className=" w-3/4 flex flex-row items-center justify-center">
            <input
              type="text"
              placeholder="Search..."
              className="text-white bg-zinc-700 outline-none rounded-l-xl px-3 w-3/4 h-12"
            />
            <div className="bg-zinc-700 h-12 items-center justify-center flex w-32 rounded-r-xl">
              <button className="bg-teal-500 hover:bg-teal-600 transition-all h-10 w-24 rounded-xl">
                Search
              </button>
            </div>
          </div>
          <div className="w-1/4 flex justify-end pr-5 lg:hidden">
            <div className="h-max ml-4 mt-5 cursor-pointer w-14">
              <p className="w-14 bg-white h-1 mt-2 rounded-sm"></p>
              <p className="w-14 bg-white h-1 mt-2 rounded-sm"></p>
              <p className="w-14 bg-white h-1 mt-2 rounded-sm"></p>
            </div>
          </div>
          <div className="bg-zinc-900 w-1/4 flex-row items-center hidden lg:flex">
            <span className="lg:ml-[8%] 2xl:ml-[10%] ">
              <FaBalanceScale className="text-4xl cursor-pointer" />
            </span>
            <span className="lg:ml-[8%] 2xl:ml-[10%] relative">
              <Link href={"/polubione"}>
                <FaHeart className="text-4xl cursor-pointer" />
                {likedProds > 0 ? (
                  <div className="w-6 h-6 rounded-full bg-red-500 text-lg text-center -top-2 -right-3 absolute flex justify-center items-center">
                    {likedProds > 9 ? "9" : likedProds}
                  </div>
                ) : null}
              </Link>
            </span>
            <span className="lg:ml-[8%] 2xl:ml-[10%] relative">
              <Link href={"/koszyk"}>
                <FaShoppingCart className="text-4xl cursor-pointer" />
                {cartProds > 0 ? (
                  <div className="w-6 h-6 rounded-full bg-red-500 text-lg text-center -top-2 -right-3 absolute flex justify-center items-center">
                    {cartProds > 9 ? "9" : cartProds}
                  </div>
                ) : null}
              </Link>
            </span>
            <span className="lg:ml-[8%] 2xl:ml-[10%] ">
              <FaUserAlt className="text-4xl cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
      <div className="bg-zinc-900 text-center text-white">
        <div className="h-max sm:hidden ml-4 mt-5 cursor-pointer w-14">
          <p className="w-14 bg-white h-1 mt-2 rounded-sm"></p>
          <p className="w-14 bg-white h-1 mt-2 rounded-sm"></p>
          <p className="w-14 bg-white h-1 mt-2 rounded-sm"></p>
        </div>
        <ul className="text-center items-center justify-center hidden sm:flex">
          <li className="w-20 whitespace-pre-line sm:ml-[2.5%] lg:ml-[6%] xl:ml-[8%] cursor-pointer h-max hover:underline underline-offset-4 decoration-teal-500">
            <Link href={"/laptopy-i-komputery"}>Laptopy i komputery</Link>
          </li>
          <li className="w-24 whitespace-pre-line sm:ml-[2.5%] lg:ml-[6%] xl:ml-[8%] cursor-pointer h-max hover:underline underline-offset-4 decoration-teal-500">
            <Link href={"/smartfony-i-smartwatche"}>
              Smartfony i smartwatche
            </Link>
          </li>
          <li className="w-20 whitespace-pre-line sm:ml-[2.5%] lg:ml-[6%] xl:ml-[8%] cursor-pointer h-max hover:underline underline-offset-4 decoration-teal-500">
            <Link href={"/gaming-i-streaming"}>Gaming i streaming</Link>
          </li>
          <li className="w-24 whitespace-pre-line sm:ml-[2.5%] lg:ml-[6%] xl:ml-[8%] cursor-pointer h-max hover:underline underline-offset-4 decoration-teal-500">
            <Link href={"/podzespoly-komputerowe"}>Podzespoły komputerowe</Link>
          </li>
          <li className="w-20 whitespace-pre-line sm:ml-[2.5%] lg:ml-[6%] xl:ml-[8%] cursor-pointer h-max hover:underline underline-offset-4 decoration-teal-500">
            <Link href={"/urzadzenia-peryferyjne"}>Urządzenia peryferyjne</Link>
          </li>
          <li className="w-20 whitespace-pre-line sm:ml-[2.5%] lg:ml-[6%] xl:ml-[8%] cursor-pointer h-max hover:underline underline-offset-4 decoration-teal-500">
            <Link href={"/TV-i-audio"}>TV i audio</Link>
          </li>
          <li className="w-20 whitespace-pre-line sm:ml-[2.5%] lg:ml-[6%] xl:ml-[8%] cursor-pointer h-max hover:underline underline-offset-4 decoration-teal-500">
            <Link href={"/akcesoria"}>Akcesoria</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Header;
