"use client"

import TablePayment from "@/components/table/TablePayment"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Spinner } from '@chakra-ui/react';
import { useRouter } from "next/navigation"



const getPaymentList = async () => {
  const options = {
    headers: {
      'Cache-Control':'no-cache',
      'Authorization':'Bearer '+ localStorage.getItem('auth_token')
    }
  }

  const payment = await axios.get('http://localhost:8181/api/tailor_management/payment' , options)
  const data = payment.data

  return data.results
}

export default function Page(){

  const router = useRouter()
  const [payments , setPayments] = useState([])
  const [viewSpinner, setViewSpinner] = useState(true)

  const {register , watch} = useForm({
    defaultValues:{
      searchPayment:''
    }
  })

  useEffect(() => {
    
    getPaymentList()
      .then(res => {
        setPayments(res)

        setViewSpinner(false)
      })
      .catch(err => {

        console.error('Error on getting' , err)
        setViewSpinner(true)

        if(err.response.status == 401){

          localStorage.removeItem('auth_token')
          router.push('/')
          
        }
      })

  },[])

  return (
    viewSpinner ? <Spinner/> : <>
      
      <div className="mx-2 my-4">
          <Link className="bg-black text-white p-2" href={''} onClick={() => router.back()}>Go back</Link>
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