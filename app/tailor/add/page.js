"use client"

import { Input, InputGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Select } from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


const getSexApi = async () =>{
    const api_url_sex = await axios.get("http://127.0.0.1:8181/api/tailor_management/sex", {cache:"no-cache"});
    const res_sex = await api_url_sex.data

    // console.log("sex",res_sex.results)
    return res_sex.results
}

export default function Page() {

    const [sex , setSex] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [onClose, setOnClose] = useState(false)

    const date_var = new Date()
    const eighteenYearsAgo = new Date(date_var.getFullYear() - 18, date_var.getMonth(), date_var.getDate());
    const maxDate = eighteenYearsAgo.toISOString().split('T')[0];
    console.log('my date',maxDate)
    
    const {handleSubmit , watch , register , formState: {errors} , setValue } = useForm({
        defaultValues:{
            name:"",
            last_name:"",
            email:"",
            sex_id:"",
            contacts:"",
            year_experience:""
        }
    })

    const reset = () =>{
        setValue("name","")
        setValue("last_name","")
        setValue("contacts","")
        setValue("date_birth","")
        setValue("sex_id","1")
        setValue("email","")
        setValue("year_experience","")
    }

    const openModal = () =>{
        setIsOpen(true)
        setOnClose(false)
    }

    const closeModal = () => {
        setIsOpen(false)
        setOnClose(true)
    }

    const onSubmit = async data =>{

        console.log(data)

        await axios.post("http://localhost:8181/api/tailor_management/tailor", data)
            .then(res => console.log("New customer added", res.data.results))
            .catch(err => console.error(err))

        openModal()
        reset()

        console.log('adding tailor...')

    }


    useEffect(() =>{
        getSexApi()
            .then(data => setSex(data))
            .catch(err => console.error(err))
    },[])


    return (
        <>
            <div className='flex flex-col mt-8'>

                <div className="mb-8">
                    <Link className="border text-white font-bold border-black bg-gray-900 hover:bg-gray-700 hover:transition-all px-4 py-1 mb-8" href={`/`}>Go home</Link>
                </div>

                <form className="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col items-center  p-2 rounded">
                        <h1 className="text-3xl mb-16">
                            Add new tailor
                        </h1>

                        {/* Form  */}
                        <div className="flex flex-col items-center">
                            {/* Name - last name  */}
                            <div className="flex flex-col lg:flex-row gap-x-8">
                                <div className="mb-4">
                                    <div>Name : </div>
                                    <div>
                                    <Input
                                        {...register('name', {required:{value:true, message:"Name can't be empty or null"} , minLength:{value:2, message:"Name can't be less than 2"}})}
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Enter your name"
                                        className="border border-black p-2 md:min-w-96 min-w-full" size='lg'
                                    />
                                    </div>
                                    <div className="text-red-700 font-bold text-xs">
                                        {errors?.name?.message}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div>Last name : </div>
                                    <div>
                                        <Input
                                            {...register('last_name', {minLength:{value:2 , message:"Last name can't be less than 2"} , required:{value:true , message:"Last name can't be null or empty"}})}
                                            type="text" 
                                            name="last_name" 
                                            id="last_name"
                                            placeholder="Enter your last name"
                                            className="border border-black p-2 md:min-w-96 min-w-full rounded" size={'lg'}
                                        />
                                    </div>
                                    <div className="text-red-700 font-bold text-xs">
                                        {errors?.last_name?.message}
                                    </div>
                                </div>
                                
                            </div>

                            {/* Contacts - Email */}
                            <div className="flex flex-col lg:flex-row gap-x-8">
                                <div className="mb-4">
                                    <div>Contacts (Tel) : </div>
                                    <div>
                                        <InputGroup>
                                            <Input type='text' 
                                                {...register('contacts', {required:{value:true, message:"Contacts can't be empty or null"} , pattern: {value: /^\+225\s\d{2}\s\d{2}\s\d{2}\s\d{2}\s\d{2}$/ , message:"Contacts must be in the form +225 xx xx xx xx xx"} })}
                                                placeholder='Enter your phone number' 
                                                size={'lg'}
                                            />
                                        </InputGroup>
                                    </div>
                                    <div className="text-red-700 font-bold text-xs">
                                        {errors?.contacts?.message}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div>Email : </div>
                                    <div>
                                        <Input
                                            {...register('email', {required:{value:true , message:"Email can't be null or empty"}, pattern:{value: /^\S+@\S+$/i , message:"Email not correspond to : email@email.com "}})}
                                            type="text" 
                                            name="email" 
                                            id="email"
                                            placeholder="Enter your email"
                                            className="" size={'lg'}
                                        />
                                    </div>
                                    <div className="text-red-700 font-bold text-xs">
                                        {errors?.email?.message}
                                    </div>
                                </div>
                            </div>

                            {/* Dob - Year experience */}
                            <div className="flex flex-col lg:flex-row gap-x-8">
                                <div className="mb-4">
                                    <div>Date of birth : </div>
                                    <div>
                                        <Input 
                                            type='date' 
                                            {...register('date_birth', {required:{value:true, message:"Date of birth can't be empty or null"} })}
                                            placeholder='' 
                                            size={'lg'}
                                            max={maxDate}
                                        />
                                    </div>
                                    <div className="text-red-700 font-bold text-xs">
                                        {errors?.date_birth?.message}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div>Year experience : </div>
                                    <div>
                                        <Input
                                            {...register('year_experience', {min:{value:1 , message:"Year experience can't be less than 1"} , required:{value:true , message:"Year experience can't be null or empty"}})}
                                            type="number"
                                            name="year_experience" 
                                            id="year_experience"
                                            placeholder="Enter your year experience"
                                            className="border border-black p-2 md:min-w-96 min-w-full rounded" size={'lg'}
                                        />
                                    </div>
                                    <div className="text-red-700 font-bold text-xs">
                                        {errors?.year_experience?.message}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div>Sex : </div>
                                <div>
                                    <Select size={'lg'} {...register("sex_id", { required: true })}>
                                        {sex.map(sex => 
                                            <option  key={sex.id} value={`${sex.id}`}>{sex.name}</option>
                                        )}
                                    </Select>
                                </div>
                                <div className="text-red-700 font-bold text-xs">
                                    {errors?.sex_id?.message}
                                </div>
                            </div>
                            <div>
                                <input type="submit" value={'Add'} className="px-8 py-2 bg-black hover:bg-slate-900 text-white font-bold text-lg rounded"/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={() => closeModal()} isCentered>
                <ModalOverlay />
                <ModalContent>
                {/* <ModalHeader>New customer added</ModalHeader> */}
                <ModalCloseButton />
                    <ModalBody padding={10}>
                        <div className="flex flex-row justify-center">
                            <div className="text-3xl font-bold">
                                New tailor added !!
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>


        </>
    )
}