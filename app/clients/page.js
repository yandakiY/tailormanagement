"use client"

import TableClient from '@/components/table/TableClient';
import axios from 'axios';
import Link from 'next/link';
import { Router } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Spinner } from '@chakra-ui/react';

const getClientList = async () => {
    const options = {
        headers: {
            'Cache-Control': 'no-cache',
            'Authorization': 'Bearer ' + localStorage.getItem('auth_token')
        },
    }

    const api_url = await axios.get("http://127.0.0.1:8181/api/tailor_management/client", options);
    const res = await api_url.data

    return res.status == 'Success' ? res.results : []
}

export default function ListClients(){

    const router = useRouter()
    const [clients, setClients] = useState([])
    const [openSpinner, setOpenSpinner] = useState(true)
    const {register , watch} = useForm({
        defaultValues:{
            searchClient:''
        }
    })

    // console.log(watch('searchClient'))

    useEffect(() => {        

        getClientList()
            .then(res => {
                
                setOpenSpinner(false)
                setClients(res)

            })
            .catch(err => {
                console.error(err)
                
                console.log('Auth token expire')
                // delete localStorage
                localStorage.removeItem('auth_token')
                // go to auth page
                router.push('/')

            })

        
        clients.forEach(client => {
            router.prefetch(`clients/${client.id}`)
        })

    },[])

    return (
        openSpinner ?
        <Spinner />
        :
        <>
            <div className='mx-4 my-6 flex flex-row justify-between'>
                <div className="">
                    <Link className="border rounded text-white font-bold border-black bg-gray-900 hover:bg-gray-700 hover:transition-all px-4 py-1 mb-4" href={"/"}>Go home</Link>
                </div>

                <div className="">
                    <Link className="border rounded text-white font-bold border-black bg-gray-900 hover:bg-gray-700 hover:transition-all px-4 py-1 mb-4" href={"/clients/add"}>Add new client</Link>
                </div>
            </div>
            <div className='flex flex-col items-center mt-8'>  
                <div className='mt-4'>
                    <input 
                        className='border border-black outline-none rounded pl-4 py-2 text-black font-bold' 
                        type="search" 
                        name="Search client" 
                        id="search" 
                        placeholder='Search client by name , id or last name' 
                        {...register('searchClient')}
                    />
                </div>
                <div className='flex justify-center mt-4'>
                    <TableClient clients={clients} searchClient={watch('searchClient')} />
                </div>
            </div>
        </>
    )
}