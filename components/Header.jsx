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
import { AiOutlineClose } from "react-icons/ai";
import { FaGamepad } from "react-icons/fa";
import { FiSmartphone } from "react-icons/fi";
import { BsCpu, BsLaptop, BsPrinter, BsTv } from "react-icons/bs";
import { CiUsb } from "react-icons/ci";

function Header() {
  const likedID = useSelector((state) => state.likedProds.likedIDs);
  const cartID = useSelector((state) => state.cartProds.cartIDs);
  const [likedProds, setLikedProds] = useState("");
  const [cartProds, setCartProds] = useState("");
  const [showMenu, setShowMenu] = useState(false);

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

  const showMenuHandle = () => {
    if (showMenu == false) {
      setShowMenu(true);
      document.body.style.overflow = "hidden";
    } else if (showMenu == true) {
      setShowMenu(false);
      document.body.style.overflow = "auto";
    }
  };

  return (
    <>
      <div
        className={`bg-zinc-900 absolute h-full w-96 z-50 -left-full ease-in-out duration-500 ${
          showMenu ? "left-0" : null
        }`}
      >
        <div className="flex items-center bg-zinc-800 h-16 text-2xl pl-3 border-b border-zinc-500">
          <AiOutlineClose
            onClick={showMenuHandle}
            className="cursor-pointer text-white rounded-full hover:bg-zinc-500 transition-all mt-1 text-3xl p-1"
          />
          <span className="pl-4">Menu</span>
        </div>
        <div className="pl-5">
          <p className="text-lg pt-3">Kategorie</p>
          <ul className="mt-2">
            <li className="flex items-center pt-5 text-lg">
              <BsLaptop />
              <Link
                onClick={showMenuHandle}
                className="pl-2 hover:underline underline-offset-4 decoration-teal-500 transition-all"
                href={"/laptopy-i-komputery"}
              >
                Laptopy i komputery
              </Link>
            </li>
            <li className="flex items-center pt-5 text-lg ">
              <FiSmartphone />
              <Link
                onClick={showMenuHandle}
                className="pl-2 hover:underline underline-offset-4 decoration-teal-500 transition-all"
                href={"/smartfony-i-smartwatche"}
              >
                Smartfony i smartwatche
              </Link>
            </li>
            <li className="flex items-center pt-5 text-lg ">
              <FaGamepad />
              <Link
                onClick={showMenuHandle}
                className="pl-2 hover:underline underline-offset-4 decoration-teal-500 transition-all"
                href={"/gaming-i-streaming"}
              >
                Gaming i streaming
              </Link>
            </li>
            <li className="flex items-center pt-5 text-lg ">
              <BsCpu />
              <Link
                onClick={showMenuHandle}
                className="pl-2 hover:underline underline-offset-4 decoration-teal-500 transition-all"
                href={"/podzespoly-komputerowe"}
              >
                Podzespoły komputerowe
              </Link>
            </li>
            <li className="flex items-center pt-5 text-lg ">
              <BsPrinter />
              <Link
                onClick={showMenuHandle}
                className="pl-2 hover:underline underline-offset-4 decoration-teal-500 transition-all"
                href={"/urzadzenia-peryferyjne"}
              >
                Urządzenia peryferyjne
              </Link>
            </li>
            <li className="flex items-center pt-5 text-lg ">
              <BsTv />
              <Link
                onClick={showMenuHandle}
                className="pl-2 hover:underline underline-offset-4 decoration-teal-500 transition-all"
                href={"/TV-i-audio"}
              >
                TV i audio
              </Link>
            </li>
            <li className="flex items-center pt-5 text-lg ">
              <CiUsb />
              <Link
                onClick={showMenuHandle}
                className="pl-2 hover:underline underline-offset-4 decoration-teal-500 transition-all"
                href={"/akcesoria"}
              >
                Akcesoria
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {showMenu ? (
        <div
          onClick={showMenuHandle}
          className="bg-black opacity-70 w-full h-full absolute z-40"
        ></div>
      ) : null}
      <div className="bg-zinc-900 text-white w-full h-20 flex">
        <div className="w-48 text-4xl font-bold italic text-center flex justify-center pl-2 mt-5">
          <Link href={"/"} className="cursor-pointer h-max">
            <span>Tup</span>
            <span className="text-teal-500">S</span>
            <span>tore</span>
          </Link>
        </div>
        <div className=" w-full flex">
          <div className=" w-3/4 lg:flex flex-row items-center justify-center hidden">
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
          <div className="bg-zinc-900 lg:w-1/4 w-full flex-row items-center flex justify-end mr-8">
            <span className="lg:ml-[8%] 2xl:ml-[10%] ml-5">
              <FaBalanceScale className="text-4xl cursor-pointer" />
            </span>
            <span className="lg:ml-[8%] 2xl:ml-[10%] ml-5 relative">
              <Link href={"/polubione"}>
                <FaHeart className="text-4xl cursor-pointer" />
                {likedProds > 0 ? (
                  <div className="w-6 h-6 rounded-full bg-red-500 text-lg text-center -top-2 -right-3 absolute flex justify-center items-center">
                    {likedProds > 9 ? "9" : likedProds}
                  </div>
                ) : null}
              </Link>
            </span>
            <span className="lg:ml-[8%] 2xl:ml-[10%] ml-5 relative">
              <Link href={"/koszyk"}>
                <FaShoppingCart className="text-4xl cursor-pointer" />
                {cartProds > 0 ? (
                  <div className="w-6 h-6 rounded-full bg-red-500 text-lg text-center -top-2 -right-3 absolute flex justify-center items-center">
                    {cartProds > 9 ? "9" : cartProds}
                  </div>
                ) : null}
              </Link>
            </span>
            <span className="lg:ml-[8%] 2xl:ml-[10%] ml-5 ">
              <Link href={"/login"}>
                <FaUserAlt className="text-4xl cursor-pointer" />
              </Link>
            </span>
          </div>
        </div>
      </div>
      <div className="bg-zinc-900 text-center text-white">
        <div className="flex items-center mt-5">
          <div
            onClick={showMenuHandle}
            className="h-max lg:hidden ml-4 cursor-pointer w-14"
          >
            <p className="w-14 bg-white h-1 mt-2 rounded-sm"></p>
            <p className="w-14 bg-white h-1 mt-2 rounded-sm"></p>
            <p className="w-14 bg-white h-1 mt-2 rounded-sm"></p>
          </div>
          <div className=" w-full flex flex-row items-center justify-center ml-3 lg:hidden">
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
        </div>
        <ul className="text-center items-center justify-center hidden lg:flex">
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
