'use client'

import Profile from "@/components/ProfileUser"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const getUserById = async (id) => {
    const options = {
        headers:{
            'Cache-Control':'no-cache',
            'Authorization':'Bearer '+localStorage.getItem('auth_token') 
        }
    }
    const client = await axios.get(`http://127.0.0.1:8181/api/tailor_management/users/id/${id}`, options)
    const data = await client.data

    return data.results

}


export default function Page({params}) {


    const {userId} = params
    const [user, setUser] = useState(null)
    const router = useRouter()

    useEffect(() => {

        getUserById(userId)
            .then(res => setUser(res))
            .catch(err => {
                console.error('error on get client' , err)
                
                if(err.response.status == 401){
                    // error 401 => not authorized
                    console.log('Auth token expire')
                    // delete localStorage
                    localStorage.removeItem('auth_token')
                    // go to auth page
                    router.push('/')
                }

                if(err.response.status == 404){
                    router.push('/users')

                    return 
                }
            })

    }, [])

    return(

        <>
            <div className="flex flex-row mx-4 my-6">
                <Link className="border bg-black text-white rounded px-4 py-1 mb-4" href={""} onClick={() => router.back()}>Go back</Link>
            </div>
            <div className="flex flex-col items-center md:text-2xl text-md">

                <div className="underline mb-4">
                    Profile User : {userId}
                </div>
                <div className="border p-4 rounded flex flex-col gap-4">
                    {/* <ProfileClient client={client} /> */}
                    <Profile user={user} />
                    {/* <div className=" p-4">
                        {client?.sex.name === "Female" ? <MeasureClientWomen client_id={clientId} measures_clients_women={measure} /> : <MeasureClientMen clientId={clientId} measures_clients_men={measure} />}
                    </div> */}
                </div>
            </div>
        </>
    )
}
