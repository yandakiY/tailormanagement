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

export default function TableClientMeasure({clients , title , searchClient}) {
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
                            <Th>Options</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {searchClient == '' ? clients.map((client) => 
                            <Tr key={client.id}>
                                <Td>{client.id}</Td>
                                <Td>{client.name} {client.last_name}</Td>
                                <Td>{client.contacts}</Td>
                                <Td>{client.sex.name}</Td>
                                <Td>
                                    <Link href={`/measure/add/${client.id}`} >Add new measure</Link>
                                </Td>
                            </Tr>
                        ) 
                            : 
                            clients.map((client) => (client.name.toLowerCase().includes(searchClient.toLowerCase()) || client.last_name.toLowerCase().includes(searchClient.toLowerCase()) || (client.id == searchClient))&&
                                <Tr key={client.id}>
                                    <Td>{client.id}</Td>
                                    <Td>{client.name} {client.last_name}</Td>
                                    <Td>{client.contacts}</Td>
                                    <Td>{client.sex.name}</Td>
                                    <Td>
                                        <Link href={`/measure/add/${client.id}`} >Add new measure </Link>
                                    </Td>
                                </Tr>
                            ) 
                        }
                    </Tbody>
                    <Tfoot bgColor={'white'}>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Name</Th>
                            <Th>Contacts</Th>
                            <Th>Sex</Th>
                            <Th>Options</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </>
    );
}