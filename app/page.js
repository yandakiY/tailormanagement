
/* eslint-disable react-hooks/exhaustive-deps */
// "use server"
import TableOrders from "@/components/TableOrders";
import Link from "next/link";
export default async function Home() {

  // throw new Error("error 404")

    const api_url = await fetch("http://127.0.0.1:8181/api/tailor_management/client", {cache:"no-store"});
    const res = await api_url.json()

    const api_url_orders = await fetch("http://127.0.0.1:8181/api/tailor_management/orders", {cache:"no-store"});
    const res_orders = await api_url_orders.json()

    console.log("orders",res_orders)

  return (
    // <Grid
    //   className="h-screen m-2"
    //   templateAreas={`
    //       "nav main"
    //       "nav footer"
    //   `}
    //   gridTemplateRows={'90vh auto'}
    //   gridTemplateColumns={'288px auto'}
    //   gap='1'
    //   color='blackAlpha.700'
    //   fontWeight='bold'
    // >
    //   <GridItem className="border fixed top-0 left-0 h-screen w-72 m-2" pl='2' area={'nav'}>
    //     Nav
    //   </GridItem>

    //   {/* <div> */}
    //     <GridItem className="border border-red-700 h-screen overflow-x-hidden" pl={'2'} area={'main'}>
          
    //       <main className={`flex flex-col items-center justify-between p-24`}>
    //         <div className="underline text-3xl pb-4">
    //           Welcome to Tailor Management
    //         </div>
    //         <div className="border flex justify-between gap-x-4 mb-4 p-4">
    //           <div className="p-2 border rounded cursor-pointer bg-black text-white font-bold">
    //             <Link href={'/clients'}>View Clients Lists</Link>
    //           </div>
    //           <div className="p-2 border rounded cursor-pointer bg-black text-white font-bold">
    //             <Link href={'/tailors'}>View Tailors Lists</Link>
    //           </div>
    //         </div>
        
            
    //         <div className="font-bold mb-4">Orders Lists :</div>

    //         <div className="border p-2 w-8/12">
    //           <TableOrders orders={res_orders.results} />
    //         </div>
    //       </main>
    //       {/* <div>
    //         Main
    //       </div> */}
    //     </GridItem>
    //     <GridItem className="border border-blue-600 relative right-0 left-0 bottom-0" pl='2' area={'footer'}>
    //       Footer
    //     </GridItem>
    //   {/* </div> */}
    // </Grid>
    <main className={`flex flex-col items-center justify-between p-24`}>
      <div className="underline text-3xl pb-4">
        Welcome to Tailor Management
      </div>
      <div className="border flex justify-between gap-x-4 mb-4 p-4">
        <div className="p-2 border rounded cursor-pointer bg-black text-white font-bold">
          <Link href={'/clients'}>View Clients Lists</Link>
        </div>
        <div className="p-2 border rounded cursor-pointer bg-black text-white font-bold">
          <Link href={'/tailors'}>View Tailors Lists</Link>
        </div>
      </div>
  
      
      <div className="font-bold mb-4">Orders Lists :</div>

      <div className="border p-2 w-8/12">
        <TableOrders orders={res_orders.results} />
      </div>
    </main>
  );
}
