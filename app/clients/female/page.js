"use client"

import React, { useEffect, useState } from 'react'
import TableClient from '@/components/table/TableClient';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import axios from "axios"
import { Spinner } from '@chakra-ui/react';
import NotAuthorize from '@/components/errors/not-authorize';




const getClientFemale = async () => {
      
    const options = {
        headers: {
            'Cache-Control': 'no-cache',
            'Authorization': 'Bearer ' + localStorage.getItem('auth_token')
        },
    }

    const api_url = await axios.get("http://127.0.0.1:8181/api/tailor_management/client/sex/2" ,options);
    const res = await api_url.data

    return res.results
}


export default function Page(){

    const [clients, setClients] = useState([])
    const [viewRes , setViewRes] = useState(false)
    const [error, setError] = useState(false)
    const router = useRouter()

    const {register, watch} = useForm({
        defaultValues:{
            searchClient:''
        }
    })
    
    useEffect(() => {

        
        
      
        getClientFemale()
            .then(clients => {
                
                console.log('role' , localStorage.getItem('role_user'))
                
                setViewRes(false)
                setClients(clients)
                setViewRes(true)
                

            })
            .catch(err => {
                console.error('Error' , err)

                if(!localStorage.getItem('auth_token') || !localStorage.getItem('username_user') || !localStorage.getItem('role_user')){
                    console.log('token expire')

                    // remove local storage token
                    localStorage.removeItem('auth_token')

                    // go to auth page
                    router.push('/')
                }else if(localStorage.getItem('role_user') == 'ROLE_USER' && err.response.status == 401){

                    setError(true)

                    // if (err.response.status == 401){
                    //     // setError(true)

                    //     console.log('token expire')

                    //     // remove local storage token
                    //     localStorage.removeItem('auth_token')

                    //     // go to auth page
                    //     router.push('/')

                    // }
                }else if(err.response.status == 401 && localStorage.getItem('role_user') == 'ROLE_ADMIN'){

                    console.log('token expire')

                    // remove local storage token
                    localStorage.removeItem('auth_token')

                    // go to auth page
                    router.push('/')
                }  
            })


    }, [])

    return (
        !viewRes ? 
        
            error ? <NotAuthorize /> : <Spinner /> : 
            <>
                <div>
                    <Link className="border text-white font-bold border-black bg-gray-900 hover:bg-gray-700 hover:transition-all px-4 py-1 mb-4" href={''} onClick={() => router.back()}>Go back</Link>
                </div> 
                <div className='flex flex-col items-center mt-8'>
                    <h2 className='text-3xl font-bold underline'>Lists of clients female :</h2>

                    <div className='mt-4'>
                        <input className='border border-black outline-none rounded pl-4 py-2 text-black font-bold' type="search" {...register('searchClient')} id="search" placeholder='Search client' />
                    </div>
                    <div className='flex justify-center mt-4'>
                        <TableClient title={'List of clients Female'} clients={clients} searchClient={watch('searchClient')} />
                    </div>
                </div>
            </>
    )
}

