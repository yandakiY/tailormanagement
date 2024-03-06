
/* eslint-disable react-hooks/exhaustive-deps */
// "use server"
import TableClient from "@/components/TableClient";
import TableOrders from "@/components/TableOrders";
import Link from "next/link";

export default async function Home() {

    const api_url = await fetch("http://127.0.0.1:8181/api/tailor_management/client", {cache:"no-store"});
    const res = await api_url.json()

    const api_url_orders = await fetch("http://127.0.0.1:8181/api/tailor_management/orders", {cache:"no-store"});
    const res_orders = await api_url_orders.json()

    console.log("orders",res_orders)

  return (
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
