import { useEffect, useState } from "react";
import LineCharts from "../charts/LineChart";
import LineChartsPayment from "../charts/LineChartPayment";
import PieClientSex from "../charts/PieSex";
import DashboardAdmin from "./DashboardAdmin";
import DashboardUser from "./DashBoardUser";

export default function Dashboard({getCountAll, getCountAllPay, dataCountClient, dataCountTailor, ordersData, paymentData , username}) {

    const [role, setRole] = useState('')

    useEffect(() => {
      setRole(localStorage.getItem('role_user'))
    }, [])
    
    return (
        role == 'ROLE_USER' ? 
            <DashboardUser username={username} getCountAll={getCountAll} getCountAllPay={getCountAllPay} dataCountClient={dataCountClient} dataCountTailor={dataCountTailor} ordersData={ordersData} paymentData={paymentData} /> :
        role == 'ROLE_ADMIN' ? <>
            <DashboardAdmin username={username} getCountAll={getCountAll} getCountAllPay={getCountAllPay} dataCountClient={dataCountClient} dataCountTailor={dataCountTailor} ordersData={ordersData} paymentData={paymentData} />
        </> :
            'ROLE_MODERATOR'
    )
}