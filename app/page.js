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


export default function Home() {

  const [signIn, setSignIn] = useState(false)

  return (
    <>
      {!signIn ? (<main className={`mx-2 my-3 flex justify-center items-center h-screen`}>
        <div className="flex flex-col content-center bg-white w-1/4 shadow-xl rounded-md p-4">
          <div className=" text-lg lg:text-4xl font-bold text-center mb-6">
            Tailor Management
          </div>

          <div className=" text-lg lg:text-2xl font-bold text-center mb-6">
            Login
          </div>
          <div className="p-4 flex-1 flex-col justify-center content-center items-center">
            <form action="">
              <div className="flex flex-col mb-4">
                <div>Username :</div>
                <div>
                  <input type="text" name="username" placeholder="Username" className="w-full flex border px-4 py-2 rounded focus:outline-none" />
                </div>
              </div>

              <div className="flex flex-col mb-4">
                <div>Password :</div>
                <div>
                  <input type="password" name="password" placeholder="Password" className="w-full flex border px-4 py-2 rounded focus:outline-none" />
                </div>
              </div>

              <div className="">
                <button className="w-full bg-blue-900 hover:bg-blue-950 text-white px-2 py-3 rounded ">Connect you</button>
              </div>

            </form>

            <div className="mt-6 text-center">
              <p>Create an account <span onClick={() => setSignIn(true)} className="text-blue-900 underline hover:cursor-pointer">here</span> </p>
            </div>
          </div>
        </div>

        </main> )
        : 
        (<main className={`mx-2 my-3 flex justify-center items-center h-screen`}>
          <div className="flex flex-col content-center bg-white w-1/4 shadow-xl rounded-md p-4">
            <div className=" text-lg lg:text-4xl font-bold text-center mb-3">
              Tailor Management
            </div>

            <div className=" text-lg lg:text-2xl font-bold text-center mb-3">
              Sign in
            </div>
            <div className="p-4 flex-1 flex-col justify-center content-center items-center">
              <form action="">
                <div className="flex flex-col mb-2">
                  <div>Name :</div>
                  <div>
                    <input type="text" name="name" placeholder="name" className="w-full flex border px-4 py-2 rounded focus:outline-none" />
                  </div>
                </div>

                <div className="flex flex-col mb-2">
                  <div>Last name :</div>
                  <div>
                    <input type="text" name="last_name" placeholder="Last name" className="w-full flex border px-4 py-2 rounded focus:outline-none" />
                  </div>
                </div>

                <div className="flex flex-col mb-2">
                  <div>Email :</div>
                  <div>
                    <input type="text" name="name" placeholder="name" className="w-full flex border px-4 py-2 rounded focus:outline-none" />
                  </div>
                </div>

                <div className="flex flex-col mb-2">
                  <div>Contacts :</div>
                  <div>
                    <input type="text" name="contacts" placeholder="Contacts" className="w-full flex border px-4 py-2 rounded focus:outline-none" />
                  </div>
                </div>

                <div className="flex flex-col mb-2">
                  <div>Date birth :</div>
                  <div>
                    <input type="date" name="date_birth" placeholder="" className="w-full flex border px-4 py-2 rounded focus:outline-none" />
                  </div>
                </div>

                <div className="flex flex-col mb-2">
                  <div>Sex:</div>
                  <div>
                    <select name="" id="">
                      <option value="">M</option>
                      <option value="">F</option>
                    </select>
                    {/* <input type="text" name="last_name" placeholder="Last name" className="w-full flex border px-4 py-2 rounded focus:outline-none" /> */}
                  </div>
                </div>

                
                <div className="flex flex-col mb-2">
                  <div>Username :</div>
                  <div>
                    <input type="text" name="username" placeholder="Username" className="w-full flex border px-4 py-2 rounded focus:outline-none" />
                  </div>
                </div>

                <div className="flex flex-col mb-2">
                  <div>Password :</div>
                  <div>
                    <input type="password" name="password" placeholder="Password" className="w-full flex border px-4 py-2 rounded focus:outline-none" />
                  </div>
                </div>

                <div className="">
                  <button className="w-full bg-blue-900 hover:bg-blue-950 text-white px-2 py-3 rounded ">Save</button>
                </div>

              </form>

              <div className="mt-6 text-center">
                <p>Connect you <span onClick={() => setSignIn(false)} className="text-blue-900 underline hover:cursor-pointer">here</span> </p>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
