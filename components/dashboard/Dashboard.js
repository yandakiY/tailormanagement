import LineCharts from "../charts/LineChart";
import LineChartsPayment from "../charts/LineChartPayment";
import PieClientSex from "../charts/PieSex";

export default function Dashboard({getCountAll, getCountAllPay, dataCountClient, dataCountTailor, ordersData, paymentData}) {

    return (
        <>
            <main className={`flex flex-col items-center justify-between mx-2 my-3`}>
                <div className="underline text-3xl pb-4">
                    Welcome to Tailor Management
                </div>

                <div className="p-2 text-2xl grid grid-cols-4 gap-x-2 w-full font-bold">
                    <div className="flex flex-col items-center border p-2">
                        <div>Clients :</div>
                        <div className="text-xl mt-3">{getCountAll(dataCountClient)}</div>
                        </div>
                        <div className="flex flex-col items-center border p-2">
                        <div>Tailors :</div>
                        <div className="text-xl mt-3">{getCountAll(dataCountTailor)}</div>
                        </div>
                        <div className="flex flex-col items-center border p-2">
                        <div>Orders :</div>
                        <div className="text-xl mt-3">{getCountAll(ordersData)}</div>
                        </div>
                        <div className="flex flex-col items-center border p-2">
                        <div>All Payments :</div>
                        <div className="text-xl mt-3">{getCountAllPay(paymentData)} FCFA</div>
                    </div>
                </div>

                <div className="mx-2 my-2 p-2 w-full">
                    <div className="grid grid-cols-2 gap-2 h-screen">
                        <div className="border text-center p-2 flex flex-col justify-evenly items-center h-[50vh]">
                            <h3 className="font-bold text-lg">
                            {/* Payment price by day */}
                            Order by day
                            </h3>
                            {ordersData && <LineCharts data={ordersData} />}
                        </div>
                        <div className="border text-center p-2 flex flex-col justify-evenly items-center h-[50vh]">
                            <h3>
                            Payment price by day
                            </h3>
                            {paymentData && <LineChartsPayment data={paymentData} />}
                        </div>
                        <div className="border text-center p-2 flex flex-col justify-evenly items-center h-[50vh]">
                            <h3 className="font-bold text-lg">Repartition client by sex</h3>
                            {dataCountClient && <PieClientSex data={dataCountClient} />}
                        </div>
                        <div className="border text-center p-2 flex flex-col justify-evenly items-center h-[50vh]">
                            <h3 className="font-bold text-lg">Repartition tailor by sex</h3>
                            {dataCountTailor && <PieClientSex data={dataCountTailor} />}
                        </div> 
                    </div>
                </div>
            </main>
        </>
    )
}