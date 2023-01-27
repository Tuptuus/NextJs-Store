import Link from "next/link";
import React from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setSummaryPrice } from "../../features/cart/CartSlice";
import { auth } from "../../firebase-config";

function Summary({ price }) {
  const dispatch = useDispatch();
  return (
    <div className="lg:w-[30%] flex flex-col items-center top-5 sticky h-full">
      <div className="border w-4/5 p-5 rounded-lg">
        <p className="font-bold pb-5 ml-2">Łączna kwota: {price} zł</p>
        {auth.currentUser == null ? (
          <Link href={"/logowanie-lub-rejestracja"}>
            <div
              onClick={() => {
                dispatch(setSummaryPrice(price));
              }}
              className="bg-teal-500 hover:bg-teal-600 transition-all text-lg cursor-pointer p-2 rounded-full flex justify-center items-center"
            >
              Przejdź do dostawy <MdArrowForwardIos className="mt-1 ml-2" />
            </div>
          </Link>
        ) : (
          <Link href={"/zamowienie"}>
            <div
              onClick={() => {
                dispatch(setSummaryPrice(price));
              }}
              className="bg-teal-500 hover:bg-teal-600 transition-all text-lg cursor-pointer p-2 rounded-full flex justify-center items-center"
            >
              Przejdź do dostawy <MdArrowForwardIos className="mt-1 ml-2" />
            </div>
          </Link>
        )}
      </div>
      <div className="flex w-4/5">
        <p className="text-white pt-2 text-center">
          Dokończ składanie zamówienia - dodanie produktów do koszyka nie
          oznacza ich rezerwacji.
        </p>
      </div>
    </div>
  );
}

export default Summary;
