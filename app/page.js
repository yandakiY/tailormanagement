/* eslint-disable @next/next/no-async-client-component */

/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import PieClientSex from "@/components/charts/PieSex"
import AreaChartPlot from "@/components/charts/PieSex"
import axios from "axios"
import { useEffect, useState } from "react"
import { Spinner } from '@chakra-ui/react'
import LineCharts from "@/components/charts/LineChart"
import LineChartsPayment from "@/components/charts/LineChartPayment"


const getClientMaleCount = async () => {
  const clientMale = await axios.get('http://localhost:8181/api/tailor_management/client/sex/1')
  const data = await clientMale.data

  return { name:'Male' , count:data.results.length }// length of lists of client male
}

const getClientFemaleCount = async () => {
  const clientFemale = await axios.get('http://localhost:8181/api/tailor_management/client/sex/2')
  const data = await clientFemale.data

  return { name:'Female' , count:data.results.length } // length of lists of client male
}

const getTailorMaleCount = async () => {
  const tailorMale = await axios.get('http://localhost:8181/api/tailor_management/tailor/sex/1')
  const data = await tailorMale.data

  return { name:'Male' , count:data.results.length }// length of lists of client male
}

const getTailorFemaleCount = async () => {
  const tailorFemale = await axios.get('http://localhost:8181/api/tailor_management/tailor/sex/2')
  const data = await tailorFemale.data

  return { name:'Female' , count:data.results.length } // length of lists of client male
}

const getOrders = async () => {
  const orders = await axios.get('http://localhost:8181/api/tailor_management/orders')
  const data = await orders.data

  return data.results
}

const getPayment = async () => {
  const payments = await axios.get('http://localhost:8181/api/tailor_management/payment')
  const data = await payments.data

  return data.results
}

const convertPaymentWithDate = (payments) => {
  return payments.map(pay => {
    let date_pay = new Date(pay.date_payment)
    return {
      ...pay, date: date_pay.toLocaleDateString()
    }
  })
}

const regroupPayment = (payments) => {
  return payments.reduce((acc , pay) => {
    let date = pay.date
    acc[date] = (acc[date] || 0) + pay.price_payment

    return acc
  } , {})
}

const convertToDataPayment = (paymentsObj) => {
  // to array
  const arrayData = Object.entries(paymentsObj)
    .sort((a , b) => b[0] - a[0])
    .slice()
    .reverse()

  //
  let arrayToReturn = []
  // to data for chart
  arrayData.forEach(([date , amount]) => {
    arrayToReturn.push({
      date , amount
    })
  })

  return arrayToReturn
}

const convertOrdersWithDate = (orders) => {
  return orders.map(order => {
    const date_order = new Date(order.date_order)
    return {
      ...order, date: date_order.toLocaleDateString()
    }
  })
}

const regroupOrder = (orders) => {

  return orders.reduce((acc , order) => {
    let date = order.date
    acc[date] = (acc[date] || 0) + 1

    return acc
  },{})

}

const convertToData = orders => {
  // to array
  const arrayData = Object.entries(orders)
    .sort((a , b) => b[0] - a[0])
    .slice()
    .reverse()

  // console.log('array' , arrayData)

  // data to return
  let dataReturn = []
  // to data for chart
  arrayData.forEach(([date , count]) => {
    dataReturn.push({
      date , count
    })
  })

  return dataReturn
}

const getCountAll = (listsAll) => {
   // total client
  let totalClient = 0
  listsAll.every(e => e != undefined) && listsAll.map((val , i) => {
    totalClient += val.count
  })
  // console.log('total client', totalClient)
  return totalClient
}

const getCountAllPay = (listsAll) => {
   // total client
  let totalPay = 0
  listsAll.every(e => e != undefined) && listsAll.map((val , i) => {
    totalPay += val.amount
  })
  // console.log('total client', totalClient)
  return totalPay
}

export default function Home() {

  const [countClientMale , setCountClientMale] = useState()
  const [countClientFemale , setCountClientFemale] = useState()

  const [countTailorMale , setCountTailorMale] = useState()
  const [countTailorFemale , setCountTailorFemale] = useState()


  const [orders , setOrders] = useState([])
  const [payments , setPayments] = useState([])

  let dataCountClient = [countClientMale , countClientFemale] || []

  let dataCountTailor = [countTailorMale , countTailorFemale] || []
  let ordersData = convertToData(regroupOrder(convertOrdersWithDate(orders))) 
  let paymentData = convertToDataPayment(regroupPayment(convertPaymentWithDate(payments)))

  // console.log('male/female count', dataCountClient)
  // console.log('tailor', dataCountTailor)
  // console.log('orders data' , ordersData)
  // console.log('Payment data', paymentData)


  useEffect(() => {

    // client
    getClientMaleCount()
      .then(res => setCountClientMale(res))

    getClientFemaleCount()
      .then(res => setCountClientFemale(res))


    // tailor
    getTailorMaleCount()
      .then(res => setCountTailorMale(res))

    getTailorFemaleCount()
      .then(res => setCountTailorFemale(res))


    // orders
    getOrders()
      .then(res => setOrders(res))
    
    // payments
    getPayment()
      .then(res => setPayments(res))
  },[])

  return (
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
  );
}
