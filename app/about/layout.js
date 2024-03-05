

import Link from "next/link";


export default function Layout({ children }) {
  return (
    <div className="flex flex-col items-center justify-center">
        <Link className="border border-red-900 bg-red-900 px-4 py-1 mb-4" href={"/"}>Go home</Link>
        {children}
    </div>
  );
}