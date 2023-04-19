import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

function Summarise({ cart }) {
  const [sumPrice, setSumPrice] = useState(0);

  useEffect(() => {
    let temp = 0;
    cart.forEach((item) => {
      temp += parseInt(item.Price) * item.qty;
    });
    setSumPrice(temp);
  }, [cart]);

  const dispatch = useDispatch();
  return (
    <div className="lg:w-[30%] flex flex-col items-center top-5 sticky h-full">
      <div className="border w-4/5 rounded-lg">
        <div className="w-full  max-h-72 overflow-auto">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex border-b h-24 justify-center items-center w-full"
            >
              <div className="pl-3">
                <Image
                  height={100}
                  width={100}
                  src={item.Photo}
                  alt={item.Title}
                />
              </div>
              <div className="w-full pl-5">
                <div>
                  <p>{item.Title}</p>
                </div>
                <div className="flex">
                  <div className="w-1/2">
                    <p>{item.qty} szt.</p>
                  </div>
                  <div className="w-1/2">
                    <p className="flex justify-end pr-5">{item.Price} szt.</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>dostawa</div>
        <div>
          <p>Wartość koszyka: {sumPrice}zł</p>
          <p>Dostawa: 20zł</p>
          <p>Do zapłaty: {sumPrice + 20}zł</p>
        </div>
        <Link href={"/zamowienie"}>
          <div className="bg-teal-500 hover:bg-teal-600 transition-all text-lg cursor-pointer p-2 rounded-full flex justify-center items-center">
            Przejdź do podsumowania <MdArrowForwardIos className="mt-1 ml-2" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Summarise;
