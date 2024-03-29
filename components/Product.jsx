"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart, FaCartPlus } from "react-icons/fa";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { addToLiked, removeFromLiked } from "../features/liked/LikedSlice";
import { addToCart } from "../features/cart/CartSlice";

function Product({ item }) {
  const likedID = useSelector((state) => state.likedProds.likedIDs);
  const dispatch = useDispatch();
  const [listOfLikedIDs, setListOfLikedIDs] = useState([]);
  const {
    Desc,
    Category,
    Photo,
    Price,
    Quantity,
    Title,
    id,
    priceID,
    ...newItem
  } = item;

  let shortDesc = [];
  for (const key in newItem) {
    const value = newItem[key];
    shortDesc.push(` ${key}: ${value}`);
  }
  useEffect(() => {
    const likedList = JSON.parse(localStorage.getItem("shopList"));
    if (likedList === null) {
      setListOfLikedIDs([]);
    } else {
      setListOfLikedIDs(likedList);
    }
  }, [likedID]);

  return (
    <>
      <div className="group bg-zinc-700 w-72 h-[450px] rounded-2xl shadow-white hover:shadow-teal-500 shadow-md flex flex-col transition-all last:mb-20">
        <div className="h-96">
          <div className="relative">
            <Image
              src={Photo}
              alt="pic of phone"
              width={500}
              height={500}
              className="rounded-t-2xl select-none"
              loading="lazy"
            />
            {listOfLikedIDs.includes(id) === false ? (
              <FiHeart
                onClick={() => dispatch(addToLiked(id))}
                className="text-3xl absolute text-black top-0 right-0 mr-1 mt-1 cursor-pointer opacity-0 group-hover:opacity-100 transition-all hover:text-teal-600"
              />
            ) : (
              <FaHeart
                onClick={() => dispatch(removeFromLiked(id))}
                className="text-3xl absolute text-black top-0 right-0 mr-1 mt-1 cursor-pointer opacity-0 group-hover:opacity-100 transition-all"
              />
            )}
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
          {item.Quantity > 0 ? (
            <FaCartPlus
              onClick={() => dispatch(addToCart({ id: id, qty: 1 }))}
              className="text-3xl absolute right-0 mr-5 cursor-pointer transition-all hover:text-teal-400"
            />
          ) : (
            <FaCartPlus className="text-3xl absolute right-0 mr-5 cursor-not-allowed transition-all" />
          )}
        </div>
      </div>
    </>
  );
}

export default Product;
