// import { useEffect } from "react"
"use client"

import MeasureClientMen from "@/components/MeasureClientMen"
import MeasureClientWomen from "@/components/MeasureClientWomen"
import ProfileClient from "@/components/ProfileClient"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const getClientById = async (id) => {
    const options = {
        headers:{
            'Cache-Control':'no-cache',
            'Authorization':'Bearer '+localStorage.getItem('auth_token') 
        }
    }
    const client = await axios.get(`http://127.0.0.1:8181/api/tailor_management/client/${id}`, options)
    const data = await client.data

    return data.results

}

const getMeasureById = async (id) => {
    const options = {
        headers:{
            'Cache-Control':'no-cache' ,
            'Authorization':'Bearer '+localStorage.getItem('auth_token') 
        }
    }

    let measure = null
    let data = null

    // get client and check sex
    const client = await axios.get(`http://127.0.0.1:8181/api/tailor_management/client/${id}`, options)
    const data_client = await client.data.results

    if (data_client.sex.name == 'Male'){
        measure = await axios.get(`http://127.0.0.1:8181/api/tailor_management/measure_men/client/${id}` , options)
        data = measure.data
    }else{
        measure = await axios.get(`http://127.0.0.1:8181/api/tailor_management/measure_women/client/${id}` , options)
        data = measure.data
    }

    return data.results

}


export default function ViewClient({params}) {

    const router = useRouter()
    const [client, setclient] = useState()
    const [measure , setMeasure] = useState()
    const {clientId} = params


    useEffect(() => {

        getClientById(clientId)
            .then(res => setclient(res))
            .catch(err => {
                console.error('error on get client' , err)
                
                console.log('Auth token expire')
                // delete localStorage
                localStorage.removeItem('auth_token')
                // go to auth page
                router.push('/')
            })

        getMeasureById(clientId)
            .then(res => setMeasure(res))
            .catch(err => {
                console.error('error on getting measure' , err)
                
                console.log('Auth token expire')
                // delete localStorage
                localStorage.removeItem('auth_token')
                // go to auth page
                router.push('/')
            })

        router.prefetch(`measure/add/${clientId}`)

    }, [])

    return (
        <>
            <div className="flex flex-row mx-4 my-6">
                <Link className="border bg-black text-white rounded px-4 py-1 mb-4" href={"/clients"}>Go back</Link>
            </div>
            <div className="flex flex-col items-center md:text-2xl text-md">

                <div className="underline mb-4">
                    Profile Client : {clientId}
                </div>
                <div className="border p-4 rounded flex flex-col gap-4">
                    <ProfileClient client={client} />
                    <div className=" p-4">
                        {client?.sex.name === "Female" ? <MeasureClientWomen client_id={clientId} measures_clients_women={measure} /> : <MeasureClientMen clientId={clientId} measures_clients_men={measure} />}
                    </div>
                </div>
            </div>
        </>

    );    
}