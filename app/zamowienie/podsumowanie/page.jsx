"use client";
import React from "react";
import { useSelector } from "react-redux";

function Page() {
  const delivery = useSelector((state) => state.order.delivery);
  const payment = useSelector((state) => state.order.payment);
  const sumPrice = useSelector((state) => state.order.summaryPrice);
  console.log(delivery);
  console.log(payment);
  console.log(sumPrice);
  return <div>strona z podsumowaniem</div>;
}

export default Page;
