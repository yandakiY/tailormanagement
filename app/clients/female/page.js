import React from 'react'
import TableClient from '@/components/table/TableClient';
import Link from 'next/link';

const page = async () => {
    
    const api_url = await fetch("http://127.0.0.1:8181/api/tailor_management/client/sex/2", {cache:"no-cache"});
    const res = await api_url.json()


    return (
        <div className='flex flex-col items-center mt-8'>
            <div>
                <Link className="border text-white font-bold border-black bg-gray-900 hover:bg-gray-700 hover:transition-all px-4 py-1 mb-4" href={"/"}>Go home</Link>
            </div>    
            <div className='mt-4'>
                <input className='border border-black outline-none rounded pl-4 py-2 text-black font-bold' type="search" name="Search client" id="search" placeholder='Search client' />
            </div>
            <div className='flex justify-center mt-4'>
                <TableClient title={'List of clients Female'} clients={res.results} />
            </div>
        </div>
    )
}

export default page