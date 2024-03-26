import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react'
import Link from 'next/link'

const SideNavBar = () => {
  return (
    <div className='flex flex-col'>
        {/* Logo */}
        <div className='font-bold text-3xl text-center mt-4 mb-8'>
            <Link href={'/'}>
                <div>
                    Tailor Management
                </div>
            </Link>
        </div>

        {/* Menu Adding */}
        <div className='mb-8'>
            <div className='text-xl'>Adding / Updating</div>
            <Accordion allowMultiple>
                <AccordionItem mb={2}>
                    <h2>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                            Clients
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel className='border my-1 mr-1 shadow-sm hover:shadow-slate-800 hover:cursor-pointer font-bold' pb={1}>
                        <Link href={'/clients/add'}>New client</Link>
                    </AccordionPanel>
                    <AccordionPanel className='border my-1 mr-1 shadow-sm hover:shadow-slate-800 hover:cursor-pointer font-bold' pb={1}>
                        <Link href={'/clients/update'}>Update client</Link>
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                            Tailors
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel className='border my-1 mr-1 shadow-sm hover:shadow-slate-800 hover:cursor-pointer font-bold' pb={1}>
                        <Link href={'/tailor/add'}>New tailor</Link>
                    </AccordionPanel>
                    {/* <AccordionPanel className='border my-1 mr-1 shadow-sm hover:shadow-slate-800 hover:cursor-pointer font-bold' pb={1}>
                        Update tailor
                    </AccordionPanel> */}
                </AccordionItem>
            </Accordion>
        </div>


        {/* Menu Making */}
        <div className='mb-8'>
            <div className='text-xl'>Making</div>
            <Accordion allowMultiple>
                <AccordionItem mb={2}>
                    <h2>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                            Measures
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel className='border my-1 mr-1 shadow-sm hover:shadow-slate-800 hover:cursor-pointer font-bold' pb={1}>
                        <Link href={'/measure'}>Measure for a customer</Link>
                    </AccordionPanel>
                    {/* <AccordionPanel className='border my-1 mr-1 shadow-sm hover:shadow-slate-800 hover:cursor-pointer font-bold' pb={1}>
                        New measure client
                    </AccordionPanel> */}
                </AccordionItem>

                <AccordionItem>
                    <h2>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                            Orders
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel className='border my-1 mr-1 shadow-sm hover:shadow-slate-800 hover:cursor-pointer font-bold' pb={1}>
                        <Link href={'/orders/add'}>New order</Link>
                    </AccordionPanel>
                    {/* <AccordionPanel className='border my-1 mr-1 shadow-sm hover:shadow-slate-800 hover:cursor-pointer font-bold' pb={1}>
                        New measure client
                    </AccordionPanel> */}
                </AccordionItem>

                {/* <AccordionItem>
                    <h2>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                            Payments
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel className='border my-1 mr-1 shadow-sm hover:shadow-slate-800 hover:cursor-pointer font-bold' pb={1}>
                        Payment for an order
                    </AccordionPanel>
                    {/* <AccordionPanel className='border my-1 mr-1 shadow-sm hover:shadow-slate-800 hover:cursor-pointer font-bold' pb={1}>
                        New measure client
                    </AccordionPanel> 
                </AccordionItem> */}
            </Accordion>
        </div>

        {/* Menu Lists */}
        <div className='mb-8'>
            <div className='text-xl'>Lists</div>
            <Accordion allowMultiple>
                <AccordionItem mb={2}>
                    <h2>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                            Clients
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel className='border my-1 mr-1 shadow-sm hover:shadow-slate-800 hover:cursor-pointer font-bold' pb={1}>
                        <Link href={'/clients'}>List of clients</Link>
                    </AccordionPanel>
                    <AccordionPanel className='border my-1 mr-1 shadow-sm hover:shadow-slate-800 hover:cursor-pointer font-bold' pb={1}>
                        <Link href={'/clients/male'}>Lists of clients Male</Link>
                    </AccordionPanel>
                    <AccordionPanel className='border my-1 mr-1 shadow-sm hover:shadow-slate-800 hover:cursor-pointer font-bold' pb={1}>
                        <Link href={'/clients/female'}>Lists of clients Female</Link>
                    </AccordionPanel>
                    <AccordionPanel className='border my-1 mr-1 shadow-sm hover:shadow-slate-800 hover:cursor-pointer font-bold' pb={1}>
                        <Link href={'/clients/orders'}>Orders for a client</Link>
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem mb={2}>
                    <h2>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                            Tailors
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel className='border my-1 mr-1 shadow-sm hover:shadow-slate-800 hover:cursor-pointer font-bold' pb={1}>
                        <Link href={'/tailor'}>List of tailors</Link>
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                            Orders
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel className='border my-1 mr-1 shadow-sm hover:shadow-slate-800 hover:cursor-pointer font-bold' pb={1}>
                        <Link href={'/orders'}>List of orders</Link>
                    </AccordionPanel>
                    {/* <AccordionPanel className='border my-1 mr-1 shadow-sm hover:shadow-slate-800 hover:cursor-pointer font-bold' pb={1}>
                        List of orders pay or not
                    </AccordionPanel> */}
                </AccordionItem>

                <AccordionItem>
                    <h2>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                            Payments
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel className='border my-1 mr-1 shadow-sm hover:shadow-slate-800 hover:cursor-pointer font-bold' pb={1}>
                        <Link href={'/payment'}>List of payments</Link>
                    </AccordionPanel>
                    {/* <AccordionPanel className='border my-1 mr-1 shadow-sm hover:shadow-slate-800 hover:cursor-pointer font-bold' pb={1}>
                        List of payments for an order
                    </AccordionPanel> */}
                </AccordionItem>
            </Accordion>
        </div>

    
    </div>
  )
}

export default SideNavBar