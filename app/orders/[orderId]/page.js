/* eslint-disable @next/next/no-async-client-component */
// "use client"

import React from 'react'

const DetailsOrders = ({params}) => {
    // throw new Error()
    let {orderId} = params
  
    return (
        <div>Details : {orderId} </div>
    )
}

export default DetailsOrders