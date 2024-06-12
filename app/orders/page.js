"use client"

import TableOrders from "@/components/table/TableOrders";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Spinner } from '@chakra-ui/react';


const getOrders = async () => {
  const options = {
    headers:{
      'Cache-Control':'no-cache',
      'Authorization':'Bearer '+ localStorage.getItem('auth_token')
    }
  }
  const orders = await axios.get('http://localhost:8181/api/tailor_management/orders' , options)
  const data = await orders.data

  console.log(data)
  return data
}

export default function OrdersList(){

  const router = useRouter()
  const [viewSpinner , setViewSpinner] = useState(true)
  const [orders, setOrders] = useState([])
  const {register , watch} = useForm({
    defaultValues:{
      searchOrder:''
    }
  })

  useEffect(() => {

    getOrders()
      .then(order => {
        setOrders(order)
        setViewSpinner(false)
      })
      .catch(err =>{
        console.error(err)

        // if(localStorage.getItem('role_user') == 'ROLE_USER'){

        // }
        // else 
        if(err.response.status == 401 && localStorage.getItem('role_user') == 'ROLE_ADMIN'){

          localStorage.removeItem('auth_token')

          router.push('/')
        }  
      })

    console.log('orders', orders?.results)

  },[])

  return (
    viewSpinner ? <Spinner /> : <>
      <div className="mx-2 my-4">
        <div className="flex flex-row">
          <div className="bg-black text-white font-bold p-2 rounded w-fit">
            <Link href={'/'}>Go home</Link>
          </div>
        </div>
        <div className="flex flex-row justify-center mb-4">
          <input type='search' {...register('searchOrder')} placeholder='Search order by id' className='p-2 border rounded focus:outline-none' />
        </div>
        <div className="flex flex-row justify-center">
          <h2 className="text-3xl font-bold border-b-2">
            Orders List
          </h2>
        </div>
      </div>
      
      <div>
        <TableOrders searchOrder={watch('searchOrder')} orders={orders?.results} />
      </div>

    </>
  )
}