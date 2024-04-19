"use client"

import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

const OrderDetail = ({order}) => {

    const param1Ref = useRef(null);
    const [role, setRole] = useState('')

    useEffect(() => {

        setRole(localStorage.getItem('role_user'))

    },[])

  return (
    <div className='border p-4 mb-4'>
        {/* Steps  */}
        {/* <div className='border p-4'>
            <div className='text-3xl font-bold'>Steps</div>
        </div> */}

        <div className='flex flex-row justify-between'>
                
            <div className='m-2'>
                {/* <div className='text-xl font-bold'>Status</div> */}
                {order?.status_order === "New" ? 
                    <div title="New order, no payment made" className="border p-2 bg-emerald-800 text-white font-bold max-w-fit">New</div> 
                    : order?.status_order === "Done" ? <div title='All payment made' className='border p-2 bg-slate-600 text-white font-bold max-w-fit'>Done</div> : <div className='border p-2 bg-red-800 text-white font-bold max-w-fit'>Not Done</div> }
            </div>

            {order?.status_order == "New" || order?.status_order == "Not Done" ? 
                (role == 'ROLE_USER' && <div className='border p-2 m-2 bg-sky-800 text-white font-bold max-w-fit'>
                    <Link ref={param1Ref} as={`/payment/making/${order?.id}`} href={`/payment/making/${order?.id}`}>    
                        Make payment 
                    </Link>
                </div> ): ""
            }
        </div>

        {/* Details Order  */}
        <div className='border flex flex-row justify-between text-xl'>
            {/* Description */}
            <div className='flex flex-col items-center border p-2 min-w-96'>
                <div className='text-lg'>
                    Description :
                </div>
                <div className='text-base'>
                    {order?.description_order}
                </div>
            </div>

            {/* Date */}
            <div className='flex flex-col items-center border p-2 min-w-96'>
                <div className='text-lg'>
                    Date :
                </div>
                <div>
                    {new Date(order?.date_order).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                    })}
                </div>
            </div>
        </div>

        {/* Details Price Order  */}
        <div className='border flex flex-row justify-between text-xl'>
            {/* Description */}
            <div className='flex flex-col items-center border p-2 min-w-96'>
                <div className='text-lg'>
                    Price :
                </div>
                <div className='text-base'>
                    {order?.price_order} FCFA
                </div>
            </div>

            {/* */}
            <div className='flex flex-col items-center border p-2 min-w-96'>
                <div className='text-lg'>
                    Volume :
                </div>
                <div>
                    {order?.volume_order}
                </div>
            </div>
        </div>
        <div className='border flex flex-row justify-between text-xl'>
            <div className='flex flex-col items-center border p-2 min-w-full'>
                <div className='text-lg'>
                    Total :
                </div>
                <div className='text-base'>
                    {order?.price_order * order?.volume_order} FCFA
                </div>
            </div>
        </div>
        <div className='border flex flex-row justify-between text-xl'>
            <div className='flex flex-col items-center border p-2 min-w-full'>
                <div className='text-lg'>
                    To pay :
                </div>
                <div className='text-base'>
                    {order?.to_pay} FCFA
                </div>
            </div>
        </div>

        {/* Details order - tailor */}
        <div className='border flex flex-row justify-between text-xl'>
            <div className='flex flex-col items-center border p-2 min-w-full'>
                <div className='text-lg'>
                    Tailor :
                </div>
                <div className='text-base'>
                    {order?.tailor.name} {order?.tailor.last_name} ({order?.tailor.contacts})
                </div>
            </div>
        </div>

    </div>
  )
}

export default OrderDetail