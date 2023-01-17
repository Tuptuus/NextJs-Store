"use client";
import Image from "next/image";
import React, { useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { removeFromCart, changeItemQty } from "../../features/cart/CartSlice";
import { FaTrashAlt } from "react-icons/fa";
import Link from "next/link";

function Product({ item }) {
  const [listShowed, setListShowed] = useState("");
  const [inputValue, setInputValue] = useState(item.qty);
  const [itemQty, setItemQty] = useState(item.qty);
  const cartList = JSON.parse(localStorage.getItem("cartList"));
  const dispatch = useDispatch();

  const handleQtyList = (id) => {
    if (listShowed == "") {
      setListShowed(id);
    } else {
      setListShowed("");
    }
  };

  const handleInput = (e) => {
    let tempvalue = e.target.value;
    let sliceValue = tempvalue.slice(0, 3);
    setInputValue(sliceValue);
  };

  const leaveInputHandle = (id) => {
    if (inputValue == "") {
      setInputValue(item.qty);
      setItemQty(item.qty);
    } else {
      setItemQty(inputValue);
    }
    dispatch(changeItemQty({ id: id, qty: inputValue }));
  };

  const setQtyOnList = (id, qty) => {
    dispatch(changeItemQty({ id: id, qty: qty }));
    setItemQty(qty);
    setInputValue(qty);
    setListShowed("");
  };

  return (
    <div className="mt-3 py-5 pl-3 flex border-b last:border-b-0">
      <div className="w-[15%]">
        <Image src={item.Photo} width={100} height={100} alt={item.Title} />
      </div>
      <div className="w-1/2 flex items-center">
        <Link
          className="hover:underline text-xl font-bold underline-offset-2"
          href={`/product/${item.id}`}
        >
          {item.Title}
        </Link>
      </div>
      <div className="w-2/5 flex items-center">
        <div className="flex justify-center px-4 w-1/3">
          <p>{item.Price}</p>
        </div>
        <div className="flex items-center justify-center w-1/3">
          <div className="w-12 h-8 rounded-xl items-center justify-center flex">
            {itemQty < 9 ? (
              <>
                <button
                  onClick={() => handleQtyList(item.id)}
                  onBlur={() => {
                    setTimeout(() => {
                      setListShowed("");
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
                    item.id == listShowed ? "block" : "hidden"
                  }`}
                >
                  <li
                    onClick={() => {
                      setQtyOnList(item.id, 1);
                    }}
                    className="bg-gray-600 w-12 text-center py-1 cursor-pointer hover:bg-gray-500"
                  >
                    1
                  </li>
                  <li
                    onClick={() => {
                      setQtyOnList(item.id, 2);
                    }}
                    className="bg-gray-600 w-12 text-center py-1 cursor-pointer hover:bg-gray-500"
                  >
                    2
                  </li>
                  <li
                    onClick={() => {
                      setQtyOnList(item.id, 3);
                    }}
                    className="bg-gray-600 w-12 text-center py-1 cursor-pointer hover:bg-gray-500"
                  >
                    3
                  </li>
                  <li
                    onClick={() => {
                      setQtyOnList(item.id, 4);
                    }}
                    className="bg-gray-600 w-12 text-center py-1 cursor-pointer hover:bg-gray-500"
                  >
                    4
                  </li>
                  <li
                    onClick={() => {
                      setQtyOnList(item.id, 5);
                    }}
                    className="bg-gray-600 w-12 text-center py-1 cursor-pointer hover:bg-gray-500"
                  >
                    5
                  </li>
                  <li
                    onClick={() => {
                      setQtyOnList(item.id, 6);
                    }}
                    className="bg-gray-600 w-12 text-center py-1 cursor-pointer hover:bg-gray-500"
                  >
                    6
                  </li>
                  <li
                    onClick={() => {
                      setQtyOnList(item.id, 7);
                    }}
                    className="bg-gray-600 w-12 text-center py-1 cursor-pointer hover:bg-gray-500"
                  >
                    7
                  </li>
                  <li
                    onClick={() => {
                      setQtyOnList(item.id, 8);
                    }}
                    className="bg-gray-600 w-12 text-center py-1 cursor-pointer hover:bg-gray-500"
                  >
                    8
                  </li>
                  <li
                    onClick={() => {
                      setQtyOnList(item.id, 9);
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
                onBlur={() => leaveInputHandle(item.id)}
              />
            )}
          </div>
        </div>
        <div className="flex justify-center w-1/3">
          <FaTrashAlt
            onClick={() => {
              dispatch(removeFromCart(item.id));
            }}
            className="text-2xl cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default Product;
