import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  address: "",
  zipcode: "",
  city: "",
  phone: "",
  email: "",
  delivery: "kurier",
  payment: "dotpay",
  summaryPrice: 0,
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
} = orderSlice.actions;

export default orderSlice.reducer;
