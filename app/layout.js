



import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Providers } from "./providers";
import { Grid, GridItem } from "@chakra-ui/react";
import TableOrders from "@/components/table/TableOrders";
import SideNavBar from "@/components/navbar/SideNavBar";
import Footer from "@/components/Footer";


const montserrat = Montserrat({ subsets: ["latin"] , weight:["300","300"] });

export const metadata = {
  title: "Tailor Management",
  description: "",
};

export default function Layout({ children }) {
  
  // console.log('token',window.localStorage.getItem('token'))
  return (
    
      <html lang="en">
        <body className={``}>
          <Providers>{children}</Providers>
        </body>
      </html>
    
  );
}

