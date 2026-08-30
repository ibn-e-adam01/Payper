import { faArrowTrendUp, faBagShopping, faCalendarDays, faChevronDown, faCube, faIndianRupeeSign, faPenToSquare, faPlus, faStar, faTrashCan, faWallet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import FourStarYellow from '../assets/FourStarYellow.png'
import { Link } from 'react-router-dom'
import CreateProductSeller from './CreateProductSeller'
import { useTheme } from './ThemeContext'
import axios from 'axios'
import { useState } from 'react'
import EditProductSeller from './EditProductSeller'

const MyProductsSeller = () => {

    const {CreateProductOpen, setCreateProductOpen} = useTheme(false); 
    const {EditProductOpen, setEditProductOpen} = useTheme(false); 
    const [MyProductsSeller, setMyProductsSeller] = useState([]);
    const [ProductId, setProductId] = useState('');
    const {Seller, setSeller} = useTheme([]);
    
    useEffect(() => {
        
        const getMyProducts = async (e) => {

            const getProductsCreated = await axios.get('http://localhost:3000/seller/MyProducts', {withCredentials: true});

            console.log(getProductsCreated?.data?.MyProducts);
            setMyProductsSeller(getProductsCreated?.data?.MyProducts);

        }

        getMyProducts();


    },[]);




  return (
    <>
    
    <main className='flex w-full h-screen items-center justify-start flex-col gap-1 px-2 lg:px-5 py-2 bg-zinc-950'>

    {EditProductOpen == true &&
            
        <div className='fixed top-0 z-30 md:px-0 px-4 bg-[#00000082] h-full flex left-0 w-full justify-center items-center '>
        <EditProductSeller />
            
        </div>
               
    }
   

   {CreateProductOpen == true &&

   <div className='fixed top-0 z-30 bg-[#00000082] h-full flex left-0 w-full justify-center items-center '>
   <CreateProductSeller CreateProductOpen={CreateProductOpen} setCreateProductOpen={setCreateProductOpen} />

   </div>
   
   }
   
    <div className='w-full h-auto py-1 px-3 flex items-center justify-between'>

   <div className='w-full flex flex-col items-start justify-center gap-1'>
    <h1 className='text-lg font-semibold tracking-tight text-white'>Overview</h1>
    <h1 className='text-xs font-semibold tracking-tight text-zinc-400'>Manage & view all the products, you've added.</h1>
    </div>

    <div className='px-2 py-1   w-1/4  rounded-md text-white flex items-center justify-center gap-1'>

    
   
        <Link onClick={(e) => {
            e.preventDefault();
            setCreateProductOpen(true);
        }} className={`w-full h-10 rounded-md tracking-tight font-semibold border bg-[#f7a503] border-[#eba51a] text-black  hover:scale-99 gap-2 flex items-center justify-start px-4 text-lg`}><FontAwesomeIcon icon={faPlus} /> Add New Product</Link>
      

    </div>
    </div>

    
    <div className='ProductCon w-full flex items-center bg-zinc-900 flex-col h-screen border border-zinc-700 rounded-md justify-start gap-2 px-5 py-5 mb-5'>

        <div className='w-full flex items-center justify-end gap-3'>

        <div className=' bg-zinc-950 flex items-center justify-center gap-2 rounded-md border border-zinc-700 font-semibold tracking-tight px-4.5 py-1.5 text-white text-sm'>
            <h1>All Categories</h1>
            <FontAwesomeIcon className='text-xs' icon={faChevronDown}/>
        </div>
        <div className=' bg-zinc-950 flex items-center justify-center gap-2 rounded-md border border-zinc-700 font-semibold tracking-tight px-4.5 py-1.5 text-white text-sm'>
            <h1>Sort by:</h1>
            <div className='flex items-center justify-center gap-3'>
                <h1>Latest</h1>
            <FontAwesomeIcon className='text-xs' icon={faChevronDown}/>
            </div>
        </div>
        </div>

        <div className='BORDER w-full h-[0.02rem] bg-zinc-800 mb-3 mt-3'></div>
        <div className='w-full flex items-center justify-start gap-4 font-semibold tracking-tight text-zinc-400 text-sm'>

        <div className='w-1/10 flex items-center justify-center'>
        <h1>Product</h1>
        </div>
        <div className='w-8/10 pl-3 flex items-center justify-center gap-27'>
        <h1>Category</h1>
       
        
        <h1>Price</h1>
   
        <h1>Quantity</h1>
        
        <h1>Status</h1>
        </div>

        </div>
        <div className='BORDER w-full h-[0.02rem] bg-zinc-800 mb-3 mt-3'></div>

        {MyProductsSeller?.length > 0 && MyProductsSeller?.map((product) => (
        
        <div className='w-full px-3 py-3 flex items-center justify-between'>

            <div className='w-full flex items-center justify-center gap-3'>

                <div className='w-17 h-17 rounded-md overflow-hidden flex items-center justify-center'>
                    <img src={product?.images} alt="" />

                </div>

                <div className='flex w-full items-start font-semibold tracking-tight text-white justify-center -gap-1 flex-col'>
                    <h1>{product?.productName}</h1>
                    <p className='text-xs text-zinc-300'>SKU: {product?.SKU}</p>
                    <p className='text-xs text-zinc-300'>Added on {(product?.date).split('T')[0].split('-').reverse().join('-')}</p>

                </div>
            </div>

            <div className='w-1/2 flex flex-col items-start font-semibold tracking-tight text-white justify-center gap-1 ml-10'>

                <h1>{product?.category}</h1>
                {/* <p className='text-xs text-zinc-300'>Watch</p> */}

            </div>
            <div className='w-1/2 flex flex-col items-start font-semibold tracking-tight text-white justify-center gap-1'>

                <h1>₹{product?.price}</h1>

            </div>
            <div className='w-1/2 flex flex-col items-start font-semibold tracking-tight text-white justify-center gap-1'>

                <h1>{product?.stockQuantity}</h1>

            </div>
            <div className='w-1/4 px-1 py-0.5 rounded-md border-[#00800967] border-2 bg-[#0080092f] flex flex-col items-center font-semibold tracking-tight text-green-400 justify-center gap-1 mr-20'>

                <h1>{product?.status}</h1>

            </div>
            <div className='w-1/2 px-1 py-0.5  flex items-center font-semibold tracking-tight text-white justify-center gap-4'>
                <button onClick={async (e) => {

                    setEditProductOpen(true);

                }}>
                <FontAwesomeIcon className='text-xl text-[#ffc247] hover:scale-97 cursor-pointer' icon={faPenToSquare}/>
                </button>
                <button onClick={ async (e) => {

                    const deleteRes = await axios.delete(`http://localhost:3000/delete/${product?._id}`, {withCredentials: true});

                    if(deleteRes?.data?.success == true){
                    console.log(deleteRes?.data?.message);
                    }

                }}>
                <FontAwesomeIcon className='text-xl text-red-500 hover:scale-97 cursor-pointer' icon={faTrashCan}/>
                </button>

            </div>



        </div>
        ))}

    </div>
    
    

    
    </main>
    
    </>
  )
}

export default MyProductsSeller