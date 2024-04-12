// "use client"
import Footer from "@/components/Footer";
import SideNavBar from "@/components/navbar/SideNavBar";
import { Grid, GridItem } from "@chakra-ui/react";
import { Providers } from "../providers";
// import { useEffect, useState } from "react";
// import { jwtDecode } from "jwt-decode";
// import { useRouter } from "next/navigation";

// export const metadata = {
//     title: "Tailor Management - Home"
// }

export default function Layout({children}) {

    // const router = useRouter()
    // const [exp, setExp] = useState(0)
    // useEffect(() => {

        
    //     console.log('time', new Date().getTime()/1000)
    //     console.log('time exp to mill', jwtDecode(localStorage.getItem('auth_token')).exp)
    //     setExp(jwtDecode(localStorage.getItem('auth_token')).exp)
    // }, [])
    

    return (
        // new Date().getTime() / 1000 - exp < 600 ?
        <>
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
                        <GridItem grid={'true'} className="border  h-screen overflow-x-hidden" pl={'2'} mb={'2'} area={'main'}>
                            {children}
                        </GridItem>
                        <GridItem className="border flex flex-col items-center justify-center relative right-0 left-0 bottom-0 bg-slate-600 text-white" pl='2' area={'footer'}>
                            <Footer />
                        </GridItem>
                    </GridItem>
                </Grid>
            </Providers>
        </> 
    )
}