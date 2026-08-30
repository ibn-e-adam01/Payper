import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const LoginMain = () => {

    const navigate = useNavigate()

    const [ErrorForNotRegisteredEmail, setErrorForNotRegisteredEmail] = useState("");
    const [ErrorForNoPassword, setErrorForNoPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const BACKEND_LIVE_URL = import.meta.env.VITE_BACKEND_URL;

    const submitHandler = async (e) => {
        e.preventDefault();
        const userLogInData = {
            Email,
            Password
        }

        let res = await axios.post(`${BACKEND_LIVE_URL}/signin`, userLogInData, {
            headers: {
                "Content-Type": "application/json"
            }, withCredentials: true
        });

        if(res?.data?.success == true){
            console.log(res.data);
            navigate('/')

        }

        else if(res?.data?.success == false){
        
        console.log(res.data);
        setErrorForNotRegisteredEmail(res?.data?.messageNotFound || res?.data?.messageEmail);
        setErrorForNoPassword(res?.data?.messagePassword || res?.data?.messageWrongPWD);

    }


}


  return (
    <>
    <form action="" onSubmit={submitHandler}>
    <main className='w-full flex-col absolute flex items-center justify-start px-7 gap-7 -z-10 top-20 h-screen'>
        <div className='flex flex-col items-center justify-center md:gap-2 gap-0'>
        <p className='md:text-lg text-sm font-semibold tracking-tighter'>Welcome Back, to your familiar place.</p>
        <h1 className='md:text-7xl sm:text-4xl  text-6xl font-bold tracking-wide'>SIGN IN</h1>
        </div>

        <div className=' w-full flex flex-col items-center justify-center'>
            <div className='input-CON h-auto gap-2 flex items-center justify-center flex-col'>
            <div className=' w-full flex gap-3 items-center justify-center'>
                
            </div>

            <div className='w-full flex flex-col items-start gap-1.5 justify-center'>
                <p className='font-bold sm:text-lg text-sm tracking-tight'>EMAIL ADDRESS</p>
                    <input type="email" value={Email} onChange={(e) => {
                        setEmail(e.target.value);
                    }} placeholder='' className=' rounded-sm outline-none border-2 border-zinc-300 px-4 sm:py-2 w-full sm:text-2xl text-lg py-1'/>
                {ErrorForNotRegisteredEmail && 
                <p className='text-red-600 text-md tracking-tight'>{ErrorForNotRegisteredEmail}</p>
                }
            </div>
            <div className='w-full flex flex-col items-start gap-1.5 justify-center'>
                <p className='font-bold sm:text-lg text-sm tracking-tight'>PASSWORD</p>
                    <input type="password" value={Password} onChange={(e) => {
                        setPassword(e.target.value);
                    }} placeholder='' className=' rounded-sm outline-none border-2 border-zinc-300 px-4 sm:py-2 w-full sm:text-2xl text-lg py-1'/>
                    {ErrorForNoPassword && 
                <p className='text-red-600 text-md tracking-tight'>{ErrorForNoPassword}</p>
                }
            </div>

            <button className='w-full mt-4 h-13 bg-zinc-900 text-white text-xl font-semibold tracking-tight rounded-sm hover:bg-zinc-800 cursor-pointer hover:scale-99'>SIGN IN</button>

            <Link to='/createAccount' className='font-semibold tracking-tight hover:underline mt-3'>Forgot Password? Reset</Link>

            <Link to='/createAccount' className='font-semibold tracking-tight hover:underline'>New to Attire? Sign Up</Link>
            </div>

        </div>
    </main>
    </form>
    
    </>
  )
}

export default LoginMain