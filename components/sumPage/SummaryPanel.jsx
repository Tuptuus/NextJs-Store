import React, { useEffect, useState } from "react";
import { FaTruck, FaBox } from "react-icons/fa";
import { MdArrowForwardIos } from "react-icons/md";
import { useSelector } from "react-redux";

function SummaryPanel() {
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const delivery = useSelector((state) => state.order.delivery);
  const sumPrice = useSelector((state) => state.order.summaryPrice);
  const deliDay = useSelector((state) => state.order.deliveryDay);
  useEffect(() => {
    if (delivery === "kurier") {
      setDeliveryPrice(20);
    }
  }, [delivery]);

  return (
    <div className="lg:w-[30%] flex flex-col items-center top-5 sticky h-full">
      <div className="border w-4/5 rounded-lg">
        <div className="w-full  max-h-72 overflow-auto">
          <div className="flex items-center py-2">
            <div>
              <FaTruck className="text-3xl mx-5" />
            </div>
            <div>
              <p>Sposób dostawy:</p>
              <p>
                {delivery == "kurier"
                  ? "Kurier – InPost, UPS, FedEx, DTS, PickPack"
                  : "coś innego"}
              </p>
            </div>
          </div>
          <div className="flex items-center py-2">
            <div>
              <FaBox className="text-3xl mx-5" />
            </div>
            <div>
              <p>Zamówienie dostaniesz:</p>
              <p>{deliDay}</p>
            </div>
          </div>
        </div>
        <div className="pl-3">
          <div className="flex items-center pt-3">
            <p className="w-1/2">Wartość koszyka: </p>
            <p className="w-1/2 flex justify-end pr-5">
              {sumPrice - deliveryPrice}zł
            </p>
          </div>
          <div className="flex items-center pt-3">
            <p className="w-1/2">Dostawa: </p>
            <p className="w-1/2 flex justify-end pr-5">{deliveryPrice}zł</p>
          </div>
          <div className="flex items-center pt-3">
            <p className="w-1/2">Do zapłaty: </p>
            <p className="w-1/2 flex justify-end pr-5">{sumPrice}zł</p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="bg-teal-500 hover:bg-teal-600 transition-all text-lg cursor-pointer p-2 rounded-full flex justify-center items-center my-5 w-4/5">
            Kupuję i płacę <MdArrowForwardIos className="mt-1 ml-2" />
          </div>
        </div>
      </div>
      {/* <p className={`text-red-500 pt-3 ${showError ? "block" : "hidden"}`}>
        UZUPEŁNIJ WSZYSTKIE DANE
      </p> */}
    </div>
  );
}

export default SummaryPanel;
