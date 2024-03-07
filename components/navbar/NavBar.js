import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <nav className="flex flex-col md:flex-row md:justify-between items-center mx-4 py-4">
        <div className="text-3xl font-bold border-b-2">Tailor Management</div>
        <div>
            <ul className="flex text-xl justify-center items-center gap-x-4">
                {/* <Link href={'/about'}>About</Link> */}
                <Link href={''}>Contacts</Link>
            </ul>
        </div>
    </nav>
  )
}

export default NavBar