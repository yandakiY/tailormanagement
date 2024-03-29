

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
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
      
        <Providers>

            <Grid
              className="h-screen m-2"
              templateAreas={`
                  "nav block"
                  "nav block"
              `}
              gridTemplateRows={'90vh auto'}
              gridTemplateColumns={'320px auto'}
              gap='1'
              color='blackAlpha.700'
              fontWeight='bold'
              
            >
              <GridItem className="border fixed top-0 left-0 h-screen w-80 m-2 overflow-y-scroll z-10 text-black bg-white" pl='2' area={'nav'}>
                <SideNavBar />
              </GridItem>


              <GridItem area={'block'} className="z-0">
                {/* Main part */}
                <GridItem grid={'true'} className="border  h-screen overflow-x-hidden" pl={'2'} mb={'2'} area={'main'}>
                  {children}
                </GridItem>

                <GridItem className="border flex flex-col items-center justify-center relative right-0 left-0 bottom-0 bg-slate-600 text-white" pl='2' area={'footer'}>
                  <Footer />
                </GridItem>
              </GridItem>
              {/* </div> */}
          </Grid>
        </Providers>
      </body>
    </html>
  );
}
