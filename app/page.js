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
  const {register , handleSubmit, formState:{errors}} = useForm()


  useEffect(() => {
    console.log('Auth data : ', jwtDecode(localStorage.getItem('auth_token')))
    
    var currentTime = new Date().getTime()/1000
    currentTime - jwtDecode(localStorage.getItem('auth_token')).exp < 600 && router.push('/home')
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
