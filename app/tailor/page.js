"use client"

import TableTailor from "@/components/table/TableTailor";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const getTailorFromApi = async () => {

    const api_url = await axios.get("http://127.0.0.1:8181/api/tailor_management/tailor", {cache:"no-cache"});
    const res = await api_url.data

    return res.status == 'Success' ? res.results : []

}


export default function Page() {

    const [tailors, setTailors] = useState([])

    useEffect(() =>{

        getTailorFromApi()
            .then(res => setTailors(res))
            .catch(err => console.error(err))
    }, [])
    return (
        <div>
            <div className='flex flex-col items-center mt-8'>
            <div>
                <Link className="border text-white font-bold border-black bg-gray-900 hover:bg-gray-700 hover:transition-all px-4 py-1 mb-4" href={"/"}>Go home</Link>
                </div>    
                <div className='mt-4'>
                    <input className='border border-black outline-none rounded pl-4 py-2 text-black font-bold' type="search" name="Search client" id="search" placeholder='Search client' />
                </div>
                <div className='flex justify-center mt-4'>
                    <TableTailor lists={tailors} title={"List of tailors"} />
                </div>
            </div>
        </div>
    )
}