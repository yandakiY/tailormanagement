"use client"

import TablePayment from "@/components/table/TablePayment"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"



const getPaymentList = async () => {
  const options = {
    headers: {
      'Cache-Control':'no-cache'
    }
  }
  const payment = await axios.get('http://localhost:8181/api/tailor_management/payment' , options)
  const data = payment.data

  return data.results
}

export default function Page(){

  const [payments , setPayments] = useState([])

  const {register , watch} = useForm({
    defaultValues:{
      searchPayment:''
    }
  })

  useEffect(() => {
    getPaymentList()
      .then(res => setPayments(res))
      .catch(err => console.error('Error on getting' , err))

  },[])

  return (
    <>
      
      <div className="mx-2 my-4">
          <Link className="bg-black text-white p-2" href={'/'}>Go home</Link>
      </div>
      <div className="flex flex-col items-center mb-4">
        <div> 
          <h3 className="text-3xl underline ">Payments lists :</h3>
        </div>
        <div className="mt-2">
          <input type="search" className="border rounded p-2 ml-2" {...register('searchPayment')} placeholder="Search a payment" />
        </div>
      </div>
      <div>
        <TablePayment searchPayment={watch('searchPayment')} payments={payments} />
      </div>
    </>
  )
}