import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotAuthorize() {

    const router = useRouter()
    
    return (
        <div className="mt-4">
            <Link href={''} className="bg-black text-white font-bold px-4 py-2 rounded mt-2" onClick={() => router.back()}>Go back</Link>
            <div className="border p-4 text-center mt-10 mx-2">
                <div className="text-3xl font-bold ital">
                    Error 404 - Not Found
                </div>
            </div>
        </div>
    )
};
