"use client"

import { useForm } from 'react-hook-form'
import { Input, useToast } from '@chakra-ui/react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Select,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'


const getSexList = async () => {
    
    let options = {
        headers:{
            'Cache-Control':'no-cache' ,
            'Authorization':'Bearer '+localStorage.getItem('auth_token') 
        }
    }
    const api_url_sex = await axios.get("http://127.0.0.1:8181/api/tailor_management/sex", options);
    const res_sex = await api_url_sex.data

    // console.log("sex",res_sex.results)
    return res_sex.status === "Success" ? res_sex.results : []
}


export default function ProfileClient({client}) {

    const toast = useToast()
    const router = useRouter()
    const [isOpen , setIsOpen] = useState(false)
    const [onClose, setonClose] = useState(false)

    

    const [isOpenModal , setIsOpenModal] = useState(false)
    const [onCloseModal, setonCloseModal] = useState(false)

    const [sex , setSex] = useState([])
    const [clients, setClient] = useState(null)
    console.log('client', client)

    // configure date , should be not less than 18 years old
    const date_var = new Date()
    const eighteenYearsAgo = new Date(date_var.getFullYear() - 18, date_var.getMonth(), date_var.getDate());
    const maxDate = eighteenYearsAgo.toISOString().split('T')[0];

    const {register  , watch , handleSubmit, formState:{errors}} = useForm({
        values:{
            name:client?.name,
            last_name:client?.last_name,
            email:client?.email,
            sex_id:client?.sex?.id,
            contacts:client?.contacts,
            date_birth:client?.date_birth
        },
    })
    
    const openModalUpdate = () =>{
        console.log('Open modal..')
        setIsOpen(true)
        setonClose(false)
    }

    const openModalDelete = () =>{
        console.log('Open modal delete..')
        setIsOpenModal(true)
        setonCloseModal(false)
    }

    const closeModalDelete = () =>{
        console.log('Close modal delete..')
        setIsOpenModal(false)
        setonCloseModal(true)
    }

    const closeModal = () => {
        console.log('Close modal...')
        setIsOpen(false)
        setonClose(true)
    }

    const onSubmitUpdate = async (data) => {

        let options = {
            headers:{
                'Cache-Control':'no-cache' ,
                'Authorization':'Bearer '+localStorage.getItem('auth_token') 
            }
        }

        console.log("new data",data)

        // set new data to Tailor
        setClient({...data , total_payment:client.total_payment})

        // update via api url 
        await axios.put(`http://localhost:8181/api/tailor_management/client/${client.id}`, data , options)
            .then(res => console.log("updating made..", res.data.results))
            .catch(err => console.error(err))
            
        closeModal()

        return toast({
            title: 'Client updated.',
            description: "",
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
        
    }


    const onDeleteTailor = async (id) => {
        console.log("delete tailor",id)

        // set new data to Tailor
        // setTailor(data)

        // update via api url 
        await axios.delete(`http://localhost:8181/api/tailor_management/client/${id}`)
            .then(res => console.log("deleting...", res))
            .catch(err => console.error(err))
            
        closeModalDelete()

        router.push('/clients')


        return toast({
            title: 'Client deleted.',
            description: "",
            status: 'error',
            duration: 2000,
            isClosable: true,
        })

    }


    useEffect(() =>{

        // if(client == undefined){
        //     router.push('/')
        // }
        // setClient(client)
        // console.log('client eff', client)

        getSexList()
            .then(res => setSex(res))
            .catch(err => console.error(err))

        console.log("list sex",sex)
    },[])

    return (
        <>
            <div className="border p-4 flex flex-col text-base">
                <div>Name : {client?.name}</div>
                <div>Last name : {client?.last_name}</div>
                <div>Contacts : {client?.contacts} </div>
                <div>Email : {client?.email} </div>
                <div>Sex : {client?.sex ? client?.sex.name : sex.map(sex => sex.id === client?.sex_id && sex.name)}</div>
                <div>Total Payment : {client?.total_payment} FCFA</div>

                <div className="flex flex-row justify-between mt-4">
                    <div onClick={() => openModalUpdate()} className="border cursor-pointer px-4 py-1 rounded text-white bg-cyan-900">
                        Edit
                    </div>
                    <div onClick={() => openModalDelete()} className="border cursor-pointer px-4 py-1 rounded text-white bg-red-900">
                        Delete
                    </div>
                </div>
            </div>



            <Modal
                isOpen={isOpen}
                onClose={onClose}
                closeOnOverlayClick={false} 
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Tailor</ModalHeader>
                    <ModalBody pb={2}>
                        <form action="" onSubmit={handleSubmit(onSubmitUpdate)}>
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
                                        <Select size={'lg'} {...register("sex_id", { required: true })}>
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
                                <Button onClick={closeModal}>Cancel</Button>
                            </ModalFooter>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>



            <AlertDialog
                motionPreset='slideInBottom'
                onClose={onCloseModal}
                isOpen={isOpenModal}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>Delete Tailor</AlertDialogHeader>
                    {/* <AlertDialogCloseButton /> */}
                    <AlertDialogBody>
                        Are you sure you want delete this client ?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button onClick={() => closeModalDelete()}>
                            No
                        </Button>
                        <Button colorScheme='red' onClick={() => onDeleteTailor(client?.id)} ml={3}>
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </>
    );
}