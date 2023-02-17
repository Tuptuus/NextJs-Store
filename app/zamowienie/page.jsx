"use client";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase-config";

function Page() {
  const [cartProdsArr, setCartProdsArr] = useState([]);
  const cartID = useSelector((state) => state.cartProds.cartIDs);

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

  console.log(cartProdsArr);
  return (
    <div className="flex justify-center bg-red-500">
      <div className="bg-blue-500 w-[70%]">
        <p>Dostawa i płatność</p>
        <p>Dostawa</p>
        <div className="flex flex-col">
          <label className="flex">
            <input type="radio" name="delivery" className="form-radio" />
            <p className="pl-2">Kurier - UPS, FedEx</p>
          </label>
        </div>
      </div>
      <div className="bg-green-500">Tutaj coś tego</div>
    </div>
  );
}

export default Page;
