/* eslint-disable @next/next/no-img-element */


/* eslint-disable @next/next/no-async-client-component */

/* eslint-disable react-hooks/exhaustive-deps */
"use client"


import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import SignIn from "@/components/auth/sign-in"
import Login from "@/components/auth/login"
// import { jwtDecode } from "jwt-decode"
import { useRouter } from "next/navigation"


export default function Home() {

  const router = useRouter()
  const [signIn, setSignIn] = useState(false)
  // const [token , setToken] = useState('')
  // const [isAuth , setIsAuth] = useState(false)



  useEffect(() => {

    router.prefetch('/home')

    console.log('Auth token', localStorage.getItem('auth_token'))

    // let currentTime = new Date().getTime()/1000
    // setToken(localStorage.getItem('auth_token'))
  
    // let decode = jwtDecode(localStorage.getItem('auth_token'))
    // return to home page if time exp is not finish
    // currentTime - decode.exp < 600 ? setIsAuth(true) : setIsAuth(false)

    if(localStorage.getItem('auth_token') != null){
      console.log('token : ', (localStorage.getItem('auth_token')))

      // go back to home page
      router.push('/home')
      // decode token
      // if token is null , remove that 
      // if(localStorage.getItem('auth_token') == null){
      //   localStorage.removeItem('auth_token')
      // }

      // console.log('decode', jwtDecode(localStorage.getItem('auth_token')))
      // var currentTime = new Date().getTime() / 1000
      // currentTime - jwtDecode(localStorage.getItem('auth_token')).exp < 600 ? router.push('/home') : null
    }else{
      // auth is false
      console.log('token vide')
      // remove token of localStorage
      localStorage.removeItem('auth_token')
    }

    // currentTime - jwtDecode(localStorage.getItem('auth_token')).exp < 600 ? router.push('/home') : null
    // localStorage.getItem('auth_token') && router.push('/home')
  },[])


  return (
    <>
      {!signIn ? (<Login signIn={signIn} setSignIn={setSignIn} />)
        : 
        (<SignIn signIn={signIn} setSignIn={setSignIn} />)}
    </>
  );
}
