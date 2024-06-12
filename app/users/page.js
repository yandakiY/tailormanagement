"use client"

import TableUsers from "@/components/table/TableUsers";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


const getUsersList = async () => {
    const options = {
        headers: {
            'Cache-Control': 'no-cache',
            'Authorization': 'Bearer ' + localStorage.getItem('auth_token')
        },
    }

    const api_url = await axios.get("http://127.0.0.1:8181/api/tailor_management/users", options);
    const res = await api_url.data

    return res.status == 'Success' ? res.results : []
}

export default function Page() {


    const router = useRouter()
    const [users, setUsers] = useState([])
    const [role, setRole] = useState('')
    const [openSpinner, setOpenSpinner] = useState(true)
    const {register , watch} = useForm({
        defaultValues:{
            searchClient:''
        }
    })

    // console.log(watch('searchClient'))

    useEffect(() => {     

        setRole(localStorage.getItem('role_user'))   

        getUsersList()
            .then(res => {
                
                setOpenSpinner(false)
                setUsers(res)

            })
            .catch(err => {
                console.error(err)
                
                console.log('Auth token expire')
                // delete localStorage
                localStorage.removeItem('auth_token')
                // go to auth page
                router.push('/')

            })

        
        users.forEach(client => {
            router.prefetch(`users/${client.id}`)
        })

    },[])

    return (
        <>
            <div className="mt-6">
                <Link className="p-2 bg-black rounded text-white font-bold" href={''} onClick={() => router.back()}>Go back</Link>
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
                    <TableUsers users={users} searchClient={watch('searchClient')} />
                </div>
            </div>
        </>
    )
}
