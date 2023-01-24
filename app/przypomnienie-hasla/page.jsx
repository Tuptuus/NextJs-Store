"use client";
import { sendPasswordResetEmail } from "firebase/auth";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { auth } from "../../firebase-config";
import { useRouter } from "next/navigation";
import Spinner from "../../components/Spinner";

function Page() {
  const router = useRouter();
  const [emailValue, setEmailValue] = useState("");
  const [err, setErr] = useState("");
  const [sendEmail, setSendEmail] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const handleInput = (e) => {
    setEmailValue(e.target.value);
  };

  const resetPassword = async () => {
    setSpinner(true);
    try {
      if (emailValue == "") {
        setSpinner(false);
        setErr("Wpisz email");
        setTimeout(() => {
          setErr("");
        }, 2500);
      }
      await sendPasswordResetEmail(auth, emailValue);
      setSpinner(false);
      setSendEmail(true);
    } catch (err) {
      console.log(err);
      if (err.code == "auth/invalid-email") {
        setSpinner(false);
        setErr("Nieprawidowy email");
        setTimeout(() => {
          setErr("");
        }, 2500);
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center lg:mt-5 lg:h-full">
      {sendEmail ? (
        <>
          <p className="lg:text-5xl text-4xl font-bold my-5 select-none">
            Sprawdź swoją pocztę
          </p>
          <div className="border rounded-2xl flex flex-col lg:w-[700px] p-5 mb-20">
            <div className="flex flex-col">
              <div className="pb-10">
                <p>
                  Jeśli na podany e-mail jest założone konto, to wyślemy na
                  niego wiadomość.
                </p>
                <p className="font-bold">{emailValue}</p>
              </div>
              <div className="pb-10">
                <p className="font-bold">Nie otrzymałeś maila?</p>
                <p>1. Zajrzyj do folderu ze spamem</p>
                <p>2. Sprawdź, czy podany adres e-mail jest poprawny</p>
                <p>3. Poczekaj i sprawdź za 15min</p>
              </div>
              <div>
                <p className="font-bold">Wpisałeś niepoprawnego maila?</p>
                <p
                  onClick={() => {
                    setSendEmail(false);
                    setEmailValue("");
                  }}
                  className="cursor-pointer hover:underline underline-offset-4 decoration-teal-500 "
                >
                  Wypełnij formularz ponownie
                </p>
              </div>
            </div>
            <div className="flex w-full h-full items-end py-7">
              <div className="w-1/2 select-none">
                <span className="cursor-pointer hover:underline underline-offset-4 decoration-teal-500 ">
                  <Link href={"/login"}>Zaloguj się</Link>
                </span>
              </div>
              {/* <div className="w-1/2 flex justify-end pr-5">
            <span className="cursor-pointer hover:underline underline-offset-4 decoration-teal-500">
              <Link href={"/przypomnienie-hasla"}>Zapomniałeś hasła?</Link>
            </span>
          </div> */}
            </div>
          </div>
        </>
      ) : (
        <>
          <p className="text-5xl font-bold my-5 select-none">Odzyskaj hasło</p>
          <div className="border rounded-2xl flex flex-col w-[500px] lg:w-[700px] items-center h-72 mb-20">
            <div className="flex flex-col items-center">
              <input
                type="text"
                className="lg:w-[550px] w-96 rounded-full mt-6 h-10 lg:mt-8 lg:h-12 border-none outline-none text-black pl-5 text-xl transition-all"
                placeholder="E-mail"
                value={emailValue}
                onChange={(e) => {
                  handleInput(e);
                }}
              />
              <div
                onClick={resetPassword}
                className="bg-teal-500 lg:w-[550px] w-96 h-12 rounded-full lg:mt-8 mt-6 hover:bg-teal-600 transition-all flex justify-center items-center text-2xl cursor-pointer"
              >
                Odzyskaj hasło
                {spinner ? (
                  <span className="pl-2">
                    <Spinner w={8} h={8} color={"fill-red-300"} />
                  </span>
                ) : null}
              </div>
              <p className="text-red-500 text-lg mt-2">{err}</p>
            </div>
            <div className="flex w-full h-full items-end pb-5">
              <div className="w-1/2 pl-5 select-none">
                <span className="cursor-pointer hover:underline underline-offset-4 decoration-teal-500 ">
                  <Link href={"/login"}>Zaloguj się</Link>
                </span>
              </div>
              {/* <div className="w-1/2 flex justify-end pr-5">
            <span className="cursor-pointer hover:underline underline-offset-4 decoration-teal-500">
              <Link href={"/przypomnienie-hasla"}>Zapomniałeś hasła?</Link>
            </span>
          </div> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Page;
