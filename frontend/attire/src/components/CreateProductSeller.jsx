import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useTheme } from './ThemeContext';
import axios from 'axios';

const CreateProductSeller = () => {
    const {CreateProductOpen, setCreateProductOpen} = useTheme(false);
    const [ProductName, setProductName] = useState('');
    const [ProductCategory, setProductCategory] = useState('');
    const [ProductPrice, setProductPrice] = useState('');
    const [ProductStockQuantity, setProductStockQuantity] = useState('');
    const [ProductSKU, setProductSKU] = useState('');
    const [ProductDescription, setProductDescription] = useState('');
    const [ProductImageUrl, setProductImageUrl] = useState('');
    const [ProductNameError, setProductNameError] = useState('');
    const [ProductCategoryError, setProductCategoryError] = useState('');
    const [ProductPriceError, setProductPriceError] = useState('');
    const [ProductStockError, setProductStockError] = useState('');
    const [ProductDescriptionError, setProductDescriptionError] = useState('');
    const [ProductImageError, setProductImageError] = useState('');
    const { MyProductsClicked, setMyProductsClicked } = useTheme(false); 

    const sendProductCreatedData = async (e) => {
        e.preventDefault();

        const ProductData = {
            ProductName,
            ProductCategory,
            ProductPrice,
            ProductStockQuantity,
            ProductSKU,
            ProductDescription,
            ProductImageUrl
        }

        const res = await axios.post("http://localhost:3000/create-new-product", ProductData, {
            headers: {
                'Content-Type' : 'application/json'
            }, withCredentials: true
        });

            if(res?.data?.success == true){
            console.log(res?.data);
            setCreateProductOpen(false);
            setMyProductsClicked(true);
            
            }
            else if(res?.data?.success == false){
                console.log(res?.data);
                setProductNameError(res?.data?.message1);
                setProductCategoryError(res?.data?.message2);
                setProductPriceError(res?.data?.message3);
                setProductStockError(res?.data?.message4);
                setProductDescriptionError(res?.data?.message5);
                setProductImageError(res?.data?.message6);
            }
       

    }


  return (
    <>

    <form onSubmit={sendProductCreatedData} action="">
    
    <div className=' px-5 bg-zinc-900 rounded-md border border-zinc-700 py-5 flex flex-col gap-4  font-semibold tracking-tight text-white items-center justify-center'>
        <div className='flex items-center w-full justify-between'>

            <h1 className='text-white text-xl'>Add New Product</h1>

            <button className='hover:scale-97 cursor-pointer' onClick={(e) => {
                e.preventDefault();
                setCreateProductOpen(false)
            }}>
            <FontAwesomeIcon className='text-md text-white' icon={faXmark} />
            </button>

        </div>

        <div className='w-full flex items-center justify-start'>

        <p className='text-zinc-400 text-xs'>Fill in the details to add a new product to your store.</p>

        </div>

        <div className='flex flex-col gap-1 items-start justify-center w-full'>

            <h1>Product Name*</h1>
            <input onChange={(e) => {
                e.preventDefault();
                setProductName(e.target.value);
            }} className='border rounded-md w-full bg-zinc-800 outline-none border-zinc-700 px-3 py-1.5' type="text" placeholder='Enter product name' />

            {ProductNameError &&
            <p className='text-xs text-red-500 font-semibold tracking-tight pl-2'>{ProductNameError}</p>
            }

        </div>

        <div className=' flex items-center justify-center gap-4 w-full'>
            <div className='flex flex-col gap-1 items-start justify-center w-full'>

            <h1>Category*</h1>
            <input onChange={(e) => {
                e.preventDefault();
                setProductCategory(e.target.value);
            }} className='border rounded-md w-full bg-zinc-800 outline-none border-zinc-700 px-3 py-1.5' type="text" placeholder='Enter category name' />

            {ProductCategoryError &&
            <p className='text-xs text-red-500 font-semibold tracking-tight pl-2'>{ProductCategoryError}</p>
            }

        </div>
        <div className='flex flex-col gap-1 items-start justify-center w-full'>

            <h1>Price(₹)*</h1>
            <input onChange={(e) => {
                e.preventDefault();
                setProductPrice(e.target.value);
            }} className='border rounded-md w-full bg-zinc-800 outline-none border-zinc-700 px-3 py-1.5' type="number" step='any' placeholder='Enter price' />

            {ProductPriceError &&
            <p className='text-xs text-red-500 font-semibold tracking-tight pl-2'>{ProductPriceError}</p>
            }

        </div>
        </div>
        <div className=' flex items-center justify-center gap-4 w-full'>
            <div className='flex flex-col gap-1 items-start justify-center w-full'>

            <h1>Stock Quantity*</h1>
            <input onChange={(e) => {
                e.preventDefault();
                setProductStockQuantity(e.target.value);
            }} className='border rounded-md w-full bg-zinc-800 outline-none border-zinc-700 px-3 py-1.5' type="text" placeholder='Enter stock quantity' />

            {ProductStockError &&
            <p className='text-xs text-red-500 font-semibold tracking-tight pl-2'>{ProductStockError}</p>
            }

        </div>
        <div className='flex flex-col gap-1 items-start justify-center w-full'>

            <h1>SKU (Optional)</h1>
            <input onChange={(e) => {
                e.preventDefault();
                setProductSKU(e.target.value);
            }} className='border rounded-md w-full bg-zinc-800 outline-none border-zinc-700 px-3 py-1.5' type="text" placeholder='Enter SKU' />

        </div>
        </div>

        <div className='flex flex-col gap-1 items-start justify-center w-full'>

            <h1>Product Description*</h1>
            <textarea onChange={(e) => {
                e.preventDefault();
                setProductDescription(e.target.value);
            }} className='border rounded-md resize-none w-full bg-zinc-800 outline-none border-zinc-700 px-3 py-1.5' type="text" placeholder='Enter product description' />

            {ProductDescriptionError &&
            <p className='text-xs text-red-500 font-semibold tracking-tight pl-2'>{ProductDescriptionError}</p>
            }

        </div>
        <div className='flex flex-col gap-1 items-start justify-center w-full'>

            <h1>Product Image*</h1>
            <input onChange={(e) => {
                e.preventDefault();
                setProductImageUrl(e.target.value);
            }} className='border rounded-md w-full bg-zinc-800 outline-none border-zinc-700 px-3 py-1.5' type="text" placeholder='Enter product image url' />

            {ProductImageError &&
            <p className='text-xs text-red-500 font-semibold tracking-tight pl-2'>{ProductImageError}</p>
            }

        </div>
        
        <div className='flex items-center justify-end gap-3 w-full'>

            <button onClick={(e) => {
                e.preventDefault();
                setCreateProductOpen(false);
            }} className='hover:scale-99 cursor-pointer py-1 px-5 text-lg bg-zinc-800 rounded-md border border-zinc-700'>Cancel</button>
            <button className='hover:scale-99 cursor-pointer py-1 px-5 text-lg bg-[#efa91d] rounded-md border border-amber-700 text-black'>Add Product</button>

        </div>

    </div>
    </form>
    
    </>
  )
}

export default CreateProductSeller