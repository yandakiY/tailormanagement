"use client"

import TableClient from '@/components/table/TableClient'
import TableClientOrder from '@/components/table/TableClientOrders';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';



const getOrdersClientList = async () => {

    const options = {
        headers:{
            'Cache-Control':'no-cache',
            'Authorization':'Bearer '+localStorage.getItem('auth_token') 
        }
    }

    const api_url = await axios.get("http://127.0.0.1:8181/api/tailor_management/client", options);
    const res = await api_url.data

    return res.results
}

export default function OrdersClientList() {

    const [clients, setClients] = useState([])
    const [viewRes , setViewRes] = useState(false)
    const router = useRouter()

    const {register, watch} = useForm({
        defaultValues:{
            searchClient:''
        }
    })

    useEffect(() => {

        
        
        getOrdersClientList()
            .then(clients => {
                setViewRes(false)
                setClients(clients)


                setViewRes(true)
            })
            .catch(err => {
                console.error('Error' , err)

                if(err.response.status == 401 || localStorage.getItem('role_user') == 'ROLE_USER'){

                    console.log('token expire')

                    // remove local storage token
                    localStorage.removeItem('auth_token')

                    // go to auth page
                    router.push('/')
                }  
            })
    },[])

    return (
        !viewRes ? <Spinner /> :  
        <>
            <div className='m-4'>
                <Link className="border text-white font-bold border-black bg-gray-900 hover:bg-gray-700 hover:transition-all px-4 py-1 mb-4" href={''} onClick={() => router.back()}>Go back</Link>
            </div>  
            <div className='flex flex-col items-center mt-8'>
                <h1 className='text-3xl font=bold mb-4 underline'>Orders of clients : </h1>
                  
                <div className='mt-4'>
                    <input className='border border-black outline-none rounded pl-4 py-2 text-black font-bold' type="search" {...register('searchClient')} id="search" placeholder='Search client' />
                </div>
                <div className='flex justify-center mt-4'>
                    <div className='flex flex-col items-center'>
                        <TableClientOrder title={'List of orders of each client'} clients={clients} searchClient={watch('searchClient')} />
                    </div>
                </div>
            </div>
        </>
    )
}

