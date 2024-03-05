import React, { useContext } from 'react';
import { FaFacebookF, FaLinkedinIn, FaGoogle,FaRegEnvelope } from 'react-icons/fa'
import {MdLockOutline} from 'react-icons/md';
import { Link } from 'react-router-dom';
import { AuthContext } from './../../Providers/AuthProviders/AuthProviders';
import { useForm } from 'react-hook-form';


const SignIn = () => {
    const {signIn} = useContext(AuthContext)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
      } = useForm();

      const onSubmit = (data, e) => {
        e.target.reset();
         // reset after form submit
         signIn(data.name, data.password)
        console.log(data);
      };

    return (
        <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center mt-20">
            <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
                {/* Sign in section */}
                <div className='w-3/5 p-5'>
                    <div className="text-left font-bold">
                        <span className='text-green-500'>Company</span>Name
                    </div>
                    <div className="py-10">
                        <h2 className="text-3xl font-bold text-green-500 mb-2">Sign in to Account</h2>
                        <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
                        
                        {/** Social login section */}
                        <div className="flex justify-center my-2">
                            <a href="" className='border-2 border-gray-200 rounded-full p-3 mx-1'>
                                <FaFacebookF className='text-sm'/>
                            </a>
                            <a href="" className='border-2 border-gray-200 rounded-full p-3 mx-1'>
                                <FaLinkedinIn className='text-sm'/>
                            </a>
                            <a href="" className='border-2 border-gray-200 rounded-full p-3 mx-1'>
                                <FaGoogle className='text-sm'/>
                            </a>
                        </div>

                        <p className="text-gray-400 my-3">or use your email account</p>
                        
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col items-center">

                                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                                    <FaRegEnvelope className='text-gray-400 m-2'/>
                                    <input type="text" {...register("name", { required: true })} placeholder='User Name' className='bg-gray-100 outline-none text-sm flex-1'/>
                                </div>

                                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                                    <MdLockOutline className='text-gray-400 m-2'/>
                                    <input type="password" {...register("password", { required: true,minLength:8 })} placeholder='Password' className='bg-gray-100 outline-none text-sm flex-1'/>
                                </div>

                                <div className="flex justify-between w-64 mb-5">
                                    <label className="flex items-center text-xs"> <input type="checkbox" name="remember" className='mr-1' /> Remenber me</label>
                                    <a href="" className='text-xs'>Forget Password?</a>
                                </div>

                                <button  type='submit' className='border-2 border-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white'>Sign In</button>

                            </div>
                        </form>
                    </div>
                </div>

                {/* Sign up section */}
                <div className='w-2/5 bg-green-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12'>
                    <h2 className="text-3xl font-bold mb-2">Hello, Friend</h2>
                    <div className="border-2 w-10 border-white inline-block mb-2"></div>
                    <p className='mb-10'>Fill up personal information and start journey with us.</p>
                    <Link to={'/signup'} className='border-2 rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500'>Sign Up</Link>
                </div>

            </div>
        </div>
    );
};

export default SignIn;