"use client"

import TableTailor from "@/components/table/TableTailor";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Spinner } from '@chakra-ui/react';

const getTailorFromApi = async () => {

    const options = {
        headers:{
            'Cache-Control':'no-cache',
            'Authorization':'Bearer '+ localStorage.getItem('auth_token')
        }
    }

    const api_url = await axios.get("http://127.0.0.1:8181/api/tailor_management/tailor", options);
    const res = await api_url.data

    return res.status == 'Success' ? res.results : []

}


export default function Page() {

    const [tailors, setTailors] = useState([])
    const router = useRouter()
    const [viewSpinner, setViewSpinner] = useState(true)
    const [role, setRole] = useState('')

    const {register, watch} = useForm({
        defaultValues:{
            searchTailor:''
        }
    })
    

    useEffect(() =>{

        setRole(localStorage.getItem('role_user'))

        getTailorFromApi()
            .then(res => {

                setViewSpinner(false)
                setTailors(res)
                
            })
            .catch(err => {
                
                console.error(err)
                setViewSpinner(true)

                if(err.response.status == 401){
                    // remove token
                    localStorage.removeItem('auth_token')

                    // push to auth page
                    router.push('/')
                }

            })

    }, [])


    return (
        viewSpinner ? <Spinner /> : <div>
            <div className="flex flex-row items-center justify-between mx-4 my-6">
                <div className="">
                    <Link className="border rounded text-white font-bold border-black bg-gray-900 hover:bg-gray-700 hover:transition-all px-4 py-1 mb-4" href={""} onClick={() => router.back()}>Go back</Link>
                </div>
                {role == 'ROLE_USER' && <div className="">
                    <Link className="border rounded text-white font-bold border-black bg-gray-900 hover:bg-gray-700 hover:transition-all px-4 py-1 mb-4" href={"/tailor/add"}>Add new tailor</Link>
                </div>}
            </div>
            <div className='flex flex-col items-center mt-8'>    
                <div className='mt-4'>
                    <input className='border border-black outline-none rounded pl-4 py-2 text-black font-bold' type="search" {...register('searchTailor')} id="search" placeholder='Search client' />
                </div>
                <div className='flex justify-center mt-4'>
                    <TableTailor lists={tailors} title={"List of tailors"} searchTailor={watch('searchTailor')} />
                </div>
            </div>
        </div>
    )
}