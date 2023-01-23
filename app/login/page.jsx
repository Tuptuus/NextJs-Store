"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/login/loginSlice";
import { useRouter } from "next/navigation";

function Page() {
  const [login, setLoginPage] = useState(true);
  const [emailValueReg, setEmailValueReg] = useState("");
  const [loginValueReg, setLoginValueReg] = useState("");
  const [passValueReg, setPassValueReg] = useState("");

  const [emailValueLog, setEmailValueLog] = useState("");
  const [passValueLog, setPassValueLog] = useState("");

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

  const handleLogin = (type) => {
    if (type == "register") {
      dispatch(
        registerUser({
          email: emailValueReg,
          pass: passValueReg,
          nick: loginValueReg,
        })
      );
    }
  };

  return (
    <div className=" w-full h-[461px] flex flex-col items-center justify-center">
      {login ? (
        <>
          <p className="text-5xl font-bold my-5 select-none">Zaloguj się</p>
          <div className="border rounded-2xl flex flex-col w-[500px] items-center h-80">
            <input
              type="text"
              className="w-96 rounded-full mt-10 h-10 border-none outline-none text-black pl-5"
              placeholder="Email"
              value={emailValueLog}
              onChange={(e) => {
                handleInputsValue(e, "emailLog");
              }}
            />
            <input
              type="password"
              className="w-96 rounded-full mt-6 h-10 border-none outline-none text-black pl-5"
              placeholder="Hasło"
              value={passValueLog}
              onChange={(e) => {
                handleInputsValue(e, "passLog");
              }}
            />
            <div className="bg-teal-500 w-96 h-10 rounded-full mt-6 hover:bg-teal-600 transition-all flex justify-center items-center text-xl cursor-pointer mb-10">
              Zaloguj się
            </div>
            <div className="flex w-full">
              <div className="w-1/2 pl-5">
                <span
                  onClick={() => setLoginPage(false)}
                  className="cursor-pointer hover:underline underline-offset-4 decoration-teal-500 "
                >
                  Nie masz konta?
                </span>
              </div>
              <div className="w-1/2 flex justify-end pr-5">
                <span className="cursor-pointer hover:underline underline-offset-4 decoration-teal-500">
                  Zapomniałeś hasła?
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <p className="text-5xl font-bold my-5 select-none">Zarejestruj się</p>
          <div className="border rounded-2xl flex flex-col w-[500px] items-center h-80">
            <input
              type="text"
              className="w-96 rounded-full mt-5 h-10 border-none outline-none text-black pl-5"
              placeholder="Email"
              value={emailValueReg}
              onChange={(e) => {
                handleInputsValue(e, "emailReg");
              }}
            />
            <input
              type="text"
              className="w-96 rounded-full mt-5 h-10 border-none outline-none text-black pl-5"
              placeholder="Nick"
              value={loginValueReg}
              onChange={(e) => {
                handleInputsValue(e, "loginReg");
              }}
            />
            <input
              type="password"
              className="w-96 rounded-full mt-5 h-10 border-none outline-none text-black pl-5"
              placeholder="Hasło"
              value={passValueReg}
              onChange={(e) => {
                handleInputsValue(e, "passReg");
              }}
            />
            <div
              onClick={() => handleLogin("register")}
              className="bg-teal-500 w-96 h-10 rounded-full mt-6 hover:bg-teal-600 transition-colors flex justify-center items-center text-xl cursor-pointer mb-5"
            >
              Zarejestruj się
            </div>
            <div className="flex w-full">
              <div className="w-1/2 pl-5">
                <span
                  onClick={() => setLoginPage(true)}
                  className="cursor-pointer hover:underline underline-offset-4 decoration-teal-500"
                >
                  Masz konto?
                </span>
              </div>
              <div className="w-1/2 flex justify-end pr-5">
                <span className="cursor-pointer hover:underline underline-offset-4 decoration-teal-500">
                  Zapomniałeś hasła?
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Page;
