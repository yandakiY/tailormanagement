"use client"

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Select,
  Input,
  useToast,
} from '@chakra-ui/react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from '@chakra-ui/react'
import { useEffect, useState } from "react";
import ChangePassword from "@/components/ChangePassword";

const getUserByUsername = async (username) => {

    const clientMale = await axios.get(`http://localhost:8181/api/tailor_management/users/${username}` , {
        headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('auth_token')
        }
    }).finally(() => console.log('user...'))

    const data = await clientMale.data
    return data.results

    // console.log('check username ',username)
}

const getSexApi = async () =>{

    const options = {
        headers:{
            'Cache-Control':'no-cache',
            'Authorization':'Bearer ' + localStorage.getItem('auth_token')
        }
    }

    const api_url_sex = await axios.get("http://127.0.0.1:8181/api/tailor_management/sex/lists", options);
    const res_sex = await api_url_sex.data

    // console.log("sex",res_sex.results)
    return res_sex.results
}

export default function Page() {

    const toast = useToast()
    const router = useRouter()
    const [user , setUser] = useState(null)
    const [username , setUsername] = useState('')

    // Modal 
    const [isOpen, setIsOpen] = useState(false)
    const [onClose, setOnClose] = useState(false)

    // Modal change password
    const [isOpenModalPassword, setIsOpenModalPassword] = useState(false)
    const [onCloseModalPassword, setOnCloseModalPassword] = useState(false)

    // Alert
    const [isOpenAlert , setIsOpenAlert] = useState(false)
    const [onCloseAlert, setonCloseAlert] = useState(false)

    //
    const [okUpdate , setOkUpdate] = useState(false)

    const [sex, setSex] = useState([])


    // max date
    const date_var = new Date()
    const eighteenYearsAgo = new Date(date_var.getFullYear() - 18, date_var.getMonth(), date_var.getDate());
    const maxDate = eighteenYearsAgo.toISOString().split('T')[0];


    const {register , setValue , watch , handleSubmit, formState:{errors}} = useForm({
        values:{
            id:'',
            name:'',
            last_name:'',
            email:'',
            sex_id:'1',
            contacts:'',
            date_birth:''
        },
    })

    // const {register , setValue , watch , handleSubmit, formState:{errors}} = useForm({
    //     values:{
    //         test:''
    //     },
    // })

    const openModal = () => {
        setIsOpen(true)
    }

    const openModalChangePassword = () => {
        setIsOpenModalPassword(true)
    }

    const closeModalChangePassword = () => {
        // setOnCloseModalPassword(true)
        setIsOpenModalPassword(false)

    }

    const closeModal = () => {
        // setOnClose(true)
        setIsOpen(false)
    }

    // close warning alert
    const closeAlertupdate = () => {
        setonCloseAlert(true)
        setIsOpenAlert(false)
    }

    // open warning alert
    const openAlertupdate = async () => {
        setIsOpenAlert(true)
        setonCloseAlert(false)
    }

    const onDeconnect = async () => {
        console.log('Deconnect...')

        // remove token
        localStorage.removeItem('auth_token')

        // push to auth page
        router.push('/')
    }

    const formatDate = (text) => new Date(text).toLocaleDateString("fr-FR");

    // const updateProcess = () => {
        
    // }

    const onSubmitUpdate = async (data) =>{

        // close modal update
        closeModal()

        // update new data
        await axios.patch(`http://localhost:8181/api/tailor_management/users/${watch('id')}` , data , {
            headers:{
                'Authorization': 'Bearer ' + localStorage.getItem('auth_token')
            }
        }).then(res => {
                return toast({
                    title: 'User updated.',
                    description: "",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
        })

        // alert component - you should be deconnect
        // openAlertupdate()


        //reload the current page
        window.location.reload()

        // console.log(data)
    

    }

    useEffect(() => {

        console.log('username from profile' , localStorage.getItem('username_user'))

        // setUsername(localStorage.getItem('username_user'))

        getUserByUsername(localStorage.getItem('username_user'))
            .then(data => {
                setUser(data)

                // set values to input
                setValue('name' , data.name)
                setValue('last_name' , data.last_name)
                setValue('email' , data.email)
                setValue('contacts' , data.contacts)
                setValue('date_birth' , data.date_birth)
                setValue('sex_id' , data.sex.id)
                setValue('id' , data.id)

                console.log('Data user' , data)    
            })
            .catch(err => {
                console.error(err)

                // remove token
                localStorage.removeItem('auth_token')

                // push to auth page
                router.push('/')
            })
      
        getSexApi()
            .then(data => setSex(data))
            .catch(err => {
                console.error(err)

                // remove token
                localStorage.removeItem('auth_token')

                // push to auth page
                router.push('/')
            })
    
    }, [])
    

    return (
        <>

            <div className="my-8">
                <div>
                    <Link href={''} onClick={() => router.back()} className="bg-black px-2 py-1 text-xl text-white rounded">Go back</Link>
                </div>
                <div className="flex flex-col mt-4">
                    <div className="text-3xl">Profile : {user?.username} </div>
                    <div className="p-2 text-2xl grid grid-cols-2 gap-x-2 w-full font-bold">
                        <div className="border p-2 my-2 flex flex-col items-center">
                            <div>Nom :</div> {user?.name}
                        </div>
                        <div className="border p-2 my-2 flex flex-col items-center">
                            <div>Prenom :</div> {user?.last_name}
                        </div>
                        <div className="border p-2 my-2 flex flex-col items-center">
                            <div>Date of birth :</div> {formatDate(user?.date_birth)}
                        </div>
                        <div className="border p-2 my-2 flex flex-col items-center">
                            <div>Role :</div> {user?.roles.map(role => '|' + role.name)}
                        </div>
                    </div>
                </div>

                <div className="flex flex-row gap-x-2 justify-center">
                    <button onClick={() => openModal()} className="p-2 bg-slate-600 text-white rounded">Update profile</button>
                    <button onClick={() => openModalChangePassword()} className="p-2 bg-blue-900 text-white rounded">Change the password</button>
                </div>
            </div>


            
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                closeOnOverlayClick={false} 
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Profile User : {user?.username} </ModalHeader>
                    <ModalBody pb={2}>
                        <form 
                            method="post"
                            onSubmit={handleSubmit(onSubmitUpdate)}
                        >
                            <div className='flex flex-col'>
                                <div className='flex flex-col min-w-72 mb-1'>
                                    <div className="label flex flex-col">
                                        Name :
                                    </div>
                                    <div>
                                        <Input size={'lg'} 
                                            type="text"
                                            {...register('name', {required:{value:true, message:"Name can't be empty or null"} , minLength:{value:2, message:"Name can't be less than 2"}})}
                                        />
                                    </div>
                                    <div className="text-red-700 font-bold text-xs">
                                        {errors?.name?.message}
                                    </div>
                                </div>
                                <div className='flex flex-col min-w-72 mb-1'>
                                    <div className="label flex flex-col">
                                        Last name :
                                    </div>
                                    <div>
                                        <Input 
                                            size={'lg'} 
                                            type="text"                                       
                                            {...register('last_name', {minLength:{value:2 , message:"Last name can't be less than 2"} , required:{value:true , message:"Last name can't be null or empty"}})}
                                        />
                                    </div>
                                    <div className="text-red-700 font-bold text-xs">
                                        {errors?.last_name?.message}
                                    </div>
                                </div>
                                <div className='flex flex-col min-w-72 mb-1'>
                                    <div className="label flex flex-col">
                                        Contacts :
                                    </div>
                                    <div>
                                        <Input 
                                            size={'lg'} 
                                            type="text"
                                            {...register('contacts', {required:{value:true, message:"Contacts can't be empty or null"} , pattern: {value: /^\+225\s\d{2}\s\d{2}\s\d{2}\s\d{2}\s\d{2}$/ , message:"Contacts must be in the form +225 xx xx xx xx xx"} })}
                                        />
                                    </div>
                                    <div className="text-red-700 font-bold text-xs">
                                        {errors?.contacts?.message}
                                    </div>
                                </div>
                                <div className='flex flex-col min-w-72 mb-1'>
                                    <div className="label flex flex-col">
                                        Email :
                                    </div>
                                    <div>
                                        <Input size={'lg'}
                                            type="text" 
                                            {...register('email', {required:{value:true , message:"Email can't be null or empty"}, pattern:{value: /^\S+@\S+$/i , message:"Email not correspond to : email@email.com "}})}
                                        />
                                    </div>
                                    <div className="text-red-700 font-bold text-xs">
                                        {errors?.email?.message}
                                    </div>
                                </div>
                                <div className='flex flex-col min-w-72 mb-1'>
                                    <div className="label flex flex-col">
                                        Date of birth :
                                    </div>
                                    <div>
                                        <Input
                                            size={'lg'}
                                            max={maxDate}
                                            type="date"
                                            {...register('date_birth', {required:{value:true, message:"Date of birth can't be empty or null"} })}
                                        />
                                    </div>
                                    <div className="text-red-700 font-bold text-xs">
                                        {errors?.date_birth?.message}
                                    </div>
                                </div>
                                
                                <div className='flex flex-col min-w-72 mb-1'>
                                    <div className="label flex flex-col">
                                        Sex :
                                    </div>
                                    <div>
                                        <Select size={'lg'}  {...register("sex_id", { required: true })}>
                                            {sex.map(sex => 
                                                <option key={sex.id} value={`${sex.id}`}>{sex.name}</option>
                                            )}
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <ModalFooter>
                                <Button
                                    type='submit' 
                                    colorScheme='blue' 
                                    mr={3}
                                >
                                    Update
                                </Button>
                                <Button onClick={() => closeModal()}>Cancel</Button>
                            </ModalFooter>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>

            
            <ChangePassword username={user?.username} user_id={user?.id} isOpen={isOpenModalPassword} onClose={onCloseModalPassword} closeModal={() => closeModalChangePassword()} />
            

            <AlertDialog
                motionPreset='slideInBottom'
                onClose={() => closeAlertupdate()}
                isOpen={isOpenAlert}
                closeOnOverlayClick={false}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>Warning - Updating</AlertDialogHeader>
                    {/* <AlertDialogCloseButton /> */}
                    <AlertDialogBody>
                        <p className="text-2xl">The updating of profile requires the log out of your account.</p>
                        {/* <br /> */}
                        {/* <p className="text-xl mt-4">Do you want this ?</p> */}
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        {/* <Button dis onClick={() => closeAlertupdate()}>
                            No
                        </Button> */}
                        <Button colorScheme='red' onClick={() => onDeconnect()} ml={3}>
                            Log out
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </>
    )
}

