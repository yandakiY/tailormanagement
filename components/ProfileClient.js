


export default function ProfileClient({client}) {
    return (
        <div className="border p-4 flex flex-col">
            <div>Name : {client.name}</div>
            <div> Last name : {client.last_name}</div>
            <div>Contacts : {client.contacts} </div>
            <div>Email : {client.email} </div>
            <div>Sex : {client.sex.name}</div>
            <div>Total Payment : {client.total_payment} FCFA</div>
        </div>
    );
}