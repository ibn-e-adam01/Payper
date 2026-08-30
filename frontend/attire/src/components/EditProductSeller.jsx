import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useTheme } from './ThemeContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditProductSeller = () => {
    const {CreateProductOpen, setCreateProductOpen} = useTheme(false);
    const {EditProductOpen, setEditProductOpen} = useTheme(false);
    const [ExpectedDeliveryDate, setExpectedDeliveryDate] = useState('00-00-0000');
    const [StatusOrder, setStatusOrder] = useState('processing...');
    const [Shipped, setShipped] = useState('false');
    const navigate = useNavigate();
    const [FullNameError, setFullNameError] = useState('');
    const [EmailError, setEmailError] = useState('');
    const [PasswordError, setPasswordError] = useState('');
    const { MyProductsClicked, setMyProductsClicked } = useTheme(false); 
    const { LoginSellerOpen, setLoginSellerOpen } = useTheme(false); 
    const {Seller, setSeller} = useTheme([]);


  return (
    <>

    {Seller?.length > 0 && Seller.map((product) => (
    <form onSubmit={async (e) => {
        e.preventDefault();

        const ExtraRequiredProductData = {
           ExpectedDeliveryDate,
           StatusOrder,
           Shipped
        }

        const UpdateProductRes = await axios.patch(`http://localhost:3000/updateProduct/${product?._id}`, ExtraRequiredProductData, {withCredentials: true});
        
        if(UpdateProductRes?.data?.success == true){
            console.log(UpdateProductRes?.data);
            setEditProductOpen(false);
        }   

            else if(res?.data?.success == false){
                console.log(res?.data);
                setFullNameError(res?.data?.messageFullName);
                setEmailError(res?.data?.messageEmail || res?.data?.messageNotFound);
                setPasswordError(res?.data?.messagePassword || res?.data?.messageWrongPWD);
            }
       

    }
} action="">
    
    <div className=' px-5 bg-zinc-900 rounded-md border border-zinc-700 py-5 flex flex-col gap-4  font-semibold tracking-tight text-white items-center justify-center'>
        <div className='flex items-center w-full justify-between'>

            <h1 className='text-white text-xl'>Update your product details</h1>

            <button className='hover:scale-97 cursor-pointer' onClick={(e) => {
                e.preventDefault();
                setEditProductOpen(false)
            }}>
            <FontAwesomeIcon className='text-md text-white' icon={faXmark} />
            </button>

        </div>

        <div className='w-full flex items-center justify-start'>

        <p className='text-zinc-400 text-xs'>Fill in the required details to keep your customer's product service up-to-date.</p>

        </div>

        <div className='flex flex-col gap-1 items-start justify-center w-full'>

            <h1>Expected Delivery Date*</h1>
            <input onChange={(e) => {
                e.preventDefault();
                setExpectedDeliveryDate(e.target.value);
            }} className='border rounded-md w-full bg-zinc-800 outline-none border-zinc-700 px-3 py-1.5' type="text" placeholder={ExpectedDeliveryDate} />

            {FullNameError &&
            <p className='text-xs text-red-500 font-semibold tracking-tight pl-2'>{FullNameError}</p>
            }

        </div>

        
       
        <div className='flex flex-col gap-1 items-start justify-center w-full'>

            <h1>Status*</h1>
            <input onChange={(e) => {
                e.preventDefault();
                setStatusOrder(e.target.value);
            }} className='border rounded-md w-full bg-zinc-800 outline-none border-zinc-700 px-3 py-1.5' type="text" placeholder={StatusOrder} />

            {EmailError &&
            <p className='text-xs text-red-500 font-semibold tracking-tight pl-2'>{EmailError}</p>
            }

        </div>
        <div className='flex flex-col gap-1 items-start justify-center w-full'>

            <h1>Shipped*</h1>
            <input onChange={(e) => {
                e.preventDefault();
                setShipped(e.target.value);
            }} className='border rounded-md w-full bg-zinc-800 outline-none border-zinc-700 px-3 py-1.5' type="password" placeholder={Shipped} />

            {PasswordError &&
            <p className='text-xs text-red-500 font-semibold tracking-tight pl-2'>{PasswordError}</p>
            }

        </div>
        
        <div className='flex items-center mt-4 justify-end gap-3 w-full'>

            <button onClick={(e) => {
                e.preventDefault();
                setEditProductOpen(false);
            }} className='hover:scale-99 cursor-pointer py-1 px-5 text-lg bg-zinc-800 rounded-md border border-zinc-700'>Cancel</button>
            <button className='hover:scale-99 cursor-pointer py-1 px-5 text-lg bg-[#781def] rounded-md border border-zinc-700 text-white'>Update</button>

        </div>

    </div>
    </form>
    ))}
    
    </>
  )
}

export default EditProductSeller