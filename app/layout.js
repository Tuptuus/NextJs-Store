"use client";
import "../styles/globals.css";
import Header from "../components/Header";
import Head from "./head";
import Footer from "../components/Footer";
import { store } from "../store";
import { Provider } from "react-redux";

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <Head />
      <Provider store={store}>
        <body className="font-sans bg-zinc-900 text-white">
          <Header />
          {children}
          <Footer />
        </body>
      </Provider>
    </html>
  );
}
