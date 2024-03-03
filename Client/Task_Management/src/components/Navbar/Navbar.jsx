import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='navbar flex justify-around bg-cyan-400 py-4'>
            <Link to='' className='bg-sky-500 hover:bg-sky-700 rounded p-2'>Task Management</Link>
            <div className='bg-sky-500 hover:bg-sky-700 rounded p-2'>Dashboard</div>
            <div className='flex justify-around space-x-3'>
                <Link to={'signin'} className='bg-sky-500 hover:bg-sky-700 rounded p-2'>Signin</Link>
                <div className='bg-sky-500 hover:bg-sky-700 rounded p-2'>Signup</div>
            </div>
        </div>
    );
};

export default Navbar;