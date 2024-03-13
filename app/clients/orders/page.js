import TableClient from '@/components/TableClient'
import TableClientOrder from '@/components/TableClientOrders';
import Link from 'next/link';
import React from 'react'

const OrdersClientList = async () => {

    const api_url = await fetch("http://127.0.0.1:8181/api/tailor_management/client", {cache:"no-cache"});
    const res = await api_url.json()

    return (
        <>
            <div className='flex flex-col items-center mt-8'>
                <div>
                    <Link className="border text-white font-bold border-black bg-gray-900 hover:bg-gray-700 hover:transition-all px-4 py-1 mb-4" href={"/"}>Go home</Link>
                </div>    
                <div className='mt-4'>
                    <input className='border border-black outline-none rounded pl-4 py-2 text-black font-bold' type="search" name="Search client" id="search" placeholder='Search client' />
                </div>
                <div className='flex justify-center mt-4'>
                    <div className='flex flex-col items-center'>
                        <h1 className='text-xl font=bold mb-4'>Orders of each client</h1>
                        <TableClientOrder title={'List of orders of each client'} clients={res.results} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrdersClientList