"use client";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import Spinner from "../../components/Spinner";
import { auth } from "../../firebase-config";

function Page() {
  const [emailValueLog, setEmailValueLog] = useState("");
  const [passValueLog, setPassValueLog] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputsValue = (e, type) => {
    if (type == "emailLog") {
      setEmailValueLog(e.target.value);
    } else if (type == "passLog") {
      setPassValueLog(e.target.value);
    }
  };

  const loginUser = async () => {
    setSpinner(true);
    try {
      if (emailValueLog == "" || passValueLog == "") {
        setSpinner(false);
        setError("Wprowadź wszystkie dane");
        setTimeout(() => {
          setError("");
        }, 2500);
      } else {
        await signInWithEmailAndPassword(auth, emailValueLog, passValueLog);
        router.push("/zamowienie");
        setSpinner(false);
      }
    } catch (err) {
      console.log(err);
      console.log(err.code);
      if (err.code == "auth/wrong-password") {
        setSpinner(false);
        setError("Nieprawidłowe hasło");
        setTimeout(() => {
          setError("");
        }, 2500);
      } else if (err.code == "auth/invalid-email") {
        setSpinner(false);
        setError("Nieprawidłowy email");
        setTimeout(() => {
          setError("");
        }, 2500);
      } else if (err.code == "auth/user-not-found") {
        setSpinner(false);
        setError("Nie znaleziono użytkownika");
        setTimeout(() => {
          setError("");
        }, 2500);
      } else if (err.code == "auth/too-many-requests") {
        setSpinner(false);
        setError("Spróbuj ponownie później");
        setTimeout(() => {
          setError("");
        }, 2500);
      }
    }
  };

  return (
    <div className="flex lg:flex-row flex-col justify-center">
      <div className="flex flex-col items-center">
        <p className="text-5xl font-bold my-5 select-none">Zaloguj się </p>
        <div className="border rounded-2xl flex flex-col w-[480px] lg:w-[600px] items-center h-80 lg:mb-20 mb-5">
          <div className="flex flex-col items-center">
            <input
              type="text"
              className="lg:w-[550px] w-96 rounded-full mt-10 h-10 lg:mt-8 lg:h-12 border-none outline-none text-black pl-5 text-xl transition-all"
              placeholder="Email"
              value={emailValueLog}
              onChange={(e) => {
                handleInputsValue(e, "emailLog");
              }}
            />
            <input
              type="password"
              className="lg:w-[550px] w-96 rounded-full mt-6 h-10 lg:mt-8 lg:h-12 border-none outline-none text-black pl-5 text-xl transition-all"
              placeholder="Hasło"
              value={passValueLog}
              onChange={(e) => {
                handleInputsValue(e, "passLog");
              }}
            />
            <div
              onClick={() => loginUser()}
              className="bg-teal-500 lg:w-[550px] w-96 h-12 rounded-full lg:mt-8 mt-6 hover:bg-teal-600 transition-all flex justify-center items-center text-2xl cursor-pointer"
            >
              Zaloguj się
              {spinner ? (
                <span className="pl-2">
                  <Spinner w={8} h={8} color={"fill-red-300"} />
                </span>
              ) : null}
            </div>
            <p className="text-red-500 text-lg mt-2">{error}</p>
          </div>
          <div className="flex w-full h-full items-end pb-5">
            <div className="w-1/2 flex pl-5">
              <span className="cursor-pointer hover:underline underline-offset-4 decoration-teal-500">
                <Link href={"/przypomnienie-hasla"}>Zapomniałeś hasła?</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-[500px] flex flex-col items-center mb-20">
        <div className="w-[400px] lg:mt-20">
          <p className="font-bold text-2xl">Kontynuuj bez logowania</p>
          <p className="text-sm mt-2">
            Jeśli się nie zalogujesz, nie będziesz miał dostępu do historii
            zamówień oraz rabatów, które dla Ciebie przygotowaliśmy.
          </p>
          <Link href={"/zamowienie"}>
            <div className="w-full h-12 border-2 text-lg border-teal-500 text-teal-500 flex justify-center items-center rounded-full mt-5 cursor-pointer hover:bg-teal-500 hover:text-white transition-all">
              Kontynuuj jako gość
            </div>
          </Link>
        </div>
        <div className="w-[400px] mt-8">
          <p className="font-bold text-2xl">Załóż konto</p>
          <p className="text-sm mt-1">Śledź status zamówienia</p>
          <p className="text-sm mt-1">Korzystaj z rabatów i promocji</p>
          <Link href={"/login"}>
            <div className="w-full h-12 border-2 text-lg border-teal-500 text-teal-500 flex justify-center items-center rounded-full mt-5 cursor-pointer hover:bg-teal-500 hover:text-white transition-all">
              Załóż konto
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
