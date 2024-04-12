import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Spinner } from '@chakra-ui/react'

export default function Login({signIn , setSignIn}) {

    const router = useRouter()
    const [error, setError] = useState('')
    const [openSpinner, setOpenSpinner] = useState(false)

    const {register, handleSubmit, formState:{errors}} = useForm({
        defaultValues:{
            username:'',
            password:''
        }
    });


    const onSubmit = async (data) => {

        axios.post('http://localhost:8181/api/tailor_management/login', data , {headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
        }}).then(res => {
            console.log('login succes', res.data)
            setOpenSpinner(true)
            localStorage.setItem('auth_token', res.data.results.token)

            // redirection to home
            router.push('/home')

        }).catch(err => {
            console.log(err.response.status)
            if(err.response.status == 409){
                setError('Error on username or password')
            }
        })

        console.log(data)
    }


    return (
        !signIn && (<main className={`mx-2 my-3 flex justify-center items-center h-screen`}>
            <div className="flex flex-col content-center bg-white w-1/4 shadow-xl rounded-md p-4">
                <div className=" text-lg lg:text-4xl font-bold text-center mb-6">
                    Tailor Management
                </div>

                <div className=" text-lg lg:text-2xl font-bold text-center mb-6">
                    Login
                </div>
                <div className="p-4 flex-1 flex-col justify-center content-center items-center">
                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col mb-4">
                            <div>Username :</div>
                            <div>
                                <input type="text" name="username" placeholder="Username" {...register('username', {required:{value:true, message:'Username is required'}, minLength:{value:3, message:"Username field can't be less than 3"}})} className="w-full flex border px-4 py-2 rounded focus:outline-none" />
                            </div>
                            <div className='text-red-600 font-bold text-md'>{errors?.username?.message}</div>
                        </div>

                        <div className="flex flex-col mb-4">
                            <div>Password :</div>
                            <div>
                                <input type="password" name="password" placeholder="Password" {...register('password', {required:{value:true, message:'Password is required'}, minLength:{value:8, message:'Password should be more than or equal to 8.'}})} className="w-full flex border px-4 py-2 rounded focus:outline-none" />
                            </div>
                            <div className='text-red-600 font-bold text-md'>{errors?.password?.message}</div>
                        </div>

                        <div className='text-red-600 font-bold text-md'>
                            {error !== '' && error}
                            {openSpinner && <Spinner />}
                        </div>

                        <div className="my-4">
                            <button type="submit" className="w-full bg-blue-900 hover:bg-blue-950 text-white px-2 py-3 rounded ">Connect you</button>
                        </div>
                        
                    </form>

                    <div className="mt-6 text-center">
                        <p>Create an account <span onClick={() => setSignIn(true)} className="text-blue-900 underline hover:cursor-pointer">here</span> </p>
                    </div>
                </div>
            </div>
        </main>
        )
    )
}