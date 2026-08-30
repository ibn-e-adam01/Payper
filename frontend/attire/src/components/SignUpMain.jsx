import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUpMain = () => {

    const navigate = useNavigate()


    const [firstName, setfirstName] = useState("");
    const [ErrorForNoFirstName, setErrorForNoFirstName] = useState("");
    const [ErrorForRegisteredEmail, setErrorForRegisteredEmail] = useState("");
    const [ErrorForNoLastName, setErrorForNoLastName] = useState("");
    const [ErrorForNoPassword, setErrorForNoPassword] = useState("");
    const [lastName, setlastName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        const userData = {
            firstName,
            lastName,
            Email,
            Password
        }

        let res = await axios.post('http://localhost:3000/createAccount', userData, {
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
        setErrorForNoFirstName(res?.data?.message1st);
        setErrorForNoLastName(res?.data?.message2nd);
        setErrorForRegisteredEmail(res?.data?.message);
        setErrorForNoPassword(res?.data?.messagePassword);

    }


}


  return (
    <>
    <form action="" onSubmit={submitHandler}>
    <main className='w-full flex-col absolute flex items-center justify-start px-7 gap-7 -z-10 top-20 h-screen'>
        <div className='flex flex-col items-center justify-center gap-2'>
        <p className='md:text-3xl text-md font-semibold tracking-tighter'>Welcome, let's get you started.</p>
        <h1 className='md:text-6xl tracking-tighter text-2xl font-bold'>CREATE YOUR ACCOUNT</h1>
        </div>

        <div className=' w-full flex flex-col gap-3 items-center justify-center'>
            <div className='input-CON w-auto h-auto gap-3 flex items-center justify-center flex-col'>
            <div className=' w-full flex gap-3 items-center justify-center'>
                <div className=' flex flex-col items-start gap-1.5 justify-center'>
                    <p className='font-bold sm:text-lg text-sm tracking-tight'>FIRST NAME</p>
                    <input type="text" value={firstName} onChange={(e) => {
                        setfirstName(e.target.value);
                    }} placeholder='' className=' rounded-sm outline-none border-2 border-zinc-300 px-4 sm:py-2 w-full sm:text-2xl text-lg py-1'/>
                    {ErrorForNoFirstName && 
                <p className='text-red-600 text-md tracking-tight'>{ErrorForNoFirstName}</p>
                }
                </div>
                <div className=' flex flex-col items-start gap-1.5 justify-center'>
                    <p className='font-bold sm:text-lg text-sm tracking-tight'>LAST NAME</p>
                    <input type="text" value={lastName} onChange={(e) => {
                        setlastName(e.target.value);
                    }} placeholder='' className=' rounded-sm outline-none border-2 border-zinc-300 px-4 sm:py-2 w-full sm:text-2xl text-lg py-1'/>
                    {ErrorForNoLastName && 
                <p className='text-red-600 text-md tracking-tight'>{ErrorForNoLastName}</p>
                }
                </div>
                
            </div>

            <div className='w-full flex flex-col items-start gap-1.5 justify-center'>
                <p className='font-bold sm:text-lg text-sm tracking-tight'>EMAIL ADDRESS</p>
                    <input type="email" value={Email} onChange={(e) => {
                        setEmail(e.target.value);
                    }} placeholder='' className=' rounded-sm outline-none border-2 border-zinc-300 px-4 sm:py-2 w-full sm:text-2xl text-lg py-1'/>
                {ErrorForRegisteredEmail && 
                <p className='text-red-600 text-md tracking-tight'>{ErrorForRegisteredEmail}</p>
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

            <button className='w-full mt-4 h-13 bg-zinc-900 text-white text-xl font-semibold tracking-tight rounded-sm hover:bg-zinc-800 cursor-pointer hover:scale-99'>CREATE ACCOUNT</button>

            <Link to='/signin' className='font-semibold mb-3 tracking-tight hover:underline mt-3'>Already have one? Sign In</Link>
            </div>

        </div>
    </main>
    </form>
    
    </>
  )
}

export default SignUpMain