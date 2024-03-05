
/* eslint-disable react-hooks/exhaustive-deps */
// "use server"
import TableClient from "@/components/TableClient";

export default async function Home() {

    const api_url = await fetch("http://127.0.0.1:8181/api/tailor_management/client", {cache:"no-store"});
    const res = await api_url.json()

  

  return (
    <main className={`flex flex-col items-center justify-between p-24`}>
      <div className="underline text-3xl pb-4">
        List of clients
      </div>
      <TableClient clients={res.results} />
    </main>
  );
}
