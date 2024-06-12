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

export default function TableUsers({users , title , searchClient}) {
    console.log('users', users)
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
                            <Th>Email</Th>
                            <Th>Sex</Th>
                            <Th>Role</Th>
                            <Th>Details</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {searchClient == '' ? users.map((user) => 
                            <Tr key={user.id}>
                                <Td>{user.id}</Td>
                                <Td>{user.name} {user.last_name}</Td>
                                <Td>{user.contacts}</Td>
                                <Td>{user.email}</Td>
                                <Td>{user.sex.name}</Td>
                                <Td>{user.roles.map(role => role.name)}</Td>
                                <Td>
                                    <Link href={`/users/${user.id}`} >View details</Link>
                                </Td>
                            </Tr>
                        ) 
                            : 
                            users.map((user) => (user.name.toLowerCase().includes(searchClient.toLowerCase()) || user.last_name.toLowerCase().includes(searchClient.toLowerCase()) || (user.id == searchClient)) &&
                                <Tr key={user.id}>
                                    <Td>{user.id}</Td>
                                    <Td>{user.name} {user.last_name}</Td>
                                    <Td>{user.contacts}</Td>
                                    <Td>{user.email}</Td>
                                    <Td>{user.sex.name}</Td>
                                    <Td>{user.roles.map(role => role.name)}</Td>
                                    <Td>
                                        <Link href={`/users/${user.id}`} >View details</Link>
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
                            <Th>Email</Th>
                            <Th>Sex</Th>
                            <Th>Role</Th>
                            <Th>Details</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </>
    );
}