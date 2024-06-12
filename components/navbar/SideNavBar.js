"use client"
import React, { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SideNavBar() {

    const [role , setRole] = useState('')
    const [username , setUsername] = useState('')
    const router = useRouter()

    const onLogout =  () => {

        console.log('log out...')
        localStorage.removeItem('auth_token')
        localStorage.removeItem('username_user')
        localStorage.removeItem('role_user')
        router.push('/')

    }


    useEffect(() => {
        
        setRole(localStorage.getItem('role_user'))
        setUsername(localStorage.getItem('username_user'))
        console.log('storgae username',localStorage.getItem('username_user'))

    }, [])
    
  return (
    <div className='flex flex-col'>
        {/* Logo */}
        <div className='font-bold text-3xl text-center mt-4 mb-2'>
            <Link href={'/home'}>
                <div>
                    Tailor Management
                </div>
            </Link>
        </div>

        {username && <>
            <div className='flex flex-col border p-2 rounded items-center justify-center font-bold text-lg text-center mx-2 mt-2 mb-4'>
                <div>
                    <img src="https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg" height={100} width={100} alt="" srcset="" />
                </div>
                {username && 
                    <div className='p-2'>
                        {username}
                        {role == 'ROLE_ADMIN' && <div>
                            <Link href={'/profile'} className='text-blue-900 underline'>View profile</Link>
                        </div>}
                </div>}
            </div>

            <div onClick={() => onLogout()} className='bg-red-500 mx-2 border border-red-900 rounded mb-4 cursor-pointer'>
                <div className='flex justify-center text-black text-xl px-3 py-1 '>Log out</div>
            </div>
        </>}

        {/* Menu Adding - Only for users */}
        {/* {role == 'ROLE_USER' || role == 'ROLE_ADMIN' &&  */}
        <div className='mb-8'>
            <div className='text-xl'>Adding</div>
            <Accordion allowMultiple>
                {role == 'ROLE_USER' && <AccordionItem mb={2}>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                                Customers
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel className='border my-1 mr-1 shadow-sm hover:shadow-slate-800 hover:cursor-pointer font-bold' pb={1}>
                        <Link href={'/clients/add'}>New customer</Link>
                    </AccordionPanel>
                    {/* <AccordionPanel className='border my-1 mr-1 shadow-sm hover:shadow-slate-800 hover:cursor-pointer font-bold' pb={1}>
                        <Link href={'/clients/update'}>Update client</Link>
                    </AccordionPanel> */}
                </AccordionItem>}

                {role == 'ROLE_USER' && <AccordionItem>
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
                </AccordionItem>}

                {role == 'ROLE_ADMIN' && <AccordionItem>
                    <h2>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                            Users
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel className='border my-1 mr-1 shadow-sm hover:shadow-slate-800 hover:cursor-pointer font-bold' pb={1}>
                        <Link href={'/users/add'}>New user</Link>
                    </AccordionPanel>
                    {/* <AccordionPanel className='border my-1 mr-1 shadow-sm hover:shadow-slate-800 hover:cursor-pointer font-bold' pb={1}>
                        Update tailor
                    </AccordionPanel> */}
                </AccordionItem>}
            </Accordion>
        </div>


        {/* Menu Making - Only for users */}
        {role == 'ROLE_USER' && <div className='mb-8'>
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

                {role == 'ROLE_USER' && <AccordionItem>
                    <h2>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                            Payments
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel className='border my-1 mr-1 shadow-sm hover:shadow-slate-800 hover:cursor-pointer font-bold' pb={1}>
                        <Link href={'/orders'}>List of orders for payment</Link>
                    </AccordionPanel>
                    {/* <AccordionPanel className='border my-1 mr-1 shadow-sm hover:shadow-slate-800 hover:cursor-pointer font-bold' pb={1}>
                        List of orders pay or not
                    </AccordionPanel> */}
                </AccordionItem>}

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
                    <AccordionPanel className='border my-1 mr-1 shadow-sm hover:shadow-slate-800 hover:cursor-pointer font-bold' pb={1}>
                        New measure client
                    </AccordionPanel> 
                </AccordionItem> */}
            </Accordion>
        </div>}

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
                    {role == 'ROLE_ADMIN' && <AccordionPanel className='border my-1 mr-1 shadow-sm hover:shadow-slate-800 hover:cursor-pointer font-bold' pb={1}>
                        <Link href={'/clients/male'}>Lists of clients Male</Link>
                    </AccordionPanel>}
                    {role == 'ROLE_ADMIN' && <AccordionPanel className='border my-1 mr-1 shadow-sm hover:shadow-slate-800 hover:cursor-pointer font-bold' pb={1}>
                        <Link href={'/clients/female'}>Lists of clients Female</Link>
                    </AccordionPanel>}
                    {role == 'ROLE_ADMIN' && <AccordionPanel className='border my-1 mr-1 shadow-sm hover:shadow-slate-800 hover:cursor-pointer font-bold' pb={1}>
                        <Link href={'/clients/orders'}>Orders for a client</Link>
                    </AccordionPanel>}
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

                {role == 'ROLE_ADMIN' && <AccordionItem>
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
                </AccordionItem>}

                {role == 'ROLE_ADMIN' && <AccordionItem>
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
                </AccordionItem>}

                {role == 'ROLE_ADMIN' && <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                                Users
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel className='border my-1 mr-1 shadow-sm hover:shadow-slate-800 hover:cursor-pointer font-bold' pb={1}>
                        <Link href={'/users'}>List of users</Link>
                    </AccordionPanel>
                </AccordionItem>}
            </Accordion>
        </div>

    
    </div>
  )
}

