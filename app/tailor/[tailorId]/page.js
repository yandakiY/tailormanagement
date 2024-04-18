"use client"

import ProfileTailor from "@/components/profile/ProfileTailor"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Spinner } from '@chakra-ui/react';

import { useRouter } from "next/navigation"

const getTailorFromApiById = async (id) =>{

    const options = {
        headers:{
            'Cache-Control':'no-cache',
            'Authorization':'Bearer '+ localStorage.getItem('auth_token')
        }
    }

    const api_url = await axios.get(`http://127.0.0.1:8181/api/tailor_management/tailor/${id}` , options)
    const res = await api_url.data
    
    console.log("from api",res.results)
    return res.results
}

// const getOrderTailorFromApiById = async (id) =>{
//     const api_url = await axios.get(`http://127.0.0.1:8181/api/tailor_management/orders/tailor/${id}`)
//     const res = await api_url.data
    
//     console.log("orders tailor from api",res.results)
//     return res.results
// }


export default function Page({params}) {

    const {tailorId} = params
    console.log(tailorId)
    const router = useRouter()

    const [tailor , setTailor] = useState(null)
    const [orders, setOrders] = useState(null)
    const [viewSpinner , setViewSpinner] = useState(true)

    useEffect(() => {

        getTailorFromApiById(tailorId)
            .then(res => {
                setTailor(res)
                setViewSpinner(false)
            })
            .catch(err => {
            
                console.error(err)
                console.log('error')

                setViewSpinner(true)

                if(err.response.status == 401){

                    // remove token storage
                    localStorage.removeItem('auth_token')

                    // push to auth page
                    router.push('/')
                }    
            })

        console.log('Tailor', tailor)

        // getOrderTailorFromApiById(tailorId)
        //     .then(res => setOrders(res))
        //     .catch(err => console.error(err))

        // console.log('Orders', orders)

    } ,[tailorId])


    return (
        viewSpinner ? <Spinner /> : <div>

            {tailor != null ? 
                <div className="flex flex-col">
                    <div className="border bg-black w-fit cursor-pointer text-white my-8 p-2 rounded">
                        <Link href={''} onClick={() => router.back()}>Go back</Link>
                    </div>
                    <div className="flex flex-col justify-center items-center ">
                        <ProfileTailor tailor={tailor} />
                    </div>
                </div> : 
                <div>Loading...</div>
            }

        </div>
    )
}