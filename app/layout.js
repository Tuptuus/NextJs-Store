import "../styles/globals.css";
import Header from "../components/Header";
import Head from "./head";

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <Head />
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
