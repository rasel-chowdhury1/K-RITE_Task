import React, { useState } from 'react';
import { SiTask } from "react-icons/si";
import { HiMenuAlt3 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
    let Links = [
        {name: 'Home', link: '/'},
        {name: 'About', link: ''},
        {name: 'Service', link: ''},
        {name: 'Contact', link: ''},
    ]

    const [isOpen,setIsOpen] = useState(false)
    return (
        <div className='shadow-md w-full fixed top-0 left-0'>
            <div className='md:px-10 py-4 px-7 md:flex justify-between items-center bg-white'>
                {/* logo here */}
                <div className='flex text-2xl cursor-pointer items-center gap-2'>
                   <SiTask className='w-7 h-7 text-blue-600' />
                    <span className='font-bold'>TaskManagement</span>
                </div>

                {/* Menu icon */}
                <div onClick={() => setIsOpen(!isOpen)} className='w-7 h-7 absolute right-8 top-6 cursor-pointer md:hidden font-bold'>
                  {
                    isOpen ? <RxCross2 /> : <HiMenuAlt3 />
                  }
                </div>

                {/* nav links here */}
                <ul className={`md:flex pl-9 md:pl-0 md:items-center md:pb-0 pb-12 absolute md:static md:z-auto md:w-auto z-[-1] right-0 w-full transition-all bg-white duration-500 ease-in ${isOpen ? 'top-12' : 'top-[-490px]'}`}>
                    {
                        Links.map(link => 
                        <li key={link.name} className='font-semibold my-7 md:my-0 md:ml-8'>
                            <a href="">{link.name}</a>
                        </li>)
                    }
                    <button className='btn bg-blue-600 text-white py-1 px-3 md:ml-8 rounded md:static'>Get Started</button>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;