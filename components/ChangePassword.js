import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";


export default function ChangePassword({username , isOpen , onClose , closeModal, user_id}) {

     const {register , setValue , watch , handleSubmit, formState:{errors}} = useForm({
        values:{
            password:'',
            confirmed_password:''
        },
    })

    const toast = useToast()

    const onSubmitUpdate = async (data) =>{

        if(watch('confirmed_password') != watch('password')){
            return false
        }

        // close modal update
        closeModal()

        // update new data
        await axios.patch(`http://localhost:8181/api/tailor_management/users/${user_id}` , data , {
            headers:{
                'Authorization': 'Bearer ' + localStorage.getItem('auth_token')
            }
        }).then(res => {
                return toast({
                    title: 'Password changed.',
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


    return (
        <Modal
                isOpen={isOpen}
                onClose={onClose}
                closeOnOverlayClick={false} 
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Profile User : {username} </ModalHeader>
                    <ModalBody pb={2}>
                        <form 
                            method="post"
                            onSubmit={handleSubmit(onSubmitUpdate)}
                        >
                            <div className='flex flex-col'>
                                
                                <div className='flex flex-col min-w-72 mb-1'>
                                    <div className="label flex flex-col">
                                        New password :
                                    </div>
                                    <div>
                                        <Input
                                            {...register('password', {required:{value:true , message:"Password can't be null or empty"} , minLength:{value:8, message:'Password can be less than 8 characters'} })}
                                            type="password" 
                                            name="password" 
                                            id="password"
                                            placeholder="Enter your password"
                                            className="" size={'lg'}
                                        />
                                    </div>
                                    <div className="text-red-700 font-bold text-xs">
                                        {errors?.password?.message}
                                    </div>
                                </div>
                                <div className='flex flex-col min-w-72 mb-1'>
                                    <div className="label flex flex-col">
                                        Confirm new password :
                                    </div>
                                    <div>
                                        <Input
                                            {...register('confirmed_password', {required:{value:true , message:"The confirmation of the password can't be null or empty"}, minLength:{value:8, message:'Password can be less than 8 characters'} })}
                                            type="password" 
                                            name="confirmed_password" 
                                            id="confirmed_password"
                                            placeholder="Confirm your password"
                                            className="" size={'lg'}
                                        />
                                    </div>
                                    <div className="text-red-700 font-bold text-xs">
                                        {errors?.confirmed_password?.message}
                                    </div>
                                </div>
                                {watch('confirmed_password') != watch('password') && <div className="text-red-700 font-bold text-xs">Confirm your password</div>}
                                
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
    )
}
