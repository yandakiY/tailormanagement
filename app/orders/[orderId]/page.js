/* eslint-disable @next/next/no-async-client-component */
"use client"

import OrderDetail from '@/components/orders/OrderDetail'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const getOrderById = async (id) => {

    const options = {
         headers: {
            'Cache-Control': 'no-cache',
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


    useEffect(() => {

        getOrderById(orderId)
            .then(res => setOrder(res))
            .catch(err => console.error(err))

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
