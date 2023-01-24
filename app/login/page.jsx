"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setCurrentUser } from "../../features/login/loginSlice";
import { auth } from "../../firebase-config";
import Link from "next/link";
import Spinner from "../../components/Spinner";

function Page() {
  const [login, setLoginPage] = useState(true);
  const [emailValueReg, setEmailValueReg] = useState("");
  const [loginValueReg, setLoginValueReg] = useState("");
  const [passValueReg, setPassValueReg] = useState("");

  const [emailValueLog, setEmailValueLog] = useState("");
  const [passValueLog, setPassValueLog] = useState("");

  const [error, setError] = useState("");
  const [spinner, setSpinner] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.user);

  const handleInputsValue = (e, type) => {
    if (type == "emailLog") {
      setEmailValueLog(e.target.value);
    } else if (type == "passLog") {
      setPassValueLog(e.target.value);
    } else if (type == "emailReg") {
      setEmailValueReg(e.target.value);
    } else if (type == "loginReg") {
      setLoginValueReg(e.target.value);
    } else if (type == "passReg") {
      setPassValueReg(e.target.value);
    }
  };

  const handleLogin = async (type) => {
    setSpinner(true);
    if (type == "register") {
      try {
        if (emailValueReg == "" || passValueReg == "" || loginValueReg == "") {
          setSpinner(false);
          setError("Wprowadź wszystkie dane");
          setTimeout(() => {
            setError("");
          }, 2500);
        } else {
          await createUserWithEmailAndPassword(
            auth,
            emailValueReg,
            passValueReg
          );
          await updateProfile(auth.currentUser, {
            displayName: loginValueReg,
          });
          setSpinner(false);
          dispatch(setCurrentUser(JSON.stringify(auth.currentUser)));
          router.push("/konto");
        }
      } catch (err) {
        console.log(err);
        if (err.code == "auth/invalid-email") {
          setSpinner(false);
          setError("Nieprawidłowy email");
          setTimeout(() => {
            setError("");
          }, 2500);
        } else if (err.code == "auth/weak-password") {
          setSpinner(false);
          setError("Zbyt słabe hasło");
          setTimeout(() => {
            setError("");
          }, 2500);
        } else if (err.code == "auth/invalid-password") {
          setSpinner(false);
          setError("Hasło musi być minimum 6 znakowe");
          setTimeout(() => {
            setError("");
          }, 2500);
        } else if (err.code == "auth/email-already-in-use") {
          setSpinner(false);
          setError("Ten email jest już w użyciu");
          setTimeout(() => {
            setError("");
          }, 2500);
        }
      }
    } else if (type == "login") {
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
          router.push("/konto");
          setSpinner(false);
        }
      } catch (err) {
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
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center lg:mt-5 h-[461px] lg:h-full">
      {login ? (
        <>
          <p className="text-5xl font-bold my-5 select-none">Zaloguj się </p>
          <div className="border rounded-2xl flex flex-col w-[500px] lg:w-[700px] items-center h-96 mb-20">
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
                onClick={() => handleLogin("login")}
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
              <div className="w-1/2 pl-5 select-none">
                <span
                  onClick={() => {
                    setLoginPage(false);
                    setError("");
                  }}
                  className="cursor-pointer hover:underline underline-offset-4 decoration-teal-500 "
                >
                  Nie masz konta?
                </span>
              </div>
              <div className="w-1/2 flex justify-end pr-5">
                <span className="cursor-pointer hover:underline underline-offset-4 decoration-teal-500">
                  <Link href={"/przypomnienie-hasla"}>Zapomniałeś hasła?</Link>
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <p className="text-5xl font-bold my-5 select-none">Zarejestruj się</p>
          <div className="border rounded-2xl flex flex-col w-[500px] lg:w-[700px] items-center h-96 mb-20">
            <div className="flex flex-col items-center lg:h-[360px]">
              <input
                type="text"
                className="lg:w-[550px] w-96 rounded-full mt-6 h-10 lg:h-12 border-none outline-none text-black pl-5 text-xl transition-all"
                placeholder="Email"
                value={emailValueReg}
                onChange={(e) => {
                  handleInputsValue(e, "emailReg");
                }}
              />
              <input
                type="password"
                className="lg:w-[550px] w-96 rounded-full mt-6 h-10 lg:h-12 border-none outline-none text-black pl-5 text-xl transition-all"
                placeholder="Hasło"
                value={passValueReg}
                onChange={(e) => {
                  handleInputsValue(e, "passReg");
                }}
              />
              <input
                type="text"
                className="lg:w-[550px] w-96 rounded-full mt-6 h-10 lg:h-12 border-none outline-none text-black pl-5 text-xl transition-all"
                placeholder="Nick"
                value={loginValueReg}
                onChange={(e) => {
                  handleInputsValue(e, "loginReg");
                }}
              />
              <div
                onClick={() => handleLogin("register")}
                className="bg-teal-500 lg:w-[550px] w-96 h-12 rounded-full mt-6 hover:bg-teal-600 transition-all flex justify-center items-center text-2xl cursor-pointer"
              >
                Zarejestruj się
                {spinner ? (
                  <span className="pl-2">
                    <Spinner w={8} h={8} color={"fill-red-300"} />
                  </span>
                ) : null}
              </div>
              <p className="text-red-500 mt-2 text-lg">{error}</p>
            </div>
            <div className="flex w-full lg:mt-5 items-end lg:pb-5 h-6 select-none">
              <div className="w-1/2 pl-5">
                <span
                  onClick={() => {
                    setLoginPage(true);
                    setError("");
                  }}
                  className="cursor-pointer hover:underline underline-offset-4 decoration-teal-500"
                >
                  Masz konto?
                </span>
              </div>
              {/* <div className="w-1/2 flex justify-end pr-5">
                <span className="cursor-pointer hover:underline underline-offset-4 decoration-teal-500">
                  Zapomniałeś hasła?
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
