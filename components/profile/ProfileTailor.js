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
} from '@chakra-ui/react'
import { Input } from 'postcss'
import { useState } from 'react'


export default function ProfileTailor({tailor}) {
    const [isOpen , setIsOpen] = useState(false)

    return(
        <>
            <div className="border border-black p-2 flex flex-col">
                <div className="flex justify-center mb-6">
                    <h1 className="text-2xl border-b-black">Profile Tailor : {tailor.name} {tailor.last_name}</h1>
                </div>

                {/* Presentation - Options */}
                <div className="flex flex-col">

                    {/* Options */}
                    <div className="flex flex-row justify-center py-2 gap-x-4">
                        <div className="border cursor-pointer px-4 py-1 rounded text-white bg-cyan-900">Update</div>
                        <div className="border cursor-pointer px-4 py-1 rounded text-white bg-red-900">Delete</div>
                    </div>

                    {/* Presentation  */}
                    <div className="flex text-base">
                        <div className="border p-4 flex-1 w-96">
                            <div className="mb-2 flex flex-row gap-x-2">
                                <div>Name : </div>
                                <div className="">{tailor.name}</div>
                            </div>
                            <div className="mb-2 flex flex-row gap-x-2">
                                <div>Last name : </div>
                                <div>{tailor.last_name}</div>
                            </div>
                            <div className="mb-2 flex flex-row gap-x-2">
                                <div>
                                    Year experience : 
                                </div>
                                <div>
                                    {tailor.year_experience}
                                </div>
                            </div>
                            <div className="mb-2 flex flex-row gap-x-2">
                                <div>
                                    Contacts : 
                                </div>
                                <div>
                                    {tailor.contacts}
                                </div>
                            </div>
                            <div className="mb-2 flex flex-row items-center gap-x-1">
                                <div>
                                    Email : 
                                </div>
                                <div className="text-md">
                                    {tailor.email}
                                </div>
                            </div>
                            <div className="mb-2 flex flex-row gap-x-2">
                                <div>
                                    Sex : 
                                </div>
                                <div>
                                    {tailor.sex.name}
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


            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Create your account</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>First name</FormLabel>
                        <Input placeholder='First name' />
                        </FormControl>

                        <FormControl mt={4}>
                        <FormLabel>Last name</FormLabel>
                        <Input placeholder='Last name' />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3}>
                        Update
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}