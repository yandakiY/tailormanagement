import { useEffect, useState } from "react";
import LineCharts from "../charts/LineChart";
import LineChartsPayment from "../charts/LineChartPayment";
import PieClientSex from "../charts/PieSex";
import Link from "next/link";

export default function DashboardUser({getCountAll, getCountAllPay, dataCountClient, dataCountTailor, ordersData, paymentData , username}) {

    const [role, setRole] = useState('')

    useEffect(() => {
      setRole(localStorage.getItem('role_user'))
      console.log('username',localStorage.getItem('username_user'))
    }, [])
    
    return (
        <>
            <main className={`flex flex-col items-center justify-between mx-2 my-3`}>
                <div className="underline text-3xl pb-4">
                    Welcome to Tailor Management : {username}
                </div>

                <div className="p-2 text-2xl grid grid-cols-2 gap-x-2 w-full font-bold">
                        {/* <div className="flex flex-col items-center border p-2">
                            <div>Clients :</div>
                            <div className="text-xl mt-3">{getCountAll(dataCountClient)}</div>
                        </div>
                        <div className="flex flex-col items-center border p-2">
                            <div>Tailors :</div>
                            <div className="text-xl mt-3">{getCountAll(dataCountTailor)}</div>
                        </div> */}
                        <div className="flex flex-col items-center border p-2">
                            <div>Orders :</div>
                            <div className="text-xl mt-3">{getCountAll(ordersData)}</div>
                        </div>
                        <div className="flex flex-col items-center border p-2">
                            <div>All Payments :</div>
                            <div className="text-xl mt-3">{getCountAllPay(paymentData)} FCFA</div>
                        </div>
                </div>
                
                <div className="p-2 text-2xl grid grid-cols-1 gap-x-2 w-full font-bold">
                        {/* <div className="flex flex-col items-center border p-2">
                            <div>Clients :</div>
                            <div className="text-xl mt-3">{getCountAll(dataCountClient)}</div>
                        </div>
                        <div className="flex flex-col items-center border p-2">
                            <div>Tailors :</div>
                            <div className="text-xl mt-3">{getCountAll(dataCountTailor)}</div>
                        </div> */}
                    <div className="flex flex-col items-center border px-2 py-6">
                        <div>View profile :</div>
                        <Link href={'/profile'} className="text-blue-900 underline text-base">Click here</Link>
                    </div>
                </div>
            </main>
        </>
    )
}