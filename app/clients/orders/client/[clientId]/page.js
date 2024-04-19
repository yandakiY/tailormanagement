"use client"

import OrderDetail from '@/components/orders/OrderDetail'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Spinner } from '@chakra-ui/react';


const getOrderByClient = async (id) => {

    const options = {
        headers: {
            'Cache-Control':'no-cache',
            'Authorization':'Bearer '+localStorage.getItem('auth_token')
        }
    }

    const api_url = await axios.get(`http://127.0.0.1:8181/api/tailor_management/orders/client/${id}`, options)
    const data = await api_url.data
    const results = data.status === "Success" ? data.results : []

    return results
}

const getClientById = async (id) => {

    const options = {
        headers: {
            'Cache-Control':'no-cache',
            'Authorization':'Bearer '+localStorage.getItem('auth_token')
        }
    }

    const api_url = await axios.get(`http://127.0.0.1:8181/api/tailor_management/client/${id}`, options)
    const data = await api_url.data
    const results = data.status === "Success" ? data.results : {}

    return results
}


export default function ViewOrders({params}){
    
    const {clientId} = params

    const router = useRouter()

    const [client , setClient] = useState([])
    const [order, setOrder] = useState([])

    const [viewSpinner, setViewSpinner] = useState(true)

    useEffect(() => {
        
        getClientById(clientId)
            .then(res => {
                setClient(res)
                setViewSpinner(false)
            })
            .catch(err => {
                
                console.error(err)
                setViewSpinner(true)

                localStorage.removeItem('auth_token')

                router.push('/')

            })

        getOrderByClient(clientId)
            .then(res => {
                setOrder(res)
                setViewSpinner(false)
            })
            .catch(err => {
                
                console.error(err)
                setViewSpinner(true)

                localStorage.removeItem('auth_token')

                router.push('/')

            })

    },[])

    // const api_url = await fetch(`http://127.0.0.1:8181/api/tailor_management/orders/client/${clientId}`, {cache:'no-cache'})
    // const data = await api_url.json()
    // const results = data.status === "Success" ? data.results : []

    // const api_url_client = await fetch(`http://127.0.0.1:8181/api/tailor_management/client/${clientId}`, {cache:'no-cache'})
    // const data_client = await api_url_client.json()
    // const client = data_client.status === "Success" ? data_client.results : {}

    // console.log("Results",results)
    // console.log("Client id", clientId)
    // }
    
    // await getOrderForClient(clientId).then(res => setOrders(res.results)).catch(err => console.error(err))

    return (
        viewSpinner ? <Spinner /> :  <div>
            {order.length > 0 ? 
                <div className='flex flex-col'>
                    <div className='text-xl m-2 border-b-2 max-w-max'>
                        <Link href={''} onClick={() => router.back()}>Go back</Link>
                    </div>
                    <div className='border p-2 m-2'>
                        <h1 className='text-2xl font-bold text-center'>{order.length > 1 ? "Orders" : "Order"} of : {client.name} {client.last_name} </h1>
                        <div>Numbers : {order.length}</div>
                        <div className='flex flex-col'>
                            {order.map(order => <OrderDetail order={order} key={order.id} />)}
                        </div>
                    </div>
                </div>
                : 
                <div className='overflow-y-hidden h-screen flex flex-col justify-center items-center text-3xl font-bold'>
                    <div>No orders for this clients in our database</div>
                    <div className='text-xl mt-7'>
                        <Link href={'/clients/orders'} className='border-b-2'>Go back</Link>
                    </div>
                </div>
            }
        </div>
    )
}

