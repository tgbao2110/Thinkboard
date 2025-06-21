import React from 'react'
import { Link } from 'react-router'
import { Plus } from 'lucide-react'

const Navbar = () => {
  return (
    <header className='bg-base-300 border-b border-base-content/10'>
        <div className="mx-auto max-w-xl p-4">
            <div className="flex items-center justify-between">
                <h1 className='text-3xl font-bold text-primary font-mono tracking-tight'>
                    Thinkboard
                </h1>
                <div className='flex items-center gap-4'>
                    <Link to={"/create"} className='btn btn-primary'>
                        <Plus/>
                        New Note
                    </Link>

                </div>
            </div>
        </div>
    </header>
  )
}

export default Navbar