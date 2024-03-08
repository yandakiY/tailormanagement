"use client"

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

export default function TableClientOrder({clients , title}) {
    return (
        <>
            <TableContainer >
                <Table style={{border:'1px'}} bgColor={'black'} fontWeight={'bold'} textColor={'white'} colorScheme={''}>
                    <TableCaption>{title}</TableCaption>
                    <Thead bgColor={'white'}>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Name</Th>
                            <Th>Contacts</Th>
                            <Th>Sex</Th>
                            <Th>Details</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {clients.map((client) => 
                            <Tr key={client.id}>
                                <Td>{client.id}</Td>
                                <Td>{client.name} {client.last_name}</Td>
                                <Td>{client.contacts}</Td>
                                <Td>{client.sex.name}</Td>
                                <Td>
                                    <Link href={`orders/client/${client.id}`} >View Order</Link>
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                    <Tfoot bgColor={'white'}>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Name</Th>
                            <Th>Contacts</Th>
                            <Th>Sex</Th>
                            <Th>Details</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </>
    );
}