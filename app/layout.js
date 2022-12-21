import "../styles/globals.css";
import Header from "../components/Header";
import Head from "./head";
import Footer from "../components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <Head />
      <body className="font-sans bg-zinc-900 text-white">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
