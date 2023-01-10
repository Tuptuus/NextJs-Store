"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { setNewState } from "../../features/cart/CartSlice";

function Product({ item }) {
  const [listShowed, setListShowed] = useState("");
  const [inputValue, setInputValue] = useState(item.qty);
  const [itemQty, setItemQty] = useState(item.qty);
  const cartList = JSON.parse(localStorage.getItem("cartList"));
  const cartIDs = useSelector((state) => state.cartProds.cartIDs);
  const dispatch = useDispatch();

  const handleQtyList = (id) => {
    if (listShowed == "") {
      setListShowed(id);
    } else {
      setListShowed("");
    }
  };

  // useEffect(() => {
  //   console.log(cartList);
  // }, [cartList]);

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
    cartList.forEach((item) => {
      if (item.id == id) {
        item.qty = parseInt(inputValue);
      }
    });
    localStorage.setItem("cartList", JSON.stringify(cartList));
    dispatch(setNewState(cartList));
  };

  const setQtyOnList = (id, qty) => {
    cartList.forEach((item) => {
      if (item.id == id) {
        item.qty = qty;
      }
    });
    localStorage.setItem("cartList", JSON.stringify(cartList));
    dispatch(setNewState(cartList));
    setItemQty(qty);
    setInputValue(qty);
    setListShowed("");
  };
  return (
    <div className="bg-blue-500 w-3/5 mt-3 py-5 pl-3 flex">
      <div className="bg-yellow-500 w-1/5">
        <Image src={item.Photo} width={100} height={100} alt={item.Title} />
      </div>
      <div className="bg-red-500 w-1/2 flex items-center">{item.Title}</div>
      <div className="bg-green-500 w-[30%] flex items-center">
        <div className="bg-yellow-500 w-1/3 flex justify-center">
          <p>{item.Price}</p>
        </div>
        <div className="bg-red-700 w-1/3 flex items-center justify-center">
          <div className="bg-blue-500 w-12 h-8 rounded-xl items-center justify-center flex">
            {itemQty < 9 ? (
              <>
                <button
                  onClick={() => handleQtyList(item.id)}
                  onBlur={() => {
                    setTimeout(() => {
                      setListShowed("");
                    }, 200);
                  }}
                  className="w-full h-full flex justify-center items-center relative"
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
                className="w-full bg-transparent outline-none text-center"
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
        <div className="bg-yellow-300 w-1/3 flex justify-center">d</div>
      </div>
    </div>
  );
}

export default Product;
