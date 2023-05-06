import { createSlice } from "@reduxjs/toolkit";

let summaryPrice = 0;
if (typeof window !== "undefined") {
  summaryPrice = localStorage.getItem("summaryPrice");
}
if (summaryPrice === null) {
  localStorage.setItem("summaryPrice", 0);
}
let deliveryDate = "";
if (typeof window !== "undefined") {
  deliveryDate = localStorage.getItem("deliveryDate");
}
if (deliveryDate === null) {
  localStorage.setItem("deliveryDate", "");
}
let initialAddressInfo = [];
if (typeof window !== "undefined") {
  initialAddressInfo = JSON.parse(localStorage.getItem("addressInformations"));
}

if (initialAddressInfo === null) {
  initialAddressInfo = [];
  localStorage.setItem("addressInformations", JSON.stringify([]));
}

const initialState = {
  name: "",
  address: "",
  zipcode: "",
  city: "",
  phone: "",
  email: "",
  delivery: "kurier",
  payment: "googlePay",
  buyingAs: "person",
  summaryPrice: summaryPrice,
  deliveryDay: deliveryDate,
  addressInformations: initialAddressInfo,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setZipCode: (state, action) => {
      state.zipcode = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setDelivery: (state, action) => {
      state.delivery = action.payload;
    },
    setPayment: (state, action) => {
      state.payment = action.payload;
    },
    setSummaryPrice: (state, action) => {
      state.summaryPrice = action.payload;
      localStorage.setItem("summaryPrice", action.payload);
    },
    setBuyingAs: (state, action) => {
      state.buyingAs = action.payload;
    },
    setDeliveryDate: (state, action) => {
      state.deliveryDay = action.payload;
      localStorage.setItem("deliveryDate", action.payload);
    },
    setAddressInformations: (state, action) => {
      state.addressInformations = action.payload;
      localStorage.setItem(
        "addressInformations",
        JSON.stringify(action.payload)
      );
    },
  },
});

export const {
  setName,
  setAddress,
  setZipCode,
  setCity,
  setPhone,
  setEmail,
  setDelivery,
  setPayment,
  setSummaryPrice,
  setBuyingAs,
  setDeliveryDate,
  setAddressInformations,
} = orderSlice.actions;

export default orderSlice.reducer;
