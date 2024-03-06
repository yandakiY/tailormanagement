

import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Providers } from "./providers";


const montserrat = Montserrat({ subsets: ["latin"] , weight:["300","300"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        <nav className="flex justify-between mx-4 py-4">
          <div className="text-3xl font-bold border-b-2">Tailor Management</div>
          <ul className="flex text-xl justify-center items-center gap-x-4">
            <Link href={'/about'}>About</Link>
            <Link href={''}>Contacts</Link>
          </ul>
        </nav>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
