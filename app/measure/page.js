"use client"

import TableClient from "@/components/table/TableClient";
import TableClientMeasure from "@/components/table/TableClientMeasure";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


const getClientList = async () => {

    const options = {
        headers:{
            'Authorization':'Bearer '+ localStorage.getItem('auth_token'),
            'Cache-Control':'no-cache'
        }
    }

    const api_url = await axios.get("http://127.0.0.1:8181/api/tailor_management/client", options);
    const res = await api_url.data

    return res.status == 'Success' ? res.results : []
}

export default function Page() {
    
    const router = useRouter()
    const [clients, setClients] = useState([])
    const {register , watch} = useForm({
        defaultValues:{
            searchClient:''
        }
    })

    console.log(watch('searchClient'))

    useEffect(() => {
        getClientList()
            .then(res => setClients(res))
            .catch(err => {
                console.error(err)

                localStorage.removeItem('auth_token')

                router.push('/')    
            })
    },[])


    return (
        <>
            <div>
                {/* Lists of customer with possibility of add clients and add new measure for a customer */}
            </div>
            <div className='mx-4 my-6 flex flex-row justify-between'>
                <div className="">
                    <Link className="border rounded text-white font-bold border-black bg-gray-900 hover:bg-gray-700 hover:transition-all px-4 py-1 mb-4" href={""} onClick={() => router.back()}>Go back</Link>
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
                        ame="Search client"
                        id="search" 
                        placeholder='Search client by name , id or last name'
                        {...register('searchClient')}
                    />
                </div>
                <div className='flex justify-center mt-4'>
                    <TableClientMeasure clients={clients} title={''} searchClient={watch('searchClient')} />
                </div>
            </div>
        </>
    )
}