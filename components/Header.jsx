import React from "react";
import {
  FaUserAlt,
  FaHeart,
  FaBalanceScale,
  FaShoppingCart,
} from "react-icons/fa";

function Header() {
  return (
    <>
      <div className="bg-zinc-900 text-white w-full h-20 flex">
        <div className="w-48 text-4xl font-bold italic text-center flex justify-center mt-5">
          <p className="cursor-pointer h-max">TupStore</p>
        </div>
        <div className=" w-full flex">
          <div className="bg-zinc-900 w-3/4 flex flex-row items-center justify-center">
            <input
              type="text"
              placeholder="Search..."
              className="text-white bg-zinc-700 outline-none rounded-l-xl px-3 w-3/4 h-12"
            />
            <div className="bg-zinc-700 h-12 items-center justify-center flex w-32 rounded-r-xl">
              <button className="bg-teal-500 h-10 w-24 rounded-xl">
                Search
              </button>
            </div>
          </div>
          <div className="bg-zinc-900 w-1/4 flex flex-row items-center">
            <span className="ml-[10%]">
              <FaBalanceScale className="text-4xl cursor-pointer" />
            </span>
            <span className="ml-[10%]">
              <FaHeart className="text-4xl cursor-pointer" />
            </span>
            <span className="ml-[10%]">
              <FaShoppingCart className="text-4xl cursor-pointer" />
            </span>
            <span className="ml-[10%]">
              <FaUserAlt className="text-4xl cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
      <div className="bg-zinc-900 text-center text-white">
        <ul className="flex text-center items-center justify-center">
          <li className="w-20 whitespace-pre-line ml-[7%] cursor-pointer h-max ">
            Laptopy i komputery
          </li>
          <li className="w-24 whitespace-pre-line ml-[6%] cursor-pointer h-max ">
            Smartfony i smartwatche
          </li>
          <li className="w-20 whitespace-pre-line ml-[7%] cursor-pointer h-max ">
            Gaming i streaming
          </li>
          <li className="w-24 whitespace-pre-line ml-[7%] cursor-pointer h-max ">
            Podzespoły komputerowe
          </li>
          <li className="w-20 whitespace-pre-line ml-[7%] cursor-pointer h-max ">
            Urządzenia peryferyjne
          </li>
          <li className="w-20 whitespace-pre-line ml-[7%] cursor-pointer h-max ">
            TV i audio
          </li>
          <li className="w-20 whitespace-pre-line ml-[7%] cursor-pointer h-max ">
            Akcesoria
          </li>
        </ul>
      </div>
    </>
  );
}

export default Header;
