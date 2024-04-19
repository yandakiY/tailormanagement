// "use client"

import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form"

export default function SignIn({signIn , setSignIn}) {
    const toast = useToast()
    const [error, setError] = useState('')
    const [ok, setOk] = useState(false)
    const [open , setOpen] = useState(false)

    const {register, handleSubmit, formState:{errors} , setValue} = useForm({
        defaultValues:{
            name:'',
            last_name:'',
            email:'',
            contacts:'',
            date_birth:'',
            sex_id:'1',
            username:'',
            password:''
        }
    });

    const wideField = () => {
        setValue('name','')
        setValue('last_name','')
        setValue('email','')
        setValue('contacts','')
        setValue('date_birth','')
        // setValue('sex_id','')
        setValue('username','')
        setValue('password','')
    }


    const onSubmit = async (data) => {
        let data_to_save = {...data, roles:["8"]}

        const options = {
            headers:{
              "Content-Type":"application/json",
              "Accept":"application/json"
          }
        }

        axios.post('http://localhost:8181/api/tailor_management/sign-up', data_to_save , options)
            .then(() => {
            
                console.log('new user added.')
                wideField()

                // setSignIn(false)
                setError('')
                setOpen(true)
                setOk(true)
                
            })
            .catch(err => {
                console.log(err.response.status)
                if(err.response.status == 409){
                    setError('Username or Email exists already')
                }
                setOk(false)
            })

        return toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
    }

    return (

        signIn && <main className={`mx-2 my-3 flex justify-center items-center h-screen`}>
          <div className="flex flex-col content-center bg-white w-1/3 shadow-xl rounded-md p-4">
            <div className=" text-lg lg:text-4xl font-bold text-center mb-3">
              Tailor Management
            </div>

            <div className=" text-lg lg:text-2xl font-bold text-center mb-3">
              Sign in
            </div>
            <div className="p-4 flex-1 flex-col justify-center content-center items-center">
              <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col mb-2">
                  <div>Name :</div>
                  <div>
                    <input type="text" name="name" {...register('name',{required:{value:true, message:'Name field is required'}, minLength:{value:2, message:'Name field should be more than 1.'}})} placeholder="name" className="w-full flex border px-4 py-2 rounded focus:outline-none" />
                  </div>
                  <div className='text-red-600 font-bold text-md'>{errors?.name?.message}</div>
                </div>

                <div className="flex flex-col mb-2">
                  <div>Last name :</div>
                  <div>
                    <input type="text" name="last_name" {...register('last_name',{required:{value:true, message:'Last name field is required'}, minLength:{value:2, message:'Last name field should be more than 1.'}})} placeholder="Last name" className="w-full flex border px-4 py-2 rounded focus:outline-none" />
                  </div>
                  <div className='text-red-600 font-bold text-md'>{errors?.last_name?.message}</div>
                </div>

                <div className="flex flex-col">
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-4 w-full">
                        <div className="flex flex-col mb-2">
                            <div>Email :</div>
                            <div>
                                <input type="text" name="email" {...register('email', {required:{value:true, message:'Email field is required'}, pattern:{value:/^\S+@\S+$/i, message:'Email type is required. (xx@yy.zz)'}})} placeholder="Email" className="w-full flex border px-4 py-2 rounded focus:outline-none" />
                            </div>
                            <div className='text-red-600 font-bold text-md'>{errors?.email?.message}</div>
                        </div>

                        <div className="flex flex-col mb-2">
                            <div>Username :</div>
                            <div>
                                <input type="text" name="username" {...register('username', {required:{value:true, message:'Username is required'}, minLength:{value:3, message:"Username field can't be less than 3"}})} placeholder="Username" className="w-full flex border px-4 py-2 rounded focus:outline-none" />
                            </div>
                            <div className='text-red-600 font-bold text-md'>{errors?.username?.message}</div>
                        </div>
                    </div>
                    <div className='text-red-600 font-bold text-md'>
                        {error !== '' && error}
                    </div>
                </div>

                <div className="flex flex-col mb-2">
                  <div>Password :</div>
                  <div>
                    <input type="password" name="password" {...register('password', {required:{value:true, message:'Password is required'}, minLength:{value:8, message:'Password should be more than or equal to 8.'}})} placeholder="Password" className="w-full flex border px-4 py-2 rounded focus:outline-none" />
                  </div>
                  <div className='text-red-600 font-bold text-md'>{errors?.password?.message}</div>
                </div>

                <div className="flex flex-col mb-2">
                  <div>Contacts :</div>
                  <div>
                    <input type="text" name="contacts" {...register('contacts',{required:{value:true, message:"Contacts is required"}, pattern:{value:/^\+225\s\d{2}\s\d{2}\s\d{2}\s\d{2}\s\d{2}$/ , message:"Contacts must be in the form +225 xx xx xx xx xx"}})} placeholder="Contacts" className="w-full flex border px-4 py-2 rounded focus:outline-none" />
                  </div>
                  <div className='text-red-600 font-bold text-md'>{errors?.contacts?.message}</div>
                </div>

                <div className="flex flex-col mb-2">
                  <div>Date birth :</div>
                  <div>
                    <input type="date" name="date_birth" {...register('date_birth',{required:{value:true, message:'Date field is required'}})} placeholder="" className="w-full flex border px-4 py-2 rounded focus:outline-none" />
                  </div>
                  <div className='text-red-600 font-bold text-md'>{errors?.date_birth?.message}</div>
                </div>

                <div className="flex flex-col mb-2">
                  <div>Sex:</div>
                  <div>
                    <select name="" id="" {...register('sex_id')} className="border p-2 w-full">
                      <option value="1">Male</option>
                      <option value="2">Female</option>
                    </select>
                    {/* <input type="text" name="last_name" placeholder="Last name" className="w-full flex border px-4 py-2 rounded focus:outline-none" /> */}
                  </div>
                  <div className='text-red-600 font-bold text-md'>{errors?.sex?.message}</div>
                </div>
                
                

                <div className="">
                  <button 
                    type="submit" className="w-full bg-blue-900 hover:bg-blue-950 text-white px-2 py-3 rounded ">Save</button>
                </div>

              </form>

              <div className="mt-6 text-center">
                <p>Connect you <span onClick={() => setSignIn(false)} className="text-blue-900 underline hover:cursor-pointer">here</span> </p>
              </div>
            </div>
          </div>
        </main>
    )
}