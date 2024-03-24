"use client"

import React from 'react'
import {Link} from "@chakra-ui/next-js";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

const TableOrders = ({orders ,searchOrder}) => {
    const formatDate = (text) => new Date(text).toLocaleDateString("fr-FR");
    
    // let orders_format = orders.map(order => {...orders, date_order:formatDate(order.date_order)})

    // console.log(orders)
    return (
        <>
          <div className=''>
            <TableContainer>
                  <Table style={{border:'1px'}} bgColor={'black'} fontWeight={'bold'} textColor={'white'} colorScheme={''}>
                      <TableCaption>List of orders</TableCaption>
                      <Thead bgColor={'white'}>
                          <Tr>
                              <Th>ID</Th>
                              <Th>Price order</Th>
                              <Th>Volume</Th>
                              <Th>Date of order</Th>
                              <Th>Description</Th>
                              <Th>Status</Th>
                              <Th>Details</Th>
                          </Tr>
                      </Thead>
                      <Tbody>
                          {!searchOrder ? orders?.map((order) => 
                              <Tr key={order?.id}>
                                  <Td>{order?.id}</Td>
                                  <Td>{order?.price_order} FCFA</Td>
                                  <Td>{order?.volume_order}</Td>
                                  <Td fontSize={'15px'}>{new Date(order?.date_order).toLocaleDateString("fr-FR", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                      hour: "numeric",
                                      minute: "numeric",
                                      second: "numeric",
                                  })}</Td>
                                  <Td className='text-sm'>{order?.description_order}</Td>
                                  <Td>
                                    {order?.status_order == "New" ? 
                                      <div>New</div> : order?.status_order == "Done" ? <div>Done</div> : <div>Not Done</div>
                                    }
                                  </Td>
                                  <Td>
                                    <Link href={`/orders/${order?.id}`}>View details</Link>
                                  </Td>
                              </Tr>
                            )
                            : orders?.map((order) => order?.id == searchOrder &&
                              <Tr key={order?.id}>
                                  <Td>{order?.id}</Td>
                                  <Td>{order?.price_order} FCFA</Td>
                                  <Td>{order?.volume_order}</Td>
                                  <Td fontSize={'15px'}>{new Date(order?.date_order).toLocaleDateString("fr-FR", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                      hour: "numeric",
                                      minute: "numeric",
                                      second: "numeric",
                                  })}</Td>
                                  <Td className='text-sm'>{order?.description_order}</Td>
                                  <Td>
                                    {order?.status_order == "New" ? 
                                      <div>New</div> : order?.status_order == "Done" ? <div>Done</div> : <div>Not Done</div>
                                    }
                                  </Td>
                                  <Td>
                                    <Link href={`/orders/${order?.id}`}>View details</Link>
                                  </Td>
                              </Tr>
                            )
                          }
                      </Tbody>
                      <Tfoot bgColor={'white'}>
                          <Tr>
                              <Th>ID</Th>
                              <Th>Price order</Th>
                              <Th>Volume</Th>
                              <Th>Date of order</Th>
                              <Th>Description</Th>
                              <Th>Status</Th>
                              <Th>Details</Th>
                          </Tr>
                      </Tfoot>
                  </Table>
            </TableContainer>
          </div>
        </>
  )
}

export default TableOrders