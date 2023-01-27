"use client";
import { updatePassword } from "firebase/auth";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../../components/Spinner";
import { auth } from "../../../firebase-config";

function Page() {
  const user = useSelector((state) => state.user.user);
  const [currentUser, setCurrentUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
  const [changePass, setChangePass] = useState(false);
  const [changePassInfo, setChangePassInfo] = useState("");
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  useEffect(() => {
    if (currentUser) {
      const space = currentUser.displayName.indexOf(" ");
      setFirstName(currentUser.displayName.slice(0, space));
      setSecondName(currentUser.displayName.slice(space + 1));
    }
  }, [currentUser]);

  const handleInputs = (e, type) => {
    if (type == "password") {
      setPassword(e.target.value);
    } else if (type == "newPassword") {
      setNewPassword(e.target.value);
    } else if (type == "newPasswordRepeat") {
      setNewPasswordRepeat(e.target.value);
    }
  };

  const changePassword = async () => {
    setChangePass(false);
    setSpinner(true);
    try {
      if (password == "" || newPassword == "" || newPasswordRepeat == "") {
        setSpinner(false);
        setChangePassInfo("Wprowadź wszystkie dane");
        setTimeout(() => {
          setChangePassInfo("");
        }, 2500);
      } else if (newPassword != newPasswordRepeat) {
        setSpinner(false);
        setChangePassInfo("Hasła nie są takie same");
        setTimeout(() => {
          setChangePassInfo("");
        }, 2500);
      } else {
        await updatePassword(auth.currentUser, newPassword);
        setSpinner(false);
        setChangePass(true);
        setChangePassInfo("Hasło zostało pomyślnie zmienione");
        setTimeout(() => {
          setChangePassInfo("");
        }, 2500);
      }
    } catch (err) {
      console.log(err);
      if (err.code == "auth/weak-password") {
        setChangePassInfo("Zbyt słabe hasło");
        setTimeout(() => {
          setChangePassInfo("");
        }, 2500);
        setSpinner(false);
      } else if (err.code == "auth/requires-recent-login") {
        setChangePassInfo("Aktualne hasło jest nieprawidłowe");
        setTimeout(() => {
          setChangePassInfo("");
        }, 2500);
        setSpinner(false);
      }
    }
  };
  return (
    <div className="">
      <div>
        <p className="text-3xl text-center lg:text-left">Ustawienia konta</p>
      </div>
      <div className="flex flex-col items-center lg:items-start">
        <p className="mt-5">Imie:</p>
        <div className="w-4/5 h-14 flex rounded-lg border items-center">
          <div className="w-[85%]">
            <p className="font-bold pl-4">{firstName}</p>
          </div>
          <div className="w-[15%]">
            <span className="cursor-pointer hover:text-teal-500 transition-all">
              Edytuj
            </span>
          </div>
        </div>
        <p className="mt-5">Nazwisko:</p>
        <div className="w-4/5 h-14 flex rounded-lg border items-center">
          <div className="w-[85%]">
            <p className="font-bold pl-4">{secondName}</p>
          </div>
          <div className="w-[15%]">
            <span className="cursor-pointer hover:text-teal-500 transition-all">
              Edytuj
            </span>
          </div>
        </div>
        <p className="mt-5">Adres e-mail</p>
        <div className="w-4/5 h-14 flex rounded-lg border items-center">
          <div className="w-[85%]">
            <p className="pl-4">{currentUser ? currentUser.email : null}</p>
          </div>
          <div className="w-[15%]">
            <span className="cursor-pointer hover:text-teal-500 transition-all">
              Zmień
            </span>
          </div>
        </div>
        <p className="mt-10 text-2xl">Edycja hasła</p>
        <div className="w-4/5 h-14 flex rounded-lg border items-center mt-5">
          <div className="w-[85%] h-full">
            <input
              type="password"
              placeholder="Aktualne hasło..."
              className="h-full bg-transparent pl-5 text-lg border-0 outline-none w-full"
              value={password}
              onChange={(e) => {
                handleInputs(e, "password");
              }}
            />
          </div>
        </div>
        <div className="w-4/5 h-14 flex rounded-lg border items-center mt-5">
          <div className="w-[85%] h-full">
            <input
              type="password"
              placeholder="Nowe hasło..."
              className="h-full bg-transparent pl-5 text-lg border-0 outline-none w-full"
              value={newPassword}
              onChange={(e) => {
                handleInputs(e, "newPassword");
              }}
            />
          </div>
        </div>
        <div className="w-4/5 h-14 flex rounded-lg border items-center mt-5">
          <div className="w-[85%] h-full">
            <input
              type="password"
              placeholder="Powtórz nowe hasło"
              className="h-full bg-transparent pl-5 text-lg border-0 outline-none w-full"
              value={newPasswordRepeat}
              onChange={(e) => {
                handleInputs(e, "newPasswordRepeat");
              }}
            />
          </div>
        </div>
        <p className={`my-2 ${changePass ? "text-green-500" : "text-red-500"}`}>
          {changePassInfo}
        </p>
        <div className="flex">
          <div
            onClick={changePassword}
            className=" w-36 h-10 flex justify-center items-center text-xl border rounded-lg cursor-pointer hover:text-teal-500 transition-all"
          >
            Zmień Hasło
          </div>
          <div className="flex justify-center items-center ml-2">
            {spinner ? <Spinner w={8} h={8} color={"fill-teal-500"} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
