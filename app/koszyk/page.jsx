"use client";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Product from "../../components/cartPage/Product";
import { db } from "../../firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { setSummaryPrice } from "../../features/cart/CartSlice";
import Summary from "../../components/cartPage/Summary";

function Page() {
  const [cartProdsArr, setCartProdsArr] = useState([]);
  const [summaryPrice, setSummaryPrice] = useState(1);
  const cartID = useSelector((state) => state.cartProds.cartIDs);
  const dispatch = useDispatch();

  useEffect(() => {
    let cartProdsTempArr = [];
    const cartProdsArrIDs = JSON.parse(localStorage.getItem("cartList"));
    if (cartProdsArrIDs.length > 0) {
      cartProdsArrIDs.forEach(async (item) => {
        const docRef = doc(db, "products", item.id);
        const docSnap = await getDoc(docRef);
        cartProdsTempArr.push({
          ...docSnap.data(),
          id: docSnap.id,
          qty: item.qty,
        });
        setCartProdsArr(cartProdsTempArr);
      });
    } else {
      setCartProdsArr([]);
    }
  }, [cartID]);

  useEffect(() => {
    let sumPrice = 0;
    cartProdsArr.forEach((prod) => {
      sumPrice += parseInt(prod.Price) * prod.qty;
    });
    setSummaryPrice(sumPrice);
  }, [cartProdsArr]);
  return (
    <>
      <div className="bg-zinc-900 pt-6 pb-6">
        <p className="text-3xl font-medium ml-12">Koszyk:</p>
      </div>
      {cartProdsArr.length > 0 ? (
        <div className="flex justify-center items-center mb-24">
          <div className="lg:flex justify-center 2xl:w-4/5">
            <div className="border lg:ml-10 xl:w-[70%] rounded-lg flex flex-col h-full justify-center">
              {cartProdsArr.map((item) => (
                <Product item={item} key={item.id} />
              ))}
            </div>
            <Summary price={summaryPrice} />
          </div>
        </div>
      ) : (
        <div className="bg-zinc-900 justify-items-center pb-3 mb-20">
          <p className="text-3xl text-center">
            Nie masz żadnych przedmiotów w koszyku. <br />
            Możesz to zrobić klikając koszyk w prawym dolnym rogu przedmiotu.
          </p>
        </div>
      )}
    </>
  );
}

export default Page;
