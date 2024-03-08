
import OrderDetail from '@/components/orders/OrderDetail'
import Link from 'next/link'
import React from 'react'

export default async function ViewOrders({params}){
    
    const {clientId} = params

    const api_url = await fetch(`http://127.0.0.1:8181/api/tailor_management/orders/client/${clientId}`, {cache:'no-store'})
    const data = await api_url.json()
    const results = data.status === "Success" ? data.results : []

    const api_url_client = await fetch(`http://127.0.0.1:8181/api/tailor_management/client/${clientId}`, {cache:'no-store'})
    const data_client = await api_url_client.json()
    const client = data_client.status === "Success" ? data_client.results : {}

    console.log("Results",results)
    console.log("Client id", clientId)
    // }
    
    // await getOrderForClient(clientId).then(res => setOrders(res.results)).catch(err => console.error(err))

    return (
        <div>
            {results.length > 0 ? 
                <div className='flex flex-col'>
                    <div className='text-xl m-2 border-b-2 max-w-max'>
                        <Link href={'/clients/orders'}>Go back</Link>
                    </div>
                    <div className='border p-2 m-2'>
                        <h1 className='text-2xl font-bold text-center'>{results.length > 1 ? "Orders" : "Order"} of : {client.name} {client.last_name} </h1>
                        <div>Numbers : {results.length}</div>
                        <div className='flex flex-col'>
                            {results.map(order => <OrderDetail order={order} key={order.id} />)}
                        </div>
                    </div>
                </div>
                : 
                <div className='overflow-y-hidden h-screen flex flex-col justify-center items-center text-3xl font-bold'>
                    <div>No orders for this clients in our database</div>
                    <div className='text-xl mt-7'>
                        <Link href={'/clients/orders'} className='border-b-2'>Go back</Link>
                    </div>
                </div>
            }
        </div>
    )
}

