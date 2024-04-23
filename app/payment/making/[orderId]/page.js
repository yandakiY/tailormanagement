"use client"

import Link from "next/link"
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import ReactToPrint from "react-to-print";
import { useRouter, useSearchParams } from "next/navigation";


export default function Page({params}) {

    const {orderId} = params
    const router = useRouter()


    // const api_url = await fetch(`http://127.0.0.1:8181/api/tailor_management/orders/client/${clientId}`, {cache:'no-cache'})
    // const data = await api_url.json()
    // const results = data.status === "Success" ? data.results : []
    
    const { register, handleSubmit, watch,formState: { errors } } = useForm({
        defaultValues:{
            order_id: orderId,
            price_payment:"",
            amount_payment:""
        }
    });
    
    const [submitting, setSubmitting] = useState(false);
    const [response, setResponse] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [onClose, setOnClose] = useState(true)

    const [error, setError] = useState([])
    const modalRef = useRef();


    const closeModal = async () => {
        
        setIsOpen(false)
        setOnClose(true)

    }

    // const clientId = useRef(null).current?.dataset?.paramclient;
    // console.log(clientId)

    const onSubmit = async (data) => {
        console.log("test")
        setSubmitting(true)

        const options = {
            headers:{
                'Authorization':'Bearer '+ localStorage.getItem('auth_token'),
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        }

        // }
        await axios.post("http://127.0.0.1:8181/api/tailor_management/payment" ,data, options)
            .then(res => {
                setResponse(res.data)
                console.log("Response",res.data)
                // setSubmitting(true)

                //open modal print
                setIsOpen(true)

                // redirection

            }).catch(err => {

                console.log(JSON.parse(err.response.request.response).errors)
                setError(JSON.parse(err.response.request.response).errors)
                setSubmitting(false)

                if(err.response.status == 401 || localStorage.getItem('role_user') == 'ROLE_USER'){
                    
                    localStorage.removeItem('auth_token')
                    router.push('/')

                }

            })

    };


    return (
        <>
            <div className='flex flex-col mt-8 w-96'>

                <div className="mb-8">
                    <Link className="border text-white font-bold border-black bg-gray-900 hover:bg-gray-700 hover:transition-all px-4 py-1 mb-8" href={''} onClick={() => router.back()}>Go back</Link>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="border border-black p-2 rounded">
                        <h1 className="text-3xl mb-4">
                            Payment for order : {orderId}
                        </h1>

                        {/* Form  */}
                        <div className="">
                            <div className="mb-4">
                                <div>Order : </div>
                                <div>
                                    <input 
                                        {...register('order_id')}
                                        type="text" 
                                        name="order_id" 
                                        id="order_id"
                                        disabled={true} 
                                        className="border border-black p-2 min-w-full"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <div>Amount provided : </div>
                                <div>
                                    <input 
                                        {...register('amount_payment', {min:{value:watch("price_payment") , message:"Payment is not possible, Amount not sufficient !!!"} , required:{value:true , message:"Amount provided can't be null or empty"}})}
                                        type="number" 
                                        name="amount_payment" 
                                        id="amount_payment"
                                        className="border border-black p-2 min-w-full"
                                    />
                                </div>
                                <div className="text-red-700 font-bold text-sm">
                                    {errors?.amount_payment?.message}
                                    {error && error.filter(e => e.field === "").errorMessage}
                                </div>
                            </div>
                            <div className="mb-4">
                                <div>Price : </div>
                                <div>
                                    <input 
                                        {...register('price_payment', {min:{value:1, message:"Price payment can't be less than 1."}, required:{value:true , message:"Price payment can't be null"}})}
                                        type="number" 
                                        name="price_payment" 
                                        id="price_payment"
                                        className="border border-black p-2 min-w-full"
                                    />
                                </div>
                                <div className="text-red-700 font-bold text-sm">
                                    {errors?.price_payment?.message}

                                </div>
                            </div>
                            <div>
                                <input type="submit" value={'Pay'} className="p-2 bg-black hover:bg-slate-900 text-white font-bold text-lg min-w-full rounded"/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>


            <>
            {/* <Button onClick={onOpen}>Open Modal</Button> */}

                <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={() => console.log("close")}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Recu Payment</ModalHeader>
                        <ModalBody pb={6}>
                            {/* <Lorem count={2} /> */}

                            <div ref={modalRef} className="flex flex-col mt-4 font-bold">
                                <div className="hidden text-3xl text-center mb-4 print:block ">Tailor Management : </div>
                                <div className="text-lg justify-center font-bold mb-2">Recu payment : {response == null ? "" : response.results.id} </div>

                                <div className="flex flex-col">
                                    <div className="flex flex-col">
                                        <div className="border border-black p-2">Order : {orderId}</div>
                                        <div className="border border-black p-2">Amount payment : {response == null ? "" : response.results.amount_payment +"FCFA"}</div>
                                        <div className="border border-black p-2">Price payment : {response == null ? "" : response.results.price_payment+"FCFA"}</div>
                                    </div>
                                    <div className="border border-black p-2">
                                        Restitution : {response == null ? "" : response.results.restitution_payment} FCFA
                                    </div>
                                    <div className="border border-black p-2">Status : {response == null ? "" : response.results.status}</div>

                                    <div className="border border-black p-2">
                                        Date : {response == null ? "" : new Date(response.results.date_payment).toLocaleString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            hour: "numeric",
                                            minute: "numeric",
                                            second: "numeric",
                                        })}
                                    </div>
                                </div>
                            </div>
                        </ModalBody>

                        <ModalFooter>
                            <ReactToPrint
                                bodyClass="p-2 mx-8 my-32 flex flex-row justify-center"
                                onBeforeGetContent={() => closeModal()}
                                onAfterPrint={() => console.log("Proccess finish")}
                                documentTitle={`payment-`+new Date().getTime()}
                                content={() => modalRef.current}
                                trigger={() => 
                                    (<button onClick={() => console.log("print..")} className="bg-blue-900 text-white font-bold mb-3 p-2">
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
}