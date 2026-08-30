import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useTheme } from './ThemeContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginSeller = () => {
    const {CreateProductOpen, setCreateProductOpen} = useTheme(false);
    const [FullNameSeller, setFullNameSeller] = useState('');
    const [EmailSeller, setEmailSeller] = useState('');
    const [PasswordSeller, setPasswordSeller] = useState('');
    const navigate = useNavigate();
    const [FullNameError, setFullNameError] = useState('');
    const [EmailError, setEmailError] = useState('');
    const [PasswordError, setPasswordError] = useState('');
    const { MyProductsClicked, setMyProductsClicked } = useTheme(false); 
    const { LoginSellerOpen, setLoginSellerOpen } = useTheme(false); 

    const sendSellerData = async (e) => {
        e.preventDefault();

        const sellerData = {
           FullNameSeller,
           EmailSeller,
           PasswordSeller
        }

        const res = await axios.post("http://localhost:3000/seller/login", sellerData, {
            headers: {
                'Content-Type' : 'application/json'
            }, withCredentials: true
        });

            if(res?.data?.success == true){
            console.log(res?.data);
            setLoginSellerOpen(false);
            navigate('/seller-dashboard');
            
            }
            else if(res?.data?.success == false){
                console.log(res?.data);
                setFullNameError(res?.data?.messageFullName);
                setEmailError(res?.data?.messageEmail || res?.data?.messageNotFound);
                setPasswordError(res?.data?.messagePassword || res?.data?.messageWrongPWD);
            }
       

    }


  return (
    <>

    <form onSubmit={sendSellerData} action="">
    
    <div className=' px-5 bg-zinc-900 rounded-md border border-zinc-700 py-5 flex flex-col gap-4  font-semibold tracking-tight text-white items-center justify-center'>
        <div className='flex items-center w-full justify-between'>

            <h1 className='text-white text-xl'>Login As A Seller</h1>

            <button className='hover:scale-97 cursor-pointer' onClick={(e) => {
                e.preventDefault();
                setLoginSellerOpen(false)
            }}>
            <FontAwesomeIcon className='text-md text-white' icon={faXmark} />
            </button>

        </div>

        <div className='w-full flex items-center justify-start'>

        <p className='text-zinc-400 text-xs'>Fill in the required details to login to your seller dashboard.</p>

        </div>

        <div className='flex flex-col gap-1 items-start justify-center w-full'>

            <h1>Full Name</h1>
            <input onChange={(e) => {
                e.preventDefault();
                setFullNameSeller(e.target.value);
            }} className='border rounded-md w-full bg-zinc-800 outline-none border-zinc-700 px-3 py-1.5' type="text" placeholder='Enter your full name' />

            {FullNameError &&
            <p className='text-xs text-red-500 font-semibold tracking-tight pl-2'>{FullNameError}</p>
            }

        </div>

        
       
        <div className='flex flex-col gap-1 items-start justify-center w-full'>

            <h1>Email Address</h1>
            <input onChange={(e) => {
                e.preventDefault();
                setEmailSeller(e.target.value);
            }} className='border rounded-md w-full bg-zinc-800 outline-none border-zinc-700 px-3 py-1.5' type="email" placeholder='Enter your seller email' />

            {EmailError &&
            <p className='text-xs text-red-500 font-semibold tracking-tight pl-2'>{EmailError}</p>
            }

        </div>
        <div className='flex flex-col gap-1 items-start justify-center w-full'>

            <h1>Password</h1>
            <input onChange={(e) => {
                e.preventDefault();
                setPasswordSeller(e.target.value);
            }} className='border rounded-md w-full bg-zinc-800 outline-none border-zinc-700 px-3 py-1.5' type="password" placeholder='Enter your seller password' />

            {PasswordError &&
            <p className='text-xs text-red-500 font-semibold tracking-tight pl-2'>{PasswordError}</p>
            }

        </div>
        
        <div className='flex items-center mt-4 justify-end gap-3 w-full'>

            <button onClick={(e) => {
                e.preventDefault();
                setLoginSellerOpen(false);
            }} className='hover:scale-99 cursor-pointer py-1 px-5 text-lg bg-zinc-800 rounded-md border border-zinc-700'>Register As A Seller</button>
            <button className='hover:scale-99 cursor-pointer py-1 px-5 text-lg bg-[#1d97ef] rounded-md border border-zinc-700 text-white'>Login</button>

        </div>

    </div>
    </form>
    
    </>
  )
}

export default LoginSeller