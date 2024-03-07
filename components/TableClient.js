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

export default function TableClient({clients , title}) {
    return (
        <>
            {/* <table className="border p-6 md:text-3xl text-xl text-justify">
                <thead>
                    <tr className="border-b-2">
                        <th scope="col" className="pr-4">Name</th>
                        <th scope="col" className="pr-4">Contacts</th>
                        <th scope="col" className="pr-4">Sex</th>
                        <th scope="col" className="pr-4">Details</th>

                    </tr>
                </thead>

                <tbody>
                    {clients.map(client => 
                        <tr key={client.id} className="border-b-2">
                            <td className="pr-4">{client.name} {client.last_name}</td>
                            <td className="pr-4">{client.contacts}</td>
                            <td className="pr-4">{client.sex.name}</td>
                            <td>
                                <a className="text-blue-500 underline" href={`clients/${client.id}`}>View</a>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table> */}

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
                                    <Link href={`clients/${client.id}`} >View details</Link>
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