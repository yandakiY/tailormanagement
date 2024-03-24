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



export default function TablePayment({payments, title , searchPayment}) {

    const formatDate = (text) => new Date(text).toLocaleDateString("fr-FR");


    return(
        <>  
            <div className="flex flex-row mb-2">
                <div>
                    <h3 className="text-2xl">{title}</h3>
                </div>
            </div>

            <div>
                <TableContainer>
                    <Table style={{border:'1px'}} bgColor={'black'} fontWeight={'bold'} textColor={'white'} colorScheme={''}>
                        <TableCaption>{title}</TableCaption>
                        <Thead bgColor={'white'}>
                            <Tr>
                                <Th>ID</Th>
                                <Th>Client</Th>
                                <Th>Amount payment</Th>
                                <Th>Payment</Th>
                                <Th>Restitution</Th>
                                <Th>Status</Th>
                                <Th>Date Payment</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {searchPayment == '' ? payments.map((pay) => 
                                <Tr key={pay.id}>
                                    <Td>{pay.id}</Td>
                                    <Td>{pay.client.name} {pay.client.last_name}</Td>
                                    <Td>{pay.amount_payment}</Td>
                                    <Td>{pay.price_payment}</Td>
                                    <Td>{pay.restitution_payment}</Td>
                                    <Td className={`${pay.status == 'Not Done' ? 'bg-red-600' : 'bg-green-800'}`}>{pay.status}</Td>
                                    <Td>{formatDate(pay.date_payment)}</Td>
                                    {/* <Td>
                                        <Link href={`clients/${client.id}`} >View details</Link>
                                    </Td> */}
                                </Tr>
                            ) 
                                : 
                                payments.map((pay) => (pay.client.name.toLowerCase().includes(searchPayment.toLowerCase()) || pay.client.last_name.toLowerCase().includes(searchPayment.toLowerCase()) || pay.status.toLowerCase() == (searchPayment.toLowerCase()) || (pay.id == searchPayment)) &&
                                    <Tr key={pay.id}>
                                        <Td>{pay.id}</Td>
                                        <Td>{pay.client.name} {pay.client.last_name}</Td>
                                        <Td>{pay.amount_payment}</Td>
                                        <Td>{pay.price_payment}</Td>
                                        <Td>{pay.restitution_payment}</Td>
                                        <Td className={`${pay.status == 'Not Done' ? 'bg-red-600' : 'bg-green-800'}`}>{pay.status}</Td>
                                        <Td>{formatDate(pay.date_payment)}</Td>
                                        {/* <Td>
                                            <Link href={`clients/${client.id}`} >View details</Link>
                                        </Td> */}
                                    </Tr>
                                ) 
                            }
                        </Tbody>
                        <Tfoot bgColor={'white'}>
                            <Tr>
                                <Th>ID</Th>
                                <Th>Client</Th>
                                <Th>Amount payment</Th>
                                <Th>Payment</Th>
                                <Th>Restitution</Th>
                                <Th>Status</Th>
                                <Th>Date Payment</Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}