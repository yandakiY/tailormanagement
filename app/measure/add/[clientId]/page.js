"use client"

import FormMeasureMen from "@/components/measure/FormMeasureMen"
import FormMeasureWomen from "@/components/measure/FormMeasureWomen"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect , useState } from "react"


const getClientById = async (id) => {

    const options ={
        headers:{
            'Authorization':'Bearer '+ localStorage.getItem('auth_token'),
            'Cache-COntrol':'no-cache'
        }
    }

    const api = await axios.get(`http://localhost:8181/api/tailor_management/client/${id}` , options)
    const res = await api.data

    console.log(res)

    return res.results
}


export default function Page({params}) {

    

    const {clientId} = params
    // console.log(clientId)
    const [client , setClient] = useState()
    const router = useRouter()


    useEffect(() => {
        getClientById(clientId)
            .then(res => setClient(res))
            .catch(err => {
                console.error(err)

                localStorage.removeItem('auth_token')

                router.push('/')
                    
            })


        console.log('client', client)

    },[clientId])

    return(
        // <>
            <div>
                <div className="m-4 bg-black text-white text-xl rounded p-1 w-fit">
                    <Link href={`/#`} onClick={() => router.back()}>Go back</Link>
                </div>
                <div className="border p-4 mx-4 my-4">

                    <h2 className="text-3xl font-bold text-center border-b-2">Add new measure : <br /> {client?.name} {client?.last_name} </h2>

                    {client?.sex.name == 'Male' ? <FormMeasureMen idClient={client?.id} /> : <FormMeasureWomen idClient={client?.id} /> }
                </div>
            </div>
        // </>
    )
}