"use client";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Product from "../../components/cartPage/Product";
import { db } from "../../firebase-config";
import { useSelector } from "react-redux";

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
        cartProdsTempArr.push({ ...docSnap.data(), id: docSnap.id });
        setCartProdsArr(cartProdsTempArr);
      });
    } else {
      setCartProdsArr([]);
    }
  }, [cartID]);

  return (
    <>
      <div className="bg-zinc-900 pt-6 pb-6">
        <p className="text-3xl font-medium ml-12">Koszyk:</p>
      </div>
      {cartProdsArr.length > 0 ? (
        <div className="bg-red-900 ">
          {cartProdsArr.map((item) => (
            <Product item={item} key={item.id} />
          ))}
        </div>
      ) : (
        <div className="bg-zinc-900 justify-items-center pb-3">
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
