// import { useEffect } from "react"

import MeasureClientMen from "@/components/MeasureClientMen"
import MeasureClientWomen from "@/components/MeasureClientWomen"
import ProfileClient from "@/components/ProfileClient"
import Link from "next/link"


export default async function ViewClient({params}) {

    // const [client, setclient] = useState(null)
    const {clientId} = params

    const api_url_client = await fetch(`http://127.0.0.1:8181/api/tailor_management/client/${clientId}`, {cache:'no-cache'})
    const data_client = await api_url_client.json()
    const result_client = data_client.results

    let api_url_measure = null;
    if(result_client.sex.name === "Male"){
        api_url_measure = await fetch(`http://127.0.0.1:8181/api/tailor_management/measure_men/client/${clientId}`, {cache:'no-cache'})
    }else{
        api_url_measure = await fetch(`http://127.0.0.1:8181/api/tailor_management/measure_women/client/${clientId}`, {cache:'no-cache'})
    }

    const data_measure = await api_url_measure.json()
    const result_measure = data_measure.results

    console.log("Measure", result_measure)

    return (
        <>
            <div className="flex flex-row mx-4 my-6">
                <Link className="border bg-black text-white rounded px-4 py-1 mb-4" href={"/clients"}>Go back</Link>
            </div>
            <div className="flex flex-col items-center md:text-2xl text-md">

                <div className="underline mb-4">
                    Profile Client : {clientId}
                </div>
                <div className="border p-4 rounded flex flex-col gap-4">
                    <ProfileClient client={result_client} />
                    <div className=" p-4">
                        {result_client.sex.name === "Female" ? <MeasureClientWomen client_id={clientId} measures_clients_women={result_measure} /> : <MeasureClientMen clientId={clientId} measures_clients_men={result_measure} />}
                    </div>
                </div>
            </div>
            </>

    );    
}