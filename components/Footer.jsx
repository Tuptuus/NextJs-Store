import Link from "next/link";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaCcMastercard,
  FaCcVisa,
  FaApplePay,
  FaGooglePay,
} from "react-icons/fa";

function Footer() {
  return (
    <div className="mt-28 bg-zinc-800 h-52 flex flex-col justify-center">
      <div className="flex border-solid border-zinc-700 border-b-4 pb-8 items-center">
        <div className="w-1/2">
          <div className="w-48 text-4xl font-bold italic text-center flex justify-center">
            <Link href={"/"} className="cursor-default h-max">
              <span>Tup</span>
              <span className="text-teal-500">S</span>
              <span>tore</span>
            </Link>
          </div>
        </div>
        <div className="flex w-1/2 justify-end pr-10">
          <FaFacebook className="text-5xl cursor-pointer ml-5" />
          <FaInstagram className="text-5xl cursor-pointer ml-5" />
          <FaTwitter className="text-5xl cursor-pointer ml-5" />
        </div>
      </div>
      <div className="flex pt-8 text-lg">
        <ul className="w-1/2 flex">
          <li className="ml-6">© 2022. TupStore</li>
          <li className="ml-8">Privacy Policy</li>
          <li className="ml-8">Terms of Use</li>
        </ul>
        <div className="w-1/2 flex justify-end pr-10 items-center">
          <span>Accepted Payments: </span>
          <FaCcVisa className="text-4xl ml-2" />
          <FaCcMastercard className="text-4xl ml-2" />
          <FaApplePay className="text-4xl ml-2" />
          <FaGooglePay className="text-4xl ml-2" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
