/* eslint-disable @next/next/no-img-element */


/* eslint-disable @next/next/no-async-client-component */

/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import PieClientSex from "@/components/charts/PieSex"
import AreaChartPlot from "@/components/charts/PieSex"
import axios from "axios"
import { useEffect, useState } from "react"
import { Spinner } from '@chakra-ui/react'
import LineCharts from "@/components/charts/LineChart"
import LineChartsPayment from "@/components/charts/LineChartPayment"
import { useForm } from "react-hook-form"
import SignIn from "@/components/auth/sign-in"
import Login from "@/components/auth/login"
import { jwtDecode } from "jwt-decode"
import { useRouter } from "next/navigation"


export default function Home() {

  const router = useRouter()
  const [signIn, setSignIn] = useState(false)
  const [token , setToken] = useState(null)

  const {register , handleSubmit, formState:{errors}} = useForm()


  useEffect(() => {

    router.prefetch('/home')

    // if(localStorage.getItem('auth_token')){
    //   setToken(localStorage.getItem('auth_token'))
    // }
    
    var currentTime = new Date().getTime()/1000
    setToken(localStorage.getItem('auth_token'))
    
    if(token != null){
      console.log('token : ', (localStorage.getItem('auth_token')))

      // decode token
      var decode = jwtDecode(token)
      // return to home page if time exp is not finish
      currentTime - decode.exp < 600 ? router.push('/home') : null
      // if token is null , remove that 
      // if(localStorage.getItem('auth_token') == null){
      //   localStorage.removeItem('auth_token')
      // }

      // console.log('decode', jwtDecode(localStorage.getItem('auth_token')))
      // var currentTime = new Date().getTime() / 1000
      // currentTime - jwtDecode(localStorage.getItem('auth_token')).exp < 600 ? router.push('/home') : null
    }else{
      console.log('token vide')
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
