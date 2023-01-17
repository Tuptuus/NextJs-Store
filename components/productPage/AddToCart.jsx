"use client";
import React, { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/CartSlice";
import { BsCheckCircle, BsXCircle, BsTruck } from "react-icons/bs";

function AddToCart({ item }) {
  console.log(item);
  const dispatch = useDispatch();
  const [showList, setShowList] = useState(false);
  const [itemQty, setItemQty] = useState(1);
  const [inputValue, setInputValue] = useState(9);

  const handleQtyList = () => {
    setShowList(!showList);
  };

  const handleInput = (e) => {
    let tempvalue = e.target.value;
    let sliceValue = tempvalue.slice(0, 3);
    setInputValue(sliceValue);
  };

  const leaveInput = () => {
    setItemQty(parseInt(inputValue));
  };

  return (
    <div className="w-full flex flex-col items-center rounded-xl border-2 border-gray-400 xl:ml-20">
      <div className="w-full text-right text-3xl py-3 pr-5">{item.Price}</div>
      <div className="flex w-full border-b-2 border-gray-400 justify-center items-center pb-4">
        <div className="w-12 h-8 rounded-xl items-center justify-center flex mr-5">
          {itemQty < 9 ? (
            <>
              <button
                onClick={handleQtyList}
                onBlur={() => {
                  setTimeout(() => {
                    setShowList(false);
                  }, 200);
                }}
                className="w-full h-full flex justify-center items-center relative border rounded-3xl"
              >
                <span className="">{itemQty}</span>
                <span>
                  <TiArrowSortedDown className="text-2xl" />
                </span>
              </button>
              <ul
                className={`absolute mt-80 z-50 ${
                  showList ? "block" : "hidden"
                }`}
              >
                <li
                  onClick={() => setItemQty(1)}
                  className="bg-gray-600 w-12 text-center py-1 cursor-pointer hover:bg-gray-500"
                >
                  1
                </li>
                <li
                  onClick={() => {
                    setItemQty(2);
                  }}
                  className="bg-gray-600 w-12 text-center py-1 cursor-pointer hover:bg-gray-500"
                >
                  2
                </li>
                <li
                  onClick={() => {
                    setItemQty(3);
                  }}
                  className="bg-gray-600 w-12 text-center py-1 cursor-pointer hover:bg-gray-500"
                >
                  3
                </li>
                <li
                  onClick={() => {
                    setItemQty(4);
                  }}
                  className="bg-gray-600 w-12 text-center py-1 cursor-pointer hover:bg-gray-500"
                >
                  4
                </li>
                <li
                  onClick={() => {
                    setItemQty(5);
                  }}
                  className="bg-gray-600 w-12 text-center py-1 cursor-pointer hover:bg-gray-500"
                >
                  5
                </li>
                <li
                  onClick={() => {
                    setItemQty(6);
                  }}
                  className="bg-gray-600 w-12 text-center py-1 cursor-pointer hover:bg-gray-500"
                >
                  6
                </li>
                <li
                  onClick={() => {
                    setItemQty(7);
                  }}
                  className="bg-gray-600 w-12 text-center py-1 cursor-pointer hover:bg-gray-500"
                >
                  7
                </li>
                <li
                  onClick={() => {
                    setItemQty(8);
                  }}
                  className="bg-gray-600 w-12 text-center py-1 cursor-pointer hover:bg-gray-500"
                >
                  8
                </li>
                <li
                  onClick={() => {
                    setItemQty(9);
                  }}
                  className="bg-gray-600 w-12 text-center py-1 cursor-pointer hover:bg-gray-500"
                >
                  9+
                </li>
              </ul>
            </>
          ) : (
            <input
              className="w-full h-full bg-transparent outline-none text-center border rounded-3xl"
              type="number"
              max="999"
              min="1"
              value={inputValue}
              onChange={(e) => handleInput(e)}
              onKeyDown={(e) => handleInput(e)}
              onBlur={leaveInput}
            />
          )}
        </div>
        {item.Quantity > 0 ? (
          <div className="flex cursor-pointer bg-teal-500 rounded-full w-48 h-10 justify-center items-center transition-all hover:bg-teal-600">
            <FaCartPlus className="text-2xl mr-2" />
            <span
              onClick={() => dispatch(addToCart({ id: item.id, qty: itemQty }))}
              className="text-lg"
            >
              Dodaj do koszyka
            </span>
          </div>
        ) : (
          <div className="flex cursor-not-allowed bg-teal-500 rounded-full w-48 h-10 justify-center items-center">
            <FaCartPlus className="text-2xl mr-2" />
            <span className="text-lg">Dodaj do koszyka</span>
          </div>
        )}
      </div>
      <div className="w-full">
        {item.Quantity > 0 ? (
          <div className="flex justify-center items-center text-xl py-2 border-b-2 border-gray-400 w-full">
            <BsCheckCircle className="mr-2" />
            <span>Produkt dostępny</span>
          </div>
        ) : (
          <div className="flex justify-center items-center text-xl py-2 border-b-2 border-gray-400 w-full">
            <BsXCircle className="mr-2" />
            <span>Produkt niedostępny</span>
          </div>
        )}
        {parseInt(item.Price) > 1000 ? (
          <div className="flex justify-center items-center text-xl py-2">
            <BsTruck className="mr-2" />
            <span>Darmowa dostawa</span>
          </div>
        ) : (
          <div className="flex justify-center items-center text-xl py-2">
            <BsTruck className="mr-2" />
            <span>Koszty dostawy</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddToCart;
