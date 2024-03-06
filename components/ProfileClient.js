


export default function ProfileClient({client}) {
    return (
        <div className="border p-4 flex flex-col">
            <div>Name : {client.name}</div>
            <div> Last name : {client.last_name}</div>
            <div>Contacts : {client.contacts} </div>
            <div>Email : {client.email} </div>
            <div>Sex : {client.sex.name}</div>
            <div>Total Payment : {client.total_payment} FCFA</div>

            <div className="flex flex-row justify-between mt-4">
                <div className="px-6 py-1 cursor-pointer border border-green-800 bg-green-800 hover:bg-green-600 font-bold">
                    Edit
                </div>
                <div className="px-6 py-1 cursor-pointer border border-red-800 bg-red-800 hover:bg-red-600 font-bold">
                    Delete
                </div>
            </div>
        </div>
    );
}