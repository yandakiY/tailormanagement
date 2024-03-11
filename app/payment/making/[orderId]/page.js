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


export default function Page({params}) {

    const {orderId} = params
    const { register, handleSubmit, formState: { errors } } = useForm({
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


    const print = () => {

        const printableElement = modalRef.current;
        if (printableElement) {
            ReactToPrint.print(printableElement);
            console.log("Print...")
        }
        
        setIsOpen(false)
        setOnClose(true)

    }


    const onSubmit = async (data) => {
        console.log("test");
        setSubmitting(true)

        // }
        await axios.post("http://127.0.0.1:8181/api/tailor_management/payment" ,data, {headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
        }})
            .then(res => {

                setResponse(res.data)
                console.log("Response",res.data)
                // setSubmitting(true)

                //open modal print
                setIsOpen(true)

            }).catch(err => {

                console.log(JSON.parse(err.response.request.response).errors)
                setError(JSON.parse(err.response.request.response).errors)
                setSubmitting(false)

            })

    };


    return (
        <>
            <div className='flex flex-col mt-8'>

                <div className="mb-8">
                    <Link className="border text-white font-bold border-black bg-gray-900 hover:bg-gray-700 hover:transition-all px-4 py-1 mb-8" href={"/"}>Go back</Link>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="border border-black p-2 rounded">
                        <h1 className="text-3xl mb-4">
                            Payment making : {orderId}
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
                                        {...register('amount_payment')}
                                        type="number" 
                                        name="amount_payment" 
                                        id="amount_payment"
                                        className="border border-black p-2 min-w-full"
                                    />
                                </div>
                                <div className="text-red-700 font-bold text-sm">
                                    {error.map(e => e.field == "amount_payment" ? e.errorMessage :"")}
                                    {error.map(e => e.field == "" ? e.errorMessage :"")}
                                </div>
                            </div>
                            <div className="mb-4">
                                <div>Price : </div>
                                <div>
                                    <input 
                                        {...register('price_payment')}
                                        type="number" 
                                        name="price_payment" 
                                        id="price_payment"
                                        className="border border-black p-2 min-w-full"
                                    />
                                </div>
                                <div className="text-red-700 font-bold text-sm">
                                    {error.map(e => e.field == "price_payment" ? e.errorMessage :"")}
                                </div>
                            </div>
                            <div>
                                <input type="submit" value={'Pay'} disabled={submitting} className="p-2 bg-black hover:bg-slate-900 text-white font-bold text-lg min-w-full rounded"/>
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
                        content={() => modalRef.current}
                        trigger={() => (
                            <button onClick={print} className="bg-blue-900 text-white font-bold mb-3 p-2">
                                Print
                            </button>
                        )}
                    />
                    
                    {/* <button onClick={onClose}>Cancel</button> */}
                </ModalFooter>
                </ModalContent>
            </Modal>
            </>

        </>
    )
}