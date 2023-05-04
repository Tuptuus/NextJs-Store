"use client";
import Link from "next/link";
import React from "react";
import {
  FaTruck,
  FaUser,
  FaBriefcase,
  FaCcVisa,
  FaCcMastercard,
  FaGooglePay,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import SummaryPanel from "../../../components/sumPage/SummaryPanel";
import Image from "next/image";
import blik from "../../../images/blik.png";
import przelewy from "../../../images/logo_przelewy24.png";

function Page() {
  const delivery = useSelector((state) => state.order.delivery);
  const payment = useSelector((state) => state.order.payment);
  const sumPrice = useSelector((state) => state.order.summaryPrice);
  const buyingAs = useSelector((state) => state.order.buyingAs);
  const orderingPerson = useSelector((state) => state.order.name);
  const address = useSelector((state) => state.order.address);
  const zipCode = useSelector((state) => state.order.zipcode);
  const city = useSelector((state) => state.order.city);
  const phone = useSelector((state) => state.order.phone);
  const email = useSelector((state) => state.order.email);
  console.log(delivery);
  console.log(payment);
  console.log(sumPrice);
  return (
    <>
      <div className="bg-zinc-900 pt-6 pb-6">
        <p className="text-3xl font-medium ml-12">Podsumowanie</p>
      </div>
      <div className="flex justify-center mb-24">
        <div className="w-1/2">
          <p className="font-medium text-2xl mb-3">Dostawa</p>
          <div className="flex border w-3/4 h-16 rounded-lg items-center">
            <div>
              <FaTruck className="text-4xl ml-5" />
            </div>
            <div className="ml-5 w-4/5">
              <div className="font-medium">
                {delivery == "kurier"
                  ? "Kurier – InPost, UPS, FedEx, DTS, PickPack"
                  : "coś innego"}
              </div>
              <div>Dostawa standardowa</div>
            </div>
            <div className="flex">
              <Link className="mr-5" href={"/zamowienie"}>
                <p className="cursor-pointer hover:underline decoration-teal-500 underline-offset-4">
                  Zmień
                </p>
              </Link>
            </div>
          </div>
          <div className="my-10">
            <p className="font-medium text-2xl mb-3">Kupujesz jako</p>
            <div className="flex w-3/4 border h-16 rounded-lg items-center">
              <div>
                {buyingAs == "person" ? (
                  <FaUser className="text-4xl ml-5" />
                ) : (
                  <FaBriefcase className="text-4xl ml-5" />
                )}
              </div>
              <div className="ml-5 font-medium w-4/5">
                {buyingAs == "person" ? "Osoba prywatna" : "Firma"}
              </div>
              <div className="flex">
                <Link className="mr-5" href={"/zamowienie"}>
                  <p className="cursor-pointer hover:underline decoration-teal-500 underline-offset-4">
                    Zmień
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div className="my-10">
            <p className="font-medium text-2xl mb-3">Adres dostawy</p>
            <div className="flex flex-col w-3/4 border py-2 rounded-lg justify-center">
              <div className="flex h-7">
                <div className="w-4/5 ml-5 mr-16 font-medium">
                  {orderingPerson}
                </div>
                <div className="flex">
                  <Link className="mr-5" href={"/zamowienie"}>
                    <p className="cursor-pointer hover:underline decoration-teal-500 underline-offset-4">
                      Zmień
                    </p>
                  </Link>
                </div>
              </div>
              <div className="ml-5">
                <p>{address}</p>
                <p>
                  {zipCode} {city}
                </p>
                <p>e-mail: {email}</p>
                <p>tel. {phone}</p>
              </div>
            </div>
          </div>
          <div>
            <p className="font-medium text-2xl mb-3">Płatność</p>
            <div className="flex w-3/4 border h-16 rounded-lg items-center">
              {payment == "googlePay" ? (
                <div className="flex">
                  <FaGooglePay className="text-4xl ml-5" />
                </div>
              ) : null}
              {payment == "card" ? (
                <div className="flex">
                  <FaCcVisa className="text-4xl ml-5" />
                  <FaCcMastercard className="text-4xl ml-2" />
                </div>
              ) : null}
              {payment == "blik" ? (
                <div className="flex">
                  <Image
                    className="ml-5"
                    height={50}
                    width={50}
                    alt="BLIK"
                    src={blik}
                  />
                </div>
              ) : null}
              {payment == "transfer" ? (
                <div className="flex">
                  <Image
                    className="ml-5"
                    height={60}
                    width={60}
                    alt="Przelew"
                    src={przelewy}
                  />
                </div>
              ) : null}
              <div className="w-4/5">
                {payment == "googlePay" ? (
                  <p className="font-medium ml-5">Płatność GooglePay</p>
                ) : null}
                {payment == "card" ? (
                  <p className="font-medium ml-5">Karta płatnicza online</p>
                ) : null}
                {payment == "card" ? (
                  <p className="font-medium ml-5">Płatność BLIK</p>
                ) : null}
                {payment == "transfer" ? (
                  <p className="font-medium ml-5">Przelew tradycyjny</p>
                ) : null}
              </div>
              <div className="flex">
                <Link className="mr-5" href={"/zamowienie"}>
                  <p className="cursor-pointer hover:underline decoration-teal-500 underline-offset-4">
                    Zmień
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <SummaryPanel />
      </div>
    </>
  );
}

export default Page;
