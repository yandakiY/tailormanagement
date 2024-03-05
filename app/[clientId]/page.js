// import { useEffect } from "react"

import ProfileClient from "@/components/ProfileClient"


export default async function ViewClient({params}) {

    // const [client, setclient] = useState(null)
    const {clientId} = params
    const api_url = await fetch(`http://127.0.0.1:8181/api/tailor_management/client/${clientId}`, {cache:'no-store'})
    const data = await api_url.json()
    const result_client = data.results



    return (
        <div className="flex flex-col items-center">

            <div className="underline mb-4">
                Profile Client : {clientId}
            </div>
            <div className="border p-4 rounded flex flex-row gap-x-4">

                <ProfileClient client={result_client} />

                <div className="border">
                    {/* Name : {result_client.name} */}
                </div>
            </div>
        </div>
    );    
}