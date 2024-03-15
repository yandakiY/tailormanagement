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

export default function TableTailor({lists , title}) {
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
                            <Th>Year experience</Th>
                            <Th>Details</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {lists.map((tailor) => 
                            <Tr key={tailor.id}>
                                <Td>{tailor.id}</Td>
                                <Td>{tailor.name} {tailor.last_name}</Td>
                                <Td>{tailor.contacts}</Td>
                                <Td>{tailor.sex.name}</Td>
                                <Td>{tailor.year_experience}</Td>
                                <Td>
                                    <Link href={`tailor/${tailor.id}`} >View details</Link>
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
                            <Th>Year experience</Th>
                            <Th>Details</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </>
    );
}