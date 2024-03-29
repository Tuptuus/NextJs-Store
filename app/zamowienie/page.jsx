"use client";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../../firebase-config";
import Summarise from "../../components/orderPage/Summarise";
import { FaTruck, FaBox, FaChessKing } from "react-icons/fa";
import {
  setAddress,
  setBuyingAs,
  setCity,
  setDelivery,
  setEmail,
  setName,
  setPayment,
  setPhone,
  setZipCode,
  setDeliveryDate,
} from "../../features/order/OrderSlice";

function Page() {
  const delivery = useSelector((state) => state.order.delivery);
  const payment = useSelector((state) => state.order.payment);
  const buyingAs = useSelector((state) => state.order.buyingAs);
  const [cartProdsArr, setCartProdsArr] = useState([]);
  const [deliveryOption, setDeliveryOption] = useState(delivery);
  const [deliveryDay, setDeliveryDay] = useState("");
  const [buyingAsPerson, setBuyingAsPerson] = useState(buyingAs);
  const [paymentOption, setPaymentOption] = useState(payment);
  const [checkbox, setCheckbox] = useState(false);

  // const [inputNameValue, setInputNameValue] = useState("");
  // const [inputAddressValue, setInputAddressValue] = useState("");
  // const [inputZipCodeValue, setInputZipCodeValue] = useState("");
  // const [inputCityValue, setInputCityValue] = useState("");
  // const [inputPhoneValue, setInputPhoneValue] = useState("");
  // const [inputEmailValue, setInputEmailValue] = useState("");

  const orderingPerson = useSelector((state) => state.order.name);
  const address = useSelector((state) => state.order.address);
  const zipCode = useSelector((state) => state.order.zipcode);
  const city = useSelector((state) => state.order.city);
  const phone = useSelector((state) => state.order.phone);
  const email = useSelector((state) => state.order.email);
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
    dispatch(setDelivery(deliveryOption));
    dispatch(setPayment(paymentOption));
    dispatch(setBuyingAs(buyingAsPerson));
  }, [deliveryOption, dispatch, paymentOption, buyingAsPerson]);

  const handleDeliveryChoose = (e) => {
    setDeliveryOption(e.target.value);
  };

  const handleBuyingOption = (e) => {
    setBuyingAsPerson(e.target.value);
  };

  const handleCheckbox = () => {
    setCheckbox(!checkbox);
  };

  const handlePaymentOption = (e) => {
    setPaymentOption(e.target.value);
  };

  const handleInputsValue = (e, type) => {
    if (type === "name") {
      // setInputNameValue(e.target.value);
      dispatch(setName(e.target.value));
    } else if (type === "address") {
      // setInputAddressValue(e.target.value);
      dispatch(setAddress(e.target.value));
    } else if (type === "zipcode") {
      // setInputZipCodeValue(e.target.value);
      dispatch(setZipCode(e.target.value));
    } else if (type === "city") {
      // setInputCityValue(e.target.value);
      dispatch(setCity(e.target.value));
    } else if (type === "phone") {
      let tempvalue = e.target.value;
      let slicevalue = tempvalue.slice(0, 9);
      // setInputPhoneValue(slicevalue);
      dispatch(setPhone(slicevalue));
    } else if (type === "email") {
      // setInputEmailValue(e.target.value);
      dispatch(setEmail(e.target.value));
    }
  };

  useEffect(() => {
    let today = new Date();
    let deliDate = new Date();
    deliDate.setDate(today.getDate() + 2);
    let deliDay = deliDate.toLocaleDateString("pl-PL", { weekday: "long" });
    if (deliDay == "sobota") {
      deliDate.setDate(deliDate.getDate() + 2);
    } else if (deliDay == "niedziela") {
      deliDate.setDate(deliDate.getDate() + 1);
    }
    setDeliveryDay(
      deliDate.toLocaleDateString("pl-PL", {
        weekday: "long",
        month: "2-digit",
        day: "2-digit",
      })
    );
    dispatch(
      setDeliveryDate(
        deliDate.toLocaleDateString("pl-PL", {
          weekday: "long",
          month: "2-digit",
          day: "2-digit",
        })
      )
    );
  }, []);

  return (
    <>
      <div className="bg-zinc-900 pt-6 pb-6">
        <p className="text-3xl font-medium ml-12">Dostawa i płatność:</p>
      </div>
      <div className="flex justify-center mb-24">
        <div className="w-1/2">
          <p className="font-medium text-2xl mb-3">Dostawa</p>
          <div className="flex flex-col">
            <label
              className={`w-3/4 transition-all border pt-1 flex flex-col h-10 ${
                deliveryOption == "kurier" ? "h-64" : null
              }`}
            >
              <div className="flex w-full h-7 pl-2">
                <div className="flex w-3/4">
                  <input
                    type="radio"
                    name="delivery"
                    value="kurier"
                    onChange={handleDeliveryChoose}
                    checked={deliveryOption === "kurier"}
                  />
                  <p className="pl-2">
                    <span className="font-medium">Kurier - UPS, FedEx</span>
                    (20,00zł)
                  </p>
                </div>
                <div className="w-1/4 flex items-center justify-end pr-5 text-2xl">
                  <FaTruck />
                </div>
              </div>
              <div
                className={`flex ${
                  deliveryOption == "kurier" ? "block" : "hidden"
                }`}
              >
                <div className="flex flex-col items-center ml-10">
                  <div className="justify-center text-center items-center flex flex-col border mt-3 p-8 rounded-lg cursor-pointer">
                    <FaTruck className="text-4xl" />
                    <p>
                      Dostawa <br />
                      standardowa
                    </p>
                  </div>
                  <p className="text-center">
                    Zamówienie dostaniesz: <br /> {deliveryDay}
                  </p>
                </div>
                {/* <div className="flex flex-col items-center ml-10">
                  <div className="justify-center text-center items-center flex flex-col border mt-3 p-8 rounded-lg cursor-pointer">
                    <FaTruck className="text-4xl" />
                    <p>
                      Dostawa <br />
                      na dzisiaj
                    </p>
                  </div>
                  <p className="text-center">
                    Zamówienie dostaniesz: <br /> {deliveryDay}
                  </p>
                </div> */}
              </div>
            </label>
            {/* <label
              className={`w-3/4 border pt-1 flex h-10 ${
                deliveryOption == "paczkomaty" ? "h-20" : null
              }`}
            >
              <div className="flex w-full h-7 pl-2">
                <div className="flex w-3/4">
                  <input
                    type="radio"
                    name="delivery"
                    value="paczkomaty"
                    onChange={handleDeliveryChoose}
                    checked={deliveryOption === "paczkomaty"}
                  />
                  <p className="pl-2">
                    <span className="font-medium">Paczkomaty 24/7</span>
                    (9,90zł)
                  </p>
                </div>
                <div className="w-1/4 flex items-center justify-end pr-5 text-2xl">
                  <FaBox />
                </div>
              </div>
            </label> */}
          </div>
          <div className="my-10">
            <p className="font-medium text-2xl mb-3">Kupujesz jako:</p>
            <div className="flex w-3/4">
              <label className="mr-5">
                <div className="border rounded-lg w-64 h-14 text-lg flex items-center justify-center cursor-pointer">
                  <input
                    type="radio"
                    className="mr-2"
                    name="buyingOption"
                    value="person"
                    onChange={handleBuyingOption}
                    checked={buyingAsPerson === "person"}
                  />
                  Osoba prywatna
                </div>
              </label>
              <label>
                <div className="border rounded-lg w-64 h-14 text-lg flex items-center justify-center cursor-pointer">
                  <input
                    type="radio"
                    className="mr-2"
                    name="buyingOption"
                    value="industry"
                    onChange={handleBuyingOption}
                    checked={buyingAsPerson === "industry"}
                  />
                  Firma
                </div>
              </label>
            </div>
          </div>
          <div className={`${buyingAsPerson == "person" ? "hidden" : "block"}`}>
            <p className="font-medium text-2xl mb-3">
              Dane firmowe do faktury:
            </p>
            <div className={`flex flex-col `}>
              <input
                type="text"
                placeholder="NIP"
                className="outline-none border-none bg-zinc-700 rounded-xl w-96 h-10 pl-3 mb-5"
              />
              <input
                type="text"
                placeholder="Nazwa firmy"
                className="outline-none border-none bg-zinc-700 rounded-xl w-96 h-10 pl-3 mb-5"
              />
              <input
                type="text"
                placeholder="Ulica i numer"
                autoComplete="address-line1"
                className="outline-none border-none bg-zinc-700 rounded-xl w-96 h-10 pl-3 mb-5"
              />
              <input
                type="text"
                placeholder="Kod pocztowy"
                autoComplete="postal-code"
                className="outline-none border-none bg-zinc-700 rounded-xl w-96 h-10 pl-3 mb-5"
              />
              <input
                type="text"
                placeholder="Miejscowość"
                autoComplete="address-level2"
                className="outline-none border-none bg-zinc-700 rounded-xl w-96 h-10 pl-3 mb-5"
              />
            </div>
          </div>
          <div>
            <p className="font-medium text-2xl mb-3">Adres dostawy:</p>
            <div className={`flex flex-col `}>
              <input
                type="text"
                placeholder="Imię i nazwisko"
                autoComplete="name"
                onChange={(e) => handleInputsValue(e, "name")}
                value={orderingPerson}
                className="outline-none border-none bg-zinc-700 rounded-xl w-96 h-10 pl-3 mb-5"
              />
              <input
                type="text"
                placeholder="Ulica i numer"
                autoComplete="address-line1"
                onChange={(e) => handleInputsValue(e, "address")}
                value={address}
                className="outline-none border-none bg-zinc-700 rounded-xl w-96 h-10 pl-3 mb-5"
              />
              <input
                type="text"
                placeholder="Kod pocztowy"
                autoComplete="postal-code"
                onChange={(e) => handleInputsValue(e, "zipcode")}
                value={zipCode}
                className="outline-none border-none bg-zinc-700 rounded-xl w-96 h-10 pl-3 mb-5"
              />
              <input
                type="text"
                placeholder="Miejscowość"
                autoComplete="address-level2"
                onChange={(e) => handleInputsValue(e, "city")}
                value={city}
                className="outline-none border-none bg-zinc-700 rounded-xl w-96 h-10 pl-3 mb-5"
              />
              <input
                type="number"
                placeholder="Telefon"
                autoComplete="tel"
                onChange={(e) => handleInputsValue(e, "phone")}
                value={phone}
                className="outline-none border-none bg-zinc-700 rounded-xl w-96 h-10 pl-3 mb-5"
              />
              <input
                type="text"
                placeholder="E-mail"
                autoComplete="email"
                onChange={(e) => handleInputsValue(e, "email")}
                value={email}
                className="outline-none border-none bg-zinc-700 rounded-xl w-96 h-10 pl-3 mb-5"
              />
            </div>
          </div>
          <div>
            <p className="font-medium text-2xl">Dane do faktury:</p>
            <p className="text-sm">
              W naszym sklepie internetowym dowodem zakupu jest faktura. <br />
              Standardowo wystawiamy ją na dane z adresu dostawy.
            </p>
            <label className="flex mt-3">
              <input onChange={handleCheckbox} type="checkbox" name="" id="" />
              <p className="pl-2">Chcę podać inne dane do faktury</p>
            </label>
            <div
              className={`flex flex-col mt-5 ${checkbox ? "block" : "hidden"}`}
            >
              <input
                type="text"
                placeholder="Imię i nazwisko"
                autoComplete="name"
                className="outline-none border-none bg-zinc-700 rounded-xl w-96 h-10 pl-3 mb-5"
              />
              <input
                type="text"
                placeholder="Ulica i numer"
                autoComplete="address-line1"
                className="outline-none border-none bg-zinc-700 rounded-xl w-96 h-10 pl-3 mb-5"
              />
              <input
                type="text"
                placeholder="Kod pocztowy"
                autoComplete="postal-code"
                className="outline-none border-none bg-zinc-700 rounded-xl w-96 h-10 pl-3 mb-5"
              />
              <input
                type="text"
                placeholder="Miejscowość"
                autoComplete="address-level2"
                className="outline-none border-none bg-zinc-700 rounded-xl w-96 h-10 pl-3 mb-5"
              />
            </div>
          </div>
          {/* <div>
            <p className="font-medium text-2xl mt-3">Płatność:</p>
            <label className={`w-3/4 border flex h-12 `}>
              <div className="flex w-full items-center pl-2">
                <div className="flex">
                  <input
                    onChange={handlePaymentOption}
                    type="radio"
                    name="payment"
                    value="googlePay"
                    checked={paymentOption == "googlePay"}
                  />
                  <p className="pl-2">
                    <span className="font-medium">Płatność GooglePay</span>
                    (bezpłatnie)
                  </p>
                </div>
              </div>
            </label>
            <label className={`w-3/4 border flex h-12 `}>
              <div className="flex w-full items-center pl-2">
                <div className="flex w-3/4">
                  <input
                    onChange={handlePaymentOption}
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentOption == "card"}
                  />
                  <p className="pl-2">
                    <span className="font-medium">Karta płatnicza online</span>
                    (bezpłatnie)
                  </p>
                </div>
              </div>
            </label>
            <label className={`w-3/4 border flex h-12 `}>
              <div className="flex w-full items-center pl-2">
                <div className="flex w-3/4">
                  <input
                    onChange={handlePaymentOption}
                    type="radio"
                    name="payment"
                    value="blik"
                    checked={paymentOption == "blik"}
                  />
                  <p className="pl-2">
                    <span className="font-medium">BLIK</span>
                    (bezpłatnie)
                  </p>
                </div>
              </div>
            </label>
            <label className={`w-3/4 border flex h-12 `}>
              <div className="flex w-full items-center pl-2">
                <div className="flex w-3/4">
                  <input
                    onChange={handlePaymentOption}
                    type="radio"
                    name="payment"
                    value="transfer"
                    checked={paymentOption == "transfer"}
                  />
                  <p className="pl-2">
                    <span className="font-medium">Przelew tradycyjny</span>
                    (bezpłatnie)
                  </p>
                </div>
              </div>
            </label>
          </div> */}
        </div>
        <Summarise cart={cartProdsArr} />
      </div>
    </>
  );
}

export default Page;
