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
    <div className='flex flex-col '>
        {/* Logo */}
        <div className='font-bold text-3xl text-center mt-4 mb-8'>
            <div>
                Tailor Management
            </div>
        </div>

        {/* Menu Adding */}
        <div className='mb-8'>
            <div className='text-xl'>Adding</div>
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
                        New client
                    </AccordionPanel>
                    <AccordionPanel className='border my-1 mr-1 shadow-sm hover:shadow-slate-800 hover:cursor-pointer font-bold' pb={1}>
                        New measure client
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
                        New tailor
                    </AccordionPanel>
                    {/* <AccordionPanel className='border my-1 mr-1 shadow-sm hover:shadow-slate-800 hover:cursor-pointer font-bold' pb={1}>
                        New measure client
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
                        Measure for a customer
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
                        New order
                    </AccordionPanel>
                    {/* <AccordionPanel className='border my-1 mr-1 shadow-sm hover:shadow-slate-800 hover:cursor-pointer font-bold' pb={1}>
                        New measure client
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
                        Payment for an order
                    </AccordionPanel>
                    {/* <AccordionPanel className='border my-1 mr-1 shadow-sm hover:shadow-slate-800 hover:cursor-pointer font-bold' pb={1}>
                        New measure client
                    </AccordionPanel> */}
                </AccordionItem>
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
                        Orders for a client
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
                        List of orders
                    </AccordionPanel>
                    <AccordionPanel className='border my-1 mr-1 shadow-sm hover:shadow-slate-800 hover:cursor-pointer font-bold' pb={1}>
                        List of orders pay or not
                    </AccordionPanel>
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
                        List of payments
                    </AccordionPanel>
                    <AccordionPanel className='border my-1 mr-1 shadow-sm hover:shadow-slate-800 hover:cursor-pointer font-bold' pb={1}>
                        List of payments for an order
                    </AccordionPanel>
                    {/* <AccordionPanel className='border my-1 mr-1 shadow-sm hover:shadow-slate-800 hover:cursor-pointer font-bold' pb={1}>
                        New measure client
                    </AccordionPanel> */}
                </AccordionItem>
            </Accordion>
        </div>

        {/* Menu Stats */}
        {/* <div className='mb-8'>
            <div className='text-xl'>Statistics</div>
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
                        See customer stats
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
                        See orders stats
                    </AccordionPanel>
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
                        See payments stats
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </div> */}
    
    </div>
  )
}

export default SideNavBar