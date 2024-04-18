/* eslint-disable @next/next/no-async-client-component */
"use client"

import OrderDetail from '@/components/orders/OrderDetail'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const getOrderById = async (id) => {

    const options = {
         headers: {
            'Cache-Control': 'no-cache',
            'Authorization':'Bearer '+localStorage.getItem('auth_token')
        }
    }

    const order = await axios.get(`http://localhost:8181/api/tailor_management/orders/${id}` , options)
    const data = order.data

    return data
}

export default function DetailsOrders({params}){
    // throw new Error()
    let {orderId} = params

    const [order , setOrder] = useState(null)
    const [viewSpinner, setViewSpinner] = useState(true)
    const router = useRouter()

    useEffect(() => {

        getOrderById(orderId)
            .then(res => {
                
                setOrder(res)
                setViewSpinner(false)
            })
            .catch(err => {
                console.error(err)

                if(err.response.status == 401){

                    localStorage.removeItem('auth_token')

                    router.push('/')
                }    
            })

    } , [])
  
    return (
        <>  
            <div className='mx-2 my-4'>
                <div className='flex flex-row mb-2'>
                    <div className='bg-black text-white p-2 rounded cursor-pointer'>
                        <Link href={'/orders'}>Go back</Link>
                    </div>
                </div>

                <div>
                    <OrderDetail order={order?.results} />
                </div>
            </div>
        </>
    )
}
