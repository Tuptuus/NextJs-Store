import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setSummaryPrice } from "../../features/order/OrderSlice";

function Summarise({ cart }) {
  const [showError, setShowError] = useState(false);
  const [sumPrice, setSumPrice] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const orderingPerson = useSelector((state) => state.order.name);
  const address = useSelector((state) => state.order.address);
  const zipCode = useSelector((state) => state.order.zipcode);
  const city = useSelector((state) => state.order.city);
  const phone = useSelector((state) => state.order.phone);
  const email = useSelector((state) => state.order.email);
  const delivery = useSelector((state) => state.order.delivery);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    let temp = 0;
    cart.forEach((item) => {
      temp += parseInt(item.Price) * item.qty;
    });
    setSumPrice(temp);
  }, [cart]);

  useEffect(() => {
    if (delivery === "kurier") {
      setDeliveryPrice(20);
    }
  }, []);

  const goToSummaryPage = () => {
    dispatch(setSummaryPrice(sumPrice + deliveryPrice));
    if (
      orderingPerson !== "" &&
      address !== "" &&
      zipCode !== "" &&
      city !== "" &&
      phone !== "" &&
      email !== ""
    ) {
      router.push("zamowienie/podsumowanie");
    } else {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

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
                    <p className="flex justify-end pr-5">{item.Price}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <div>dostawa</div> */}
        <div className="pl-3">
          <div className="flex items-center pt-3">
            <p className="w-1/2">Wartość koszyka: </p>
            <p className="w-1/2 flex justify-end pr-5">{sumPrice}zł</p>
          </div>
          <div className="flex items-center pt-3">
            <p className="w-1/2">Dostawa: </p>
            <p className="w-1/2 flex justify-end pr-5">20zł</p>
          </div>
          <div className="flex items-center pt-3">
            <p className="w-1/2">Do zapłaty: </p>
            <p className="w-1/2 flex justify-end pr-5">
              {sumPrice + deliveryPrice}zł
            </p>
          </div>
        </div>
        <div onClick={goToSummaryPage} className="flex justify-center">
          <div className="bg-teal-500 hover:bg-teal-600 transition-all text-lg cursor-pointer p-2 rounded-full flex justify-center items-center my-5 w-4/5">
            Przejdź do podsumowania <MdArrowForwardIos className="mt-1 ml-2" />
          </div>
        </div>
      </div>
      <p className={`text-red-500 pt-3 ${showError ? "block" : "hidden"}`}>
        UZUPEŁNIJ WSZYSTKIE DANE
      </p>
    </div>
  );
}

export default Summarise;
