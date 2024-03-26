"use client"
import { Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Textarea } from "@chakra-ui/react";
import axios from "axios";
import { getCloneableBody } from "next/dist/server/body-streams";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ReactToPrint from "react-to-print";
import { useToast } from '@chakra-ui/react'



const getClientsList = async () => {
    const clients = await axios.get('http://localhost:8181/api/tailor_management/client')
    const data = await clients.data

    return data.results
}


const getTailorsList = async () => {
    const tailors = await axios.get('http://localhost:8181/api/tailor_management/tailor')
    const data = await tailors.data

    return data.results
}

export default function Page() {

    const modalRef = useRef();
    const [isOpen, setIsOpen] = useState(false)
    const [onClose, setOnClose] = useState(true)

    const closeModal = async () => {
        
        setIsOpen(false)
        setOnClose(true)

    }

    const [res, setRes] = useState(null)
    const toast = useToast()
    const recuRef = useRef();


    const {register, handleSubmit, formState:{errors} , watch , setValue} = useForm({
        defaultValues:{
            client_id:'',
            tailor_id:'',
            description_order:'',
            price_order:'',
            volume_order:'',
            res_order_id:''
        }
    })

    const disableBtn = () => {
        return watch('client_id') == '' || watch('tailor_id') == '' || watch('description_order') == '' || watch('price_order') == '' || watch('volume_order') == ''
    } 

    const emptyFile = () => {
        setValue('client_id' , '')
        setValue('tailor_id' , '')
        setValue('description_order' , '')
        setValue('price_order' , '')
        setValue('volume_order' , '')
    }

    const onSubmit = async (data) => {

        axios.post('http://localhost:8181/api/tailor_management/orders' , data)
            // .then(res => console.log(res.data.results))
            .then(res => {
                // console.log('id ',res.data.id)
                setIsOpen(true)
                setRes(res.data.results.id)
                console.log('res', res.data.results.id)
                // document.getElementById('order').innerHTML = `Recu order  + ${res.data.results.id}`
                // console.log('results order', res.data.results)
                // setValue('res_order_id',res.data.results.id)
            
            })
            .catch(err => console.log(err))


        return toast({
          title: 'Order created.',
          description: "",
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
    }

    const [clients , setClients] = useState([])
    const [tailors , setTailors] = useState([])


    useEffect(() =>{
        getClientsList()
            .then(res => setClients(res))
            .catch(err => console.error(err))

        getTailorsList()
            .then(res => setTailors(res))
            .catch(err => console.error(err))

    }, [])
    

    return (
        <>  
            <div className="mx-4 my-6 flex flex-row justify-between">
                <div className="bg-black text-white text-base p-2 rounded">
                    <Link href={'/orders'} >Go back</Link>
                </div>

                {/* <div>

                </div> */}
            </div>
            <div className="mx-4 my-6 p-2 border">
                {/* Page add orders */}
                <div>
                    <div className="title">
                        <h3 className="text-4xl pb-2 w-full border-b-2">Made a new order : </h3>
                    </div>

                    <div className="mt-4 max-w-96">
                        <form onSubmit={handleSubmit(onSubmit)} action="">
                            <div className="border p-2">
                                <div className="flex flex-col mb-2">
                                    <div className="label mb-1">Client :</div>
                                    <Select placeholder="Choose a client" {...register('client_id' , {required:{value:true , message:'Choose one client'}} )} >
                                        {clients.map(client => <option key={client?.id} value={`${client?.id}`}>{client?.name} {client?.last_name}</option>)}
                                    </Select>
                                    <div className='text-red-600 font-bold text-sm'>{errors?.client_id?.message}</div>
                                </div>

                                <div className="flex flex-col mb-2">
                                    <div className="label mb-1">Tailor :</div>
                                    <Select placeholder="Choose a tailor" {...register('tailor_id' , {required:{value:true, message:'Choose one tailor'}})}>
                                        {tailors.map(tailor => <option key={tailor?.id} value={`${tailor?.id}`}>{tailor?.name} {tailor?.last_name}</option>)}
                                    </Select>
                                    <div className='text-red-600 font-bold text-sm'>{errors?.tailor_id?.message}</div>
                                </div>
                                <div className="flex flex-col mb-2">
                                    <div className="label mb-1">Description :</div>
                                    <Textarea {...register('description_order' , {required:{value:true, message:"Description can't be null or empty"}})} resize={'vertical'} placeholder='Description of order' />
                                    <div className='text-red-600 font-bold text-sm'>{errors?.description_order?.message}</div>
                                </div>
                                <div className="flex flex-col mb-2">
                                    <div className="label mb-1">Price :</div>
                                    <Input type="number" {...register('price_order', {required:{value:true, message:"Price can't be null or empty"} , min:{value:1, message:"Price can't be less than 1"}})} step={'0.1'} placeholder='' />
                                    <div className='text-red-600 font-bold text-sm'>{errors?.price_order?.message}</div>
                                </div>
                                <div className="flex flex-col mb-2">
                                    <div className="label mb-1">Volume :</div>
                                    <Input type="number" {...register('volume_order' , {required:{value:true, message:"Volume can't be null or empty"} , min:{value:1, message:"Volume can't be less than 1"}})} step={'1'} placeholder='' />
                                    <div className='text-red-600 font-bold text-sm'>{errors?.volume_order?.message}</div>
                                </div>

                                <div className="flex flex-col mb-2 w-full">
                                    <div className="label mb-1">
                                        <button type="submit" disabled={disableBtn()} className={`${disableBtn() ? 'bg-gray-500' : 'bg-black'}  text-white font-bold rounded py-2 px-4 min-w-full`}>Save</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>




            <>
                <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={() => console.log("close")}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Tailor Management</ModalHeader>
                        <ModalBody pb={6}>
                             <div ref={modalRef} className="flex flex-col mt-4 font-bold">
                                <div>
                                    <h2 id='order' className="text-2xl underline">Order : {res}</h2>
                                </div>
                                <div className=" flex flex-col border p-2 w-96">
                                    <div className="flex flex-col mb-1 border px-2">
                                        <div>Description : </div>
                                        <div>{watch('description_order')}</div>
                                    </div>
                                    <div className="flex flex-col mb-1 border px-2">
                                        <div>Price : </div>
                                        <div>{watch('price_order')} FCFA</div>
                                    </div>
                                    <div className="flex flex-col mb-1 border px-2">
                                        <div>Volume : </div>
                                        <div>{watch('volume_order')}</div>
                                    </div>
                                    <div className="flex flex-col mb-1 border px-2">
                                        <div>Total : </div>
                                        <div>{watch('price_order') * watch('volume_order')} FCFA</div>
                                    </div>
                                </div>
                            </div>
                        </ModalBody>

                        <ModalFooter>
                            <ReactToPrint
                                bodyClass="p-2 mx-8 my-32 flex flex-row justify-center"
                                onBeforeGetContent={() => closeModal()}
                                onAfterPrint={() => console.log("Proccess finish")}
                                documentTitle={`order-`+new Date().getTime()}
                                content={() => modalRef.current}
                                trigger={() => 
                                    (<button onClick={() => {
                                            console.log("print..")
                                            emptyFile()
                                        }} 
                                        className="bg-blue-900 text-white font-bold mb-3 p-2">
                                        Print
                                    </button>
                                )}
                            />
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        </>
    )
};
