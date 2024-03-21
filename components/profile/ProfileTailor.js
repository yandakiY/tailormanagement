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
import { Input } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useToast } from '@chakra-ui/react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation';



const getSexList = async () => {
    const api_url_sex = await axios.get("http://127.0.0.1:8181/api/tailor_management/sex", {cache:"no-cache"});
    const res_sex = await api_url_sex.data

    // console.log("sex",res_sex.results)
    return res_sex.status === "Success" ? res_sex.results : []
}



export default function ProfileTailor({tailor}) {

    const {register , handleSubmit, formState:{errors}} = useForm({
        defaultValues:{
            name:tailor.name,
            last_name:tailor.last_name,
            email:tailor.email,
            sex_id:tailor.sex.id,
            contacts:tailor.contacts,
            date_birth:tailor.date_birth,
            year_experience:tailor.year_experience
        }
    })

    // declaration
    const toast = useToast()
    const router = useRouter()

    const [isOpen , setIsOpen] = useState(false)
    const [onClose, setonClose] = useState(false)

    const [isOpenModal , setIsOpenModal] = useState(false)
    const [onCloseModal, setonCloseModal] = useState(false)

    const [sex , setSex] = useState([])
    const [tailorState, setTailor] = useState(tailor)

    console.log('State tailor', tailorState)

    const date_var = new Date()
    const eighteenYearsAgo = new Date(date_var.getFullYear() - 18, date_var.getMonth(), date_var.getDate());
    const maxDate = eighteenYearsAgo.toISOString().split('T')[0];
    console.log('my date',maxDate)

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
        console.log("new data",data)

        // set new data to Tailor
        setTailor(data)

        // update via api url 
        await axios.put(`http://localhost:8181/api/tailor_management/tailor/${tailor.id}`, data)
            .then(res => console.log("updating made..", res.data.results))
            .catch(err => console.error(err))
            
        closeModal()

        return toast({
            title: 'Tailor updated.',
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
        await axios.delete(`http://localhost:8181/api/tailor_management/tailor/${id}`)
            .then(res => console.log("deleting...", res))
            .catch(err => console.error(err))
            
        closeModalDelete()

        router.push('/tailor')


        return toast({
            title: 'Tailor deleted.',
            description: "",
            status: 'error',
            duration: 2000,
            isClosable: true,
        })

    }

    useEffect(() =>{

        getSexList()
            .then(res => setSex(res))
            .catch(err => console.error(err))

        console.log("list sex",sex)
    },[])


    return(
        <>
            <div className="border border-black p-2 flex flex-col">
                <div className="flex justify-center mb-6">
                    <h1 className="text-2xl border-b-black">Profile Tailor : {tailorState.name} {tailorState.last_name}</h1>
                </div>

                {/* Presentation - Options */}
                <div className="flex flex-col">

                    {/* Options */}
                    <div className="flex flex-row justify-center py-2 gap-x-4">
                        <div onClick={() => openModalUpdate()} className="border cursor-pointer px-4 py-1 rounded text-white bg-cyan-900">Update</div>
                        <div onClick={() => openModalDelete()} className="border cursor-pointer px-4 py-1 rounded text-white bg-red-900">Delete</div>
                    </div>

                    {/* Presentation  */}
                    <div className="flex text-base">
                        <div className="border p-4 flex-1 w-96">
                            <div className="mb-2 flex flex-row gap-x-2">
                                <div>Name : </div>
                                <div className="">{tailorState.name}</div>
                            </div>
                            <div className="mb-2 flex flex-row gap-x-2">
                                <div>Last name : </div>
                                <div>{tailorState.last_name}</div>
                            </div>
                            <div className="mb-2 flex flex-row gap-x-2">
                                <div>
                                    Year experience : 
                                </div>
                                <div>
                                    {tailorState.year_experience}
                                </div>
                            </div>
                            <div className="mb-2 flex flex-row gap-x-2">
                                <div>
                                    Contacts : 
                                </div>
                                <div>
                                    {tailorState.contacts}
                                </div>
                            </div>
                            <div className="mb-2 flex flex-row items-center gap-x-1">
                                <div>
                                    Email : 
                                </div>
                                <div className="text-md">
                                    {tailorState.email}
                                </div>
                            </div>
                            <div className="mb-2 flex flex-row gap-x-2">
                                <div>
                                    Sex : 
                                </div>
                                <div>
                                    {tailorState.sex ? tailorState.sex.name : sex.map(sex => sex.id == tailorState.sex_id && sex.name)}
                                </div>
                            </div>
                        </div>
                        <div className="border p-4 flex flex-col justify-center flex-1 w-72 ">
                            <div className="flex justify-center">
                                <div className="text-2xl">Feature not disponible</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Update tailor Modal */}
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
                                            name="name" 
                                            id="name"
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
                                            name="last_name" 
                                            id="last_name"                                        
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
                                            name="contacts" 
                                            id="contacts" 
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
                                            name="email" 
                                            id="email"
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
                                            name="date_birth" id="date_birth" 
                                            {...register('date_birth', {required:{value:true, message:"Date of birth can't be empty or null"} })}
                                        />
                                    </div>
                                    <div className="text-red-700 font-bold text-xs">
                                        {errors?.date_birth?.message}
                                    </div>
                                </div>
                                <div className='flex flex-col min-w-72 mb-1'>
                                    <div className="label flex flex-col">
                                        Year experience :
                                    </div>
                                    <div>
                                        <Input 
                                            size={'lg'} 
                                            type="number" 
                                            name="year_experience" 
                                            id="year_experience"
                                            {...register('year_experience', {min:{value:1 , message:"Year experience can't be less than 1"} , required:{value:true , message:"Year experience can't be null or empty"}})}
                                        />
                                    </div>
                                    <div className="text-red-700 font-bold text-xs">
                                        {errors?.year_experience?.message}
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
                        Are you sure you want delete this tailor ?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button onClick={() => closeModalDelete()}>
                            No
                        </Button>
                        <Button colorScheme='red' onClick={() => onDeleteTailor(tailorState.id)} ml={3}>
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}