// "use client"

import Link from "next/link";

export default function TableClient({clients}) {
    return (
        <>
            {/* {clients.map(
                (client) => (
                    <h1 className="text-3xl" key={client.id}>
                        {client.name}
                    </h1>
            ))} */}
            <table className="border p-6 text-xl text-justify">
                <thead>
                    <tr className="border-b-2">
                        <th scope="col" className="pr-4">Name</th>
                        <th scope="col" className="pr-4">Contacts</th>
                        <th scope="col" className="pr-4">Sex</th>
                        <th scope="col" className="pr-4">Details</th>

                    </tr>
                </thead>

                <tbody>
                    {clients.map(client => 
                        <tr key={client.id} className="border-b-2">
                            <td className="pr-4 text-lg">{client.name} {client.last_name}</td>
                            <td className="pr-4">{client.contacts}</td>
                            <td className="pr-4">{client.sex.name}</td>
                            <td>
                                {/* <li className="text-blue-500 underline"> */}
                                    <a className="text-blue-500 underline" href={`${client.id}`}>View</a>
                                {/* </li> */}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* {clients.map(client => 
                <div key={client.id}>
                    {client.name}
                </div>
            )} */}
            
        </>
    );
}