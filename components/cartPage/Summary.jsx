import React from "react";
import { MdArrowForwardIos } from "react-icons/md";

function Summary({ price }) {
  return (
    <div className="lg:w-[30%] flex flex-col items-center top-5 sticky h-full">
      <div className="border w-4/5 p-5 rounded-lg">
        <p className="font-bold pb-5 ml-2">Łączna kwota: {price} zł</p>
        <div className="bg-teal-500 hover:bg-teal-600 transition-all text-lg cursor-pointer p-2 rounded-full flex justify-center items-center">
          Przejdź do dostawy <MdArrowForwardIos className="mt-1 ml-2" />
        </div>
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
