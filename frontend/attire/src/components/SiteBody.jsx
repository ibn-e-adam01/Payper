import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart, faStar, faMagnifyingGlass, faCartPlus, faHeartCirclePlus, faHeartCircleMinus, faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import SideBarHomeMobile from './SideBarHomeMobile';
import axios from 'axios';
import { useTheme } from './ThemeContext';

const SiteBody = ({HomeMenuIsOpen, setHomeMenuIsOpen, NoOfCarted,setNoOfCarted}) => {
    const navigate = useNavigate();
    const [ProductArray, setProductArray] = useState([]);
    const [SingleProductArray, setSingleProductArray] = useState([]);
    const [ProductID, setProductID] = useState('');
    const [TransactionID, setTransactionID] = useState({});
    const [ProductIsCarted, setProductIsCarted] = useState({});
    const [HeartClicked, setHeartClicked] = useState({});
    const [UserID, setUserID] = useState('')
    const { EnabledDark, setEnabledDark } = useTheme(false); 

    useEffect(() => {
        const getDummyProducts = async () => {
            let getProducts = await axios.get('https://dummyjson.com/products', {
                headers:{
                    'Content-Type': 'application/json'
                },
                withCredentials: false
            });

            if(getProducts?.data){
                console.log(getProducts?.data.products);
                setProductArray(getProducts?.data?.products);
            }
        }

        getDummyProducts();

        const getDummySingleProduct = async () => {
            let getSingleProduct = await axios.get('https://fakestoreapi.com/products/3', {
                headers:{
                    'Content-Type': 'application/json'
                },
                withCredentials: false
            });

            if(getSingleProduct?.data){
                console.log(getSingleProduct?.data);
                setSingleProductArray([getSingleProduct?.data] || []);
            }
        }

        getDummySingleProduct();

        const getUserData = async () => {
                    let userData = await axios.get("http://localhost:3000/", {
                        withCredentials: true
                    });
        
                    if(userData?.data?.success == true){
                        setUserID(userData?.data?.user._id)
                        console.log(userData?.data?.user._id)
                        setNoOfCarted([userData?.data?.user.cartProducts]);
                    } 
        
                }
        
                getUserData();
            
    }, []);

    

  return (
    <>
    
    <main className={`w-full h-auto flex-col gap-5 flex  items-center justify-center lg:px-13 px-7 md:px-20 absolute -z-10 md:top-13 top-13 ${EnabledDark == true? 'bg-zinc-900 text-white' : 'bg-zinc-100'}`}>

    {HomeMenuIsOpen == true &&
    <div className='flex h-full w-full absolute bg-[#11111189] -top-18 z-10 lg:hidden'>
    <SideBarHomeMobile />
    </div>
    }

        <div className={`flex items-center justify-start gap-1 md:mt-9 lg:hidden w-full  px-3 py-0.5 rounded-xs ${EnabledDark == true? 'bg-zinc-800 text-zinc-100 mt-3' : 'bg-zinc-200 text-zinc-800 mt-3'}`}>
            <FontAwesomeIcon className='text-zinc-400' icon={faMagnifyingGlass} />
        <input type="text" placeholder='Search' className='text-lg font-normal w-full px-1 outline-none placeholder:text-zinc-400'/>
        </div>
        <div className={`w-full md:mt-6  ${EnabledDark == true? 'bg-[#efeded] text-zinc-900' : 'bg-[#EBEDE3] text-zinc-800'} h-auto py-4 rounded-sm flex items-center justify-between px-4 md:px-25 overflow-hidden`}>
            <div className='flex flex-col items-start justify-center gap-1'>
                <h1 className='text-4xl font-bold tracking-tighter'>Minimal Style.</h1>
                <h1 className='text-4xl font-bold tracking-tighter'>Maximal Comfort.</h1>
                <h1 className='text-lg px-0.5 font-semibold tracking-tighter'>Shop the collection.</h1>
                <Link className='text-lg font-semibold  tracking-tighter px-0.5 underline'>[Shop Now]</Link>
            </div>
            <div className='overflow-hidden hidden md:flex w-80 h-full'>
            <img className='object-contain mix-blend-multiply' src="https://img.magnific.com/free-photo/shirt_1203-8194.jpg?semt=ais_test_b&w=740&q=80" alt="" />
            </div>
        </div>

        <div className='w-full flex flex-col items-center justify-center'>
            <div className='w-full flex items-center justify-start'><h1 className='text-lg font-bold tracking-tight'>Featured Products</h1></div>
            
            <div className='Product-Container grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 lg:grid-cols-4 gap-y-7 xl:gap-x-10 md:gap-x-5 2xl:grid-cols-11 2xl:gap-x-10 lg:gap-x-14 gap-x-2.5 w-full py-6'>
                {ProductArray.length > 0 && ProductArray?.map((product) => {

                     const isThisProductCarted = !!ProductIsCarted[product.id];
                     const isThisHeartClicked = !!HeartClicked[product.id];
                     const isThisProductPurchased = !!TransactionID[product.id];

                    return( //explicit (zabardasti) return
                    
                <div key={product.id} className='Product-Box h-80 w-full flex items-start justify-start gap-2 flex-col'>
                    <div className={`${EnabledDark == true? 'bg-zinc-800' : 'bg-zinc-200'} h-full  w-full overflow-hidden flex items-center justify-center`}>
                        <img className='object-cover h-35' src={product?.images[0]} alt="" />
                    </div>
                    <h1 className='text-lg font-bold tracking-tighter'>{product?.title}</h1>
                    <h1 className='text-sm font-semibold font tracking-tighter -mt-2'>{product?.category}</h1>
                    <div className='flex items-center justify-center gap-1'>
                    <h1 className='text-lg font-bold tracking-tighter -mt-2'>${product?.price}</h1>
                    <h1 className='text-sm font-semibold tracking-tighter -mt-2'>( {product?.discountPercentage}% off )</h1>
                    </div>
                    <div className=' flex items-center justify-between w-full mt-3'>
                        <button onClick={ async (e) => {
                            e.preventDefault();
                            navigate('/product-purchase')
                           
                    }} className='cursor-pointer hover:bg-blue-900 hover:scale-99 h-auto w-27 py-1 rounded-sm font-semibold tracking-tight bg-blue-800 flex items-center justify-center text-white '>{isThisProductPurchased? 'Purchased' : 'Buy'}</button>
                    <div className='flex items-center justify-center'>
                        <button onClick={async (e) => {
                            e.preventDefault();

                            setProductIsCarted(prev => ({
                                 ...prev,
                                 [product.id]: !prev[product.id]
                                }));            

                            setProductID(product.id);

                            if(!isThisProductCarted == true){
                            let userWithCart = await axios.post(`http://localhost:3000/addToCart/${product.id}`, `${product.id}`, {
                                withCredentials:true
                            });

                            if(userWithCart?.data?.success){
                                console.log(userWithCart?.data.message);
                            }

                            } else if (!isThisProductCarted == false){
                                let removeFromCart = await axios.patch(`http://localhost:3000/removeFromCart/${product.id}`, `${product.id}`, {
                                    withCredentials: true
                                });

                                if(removeFromCart?.data?.success){
                                    console.log(removeFromCart?.data)
                                }
                            }

                        }} className={`cursor-pointer hover:scale-99 ${isThisProductCarted == true? 'bg-zinc-300' : ''}  ${EnabledDark == true? `${isThisProductCarted == true? 'bg-zinc-700' : 'bg-zinc-800'}` : 'bg-zinc-200'} mr-3 md:mr-1.5 px-1.5 py-1 rounded-sm`}>
                           {isThisProductCarted == true ? <FontAwesomeIcon icon={faCartShopping} /> : <FontAwesomeIcon icon={faCartPlus} />}
                        </button>
                        <button onClick={(e) => {
                            e.preventDefault();

                            

                            setHeartClicked(prev => ({
                                 ...prev,
                                 [product.id]: !prev[product.id]
                                }));  
                            

                        }} className={`cursor-pointer hover:scale-99 ${isThisHeartClicked == true? 'bg-zinc-300' : ''}  ${EnabledDark == true? `${isThisHeartClicked == true? 'bg-zinc-700' : 'bg-zinc-800'}` : 'bg-zinc-200'} px-1.5 py-1 rounded-sm`}>
                            {isThisHeartClicked == true? <FontAwesomeIcon icon={faHeartCircleMinus} /> : <FontAwesomeIcon icon={faHeartCirclePlus} />}
                        </button>
                        </div>
                    </div>
                        
                </div>
                )
            })}
                  

            </div>
        </div>

            {SingleProductArray.length > 0 && SingleProductArray.map((product) => (

            <div key={product.id} className={`w-full h-auto py-7 ${EnabledDark == true ? 'bg-zinc-800' : 'bg-zinc-200 text-black'} mb-7 flex md:flex-row flex-col items-center justify-center md:justify-between md:px-7 lg:px-37  px-6`}>


                <div className='overflow-hidden mb-5 flex md:hidden w-50 h-full'>
            <img className='object-contain ' src={product?.image} alt="" />
            </div>

            <div className='flex items-start justify-center w-full flex-col gap-2'>
                
                <h1 className={`${EnabledDark == true? 'text-[#EAE0CF]' : 'text-zinc-700'}  2xl:text-7xl xl:text-5xl text-3xl font-bold tracking-tighter`}>BIG BILLION SALE!!!</h1>
                <h1 className={`${EnabledDark == true? 'text-zinc-100' : 'text-blue-500'} 2xl:text-6xl xl:text-4xl text-2xl font-bold tracking-tighter`}>{product?.title}</h1>
                <h3 className={`${EnabledDark? 'text-emerald-400' : 'text-zinc-600'} xl:text-2xl 2xl:text-3xl text-xl font-semibold tracking-tighter`}>Rating ( {product.rating.rate}<FontAwesomeIcon className='text-sm text-orange-400' icon={faStar} /> )</h3>
                <div className='flex items-end justify-center gap-2'>
                <h3 className='text-2xl xl:text-3xl 2xl:text-4xl font-bold tracking-tighter'>${((product?.price)*10/100).toFixed(2)}</h3>
                <h3 className=' text-sm xl:text-md 2xl:text-lg font-semibold tracking-tighter line-through mb-1'>${product?.price}</h3>
                </div>
                <Link className='mt-6 hover:bg-orange-500 hover:scale-99 text-zinc-950 font-bold tracking-tight bg-emerald-400 w-auto px-4 py-1.5 rounded-4xl h-auto '>Shop Now</Link>
            </div>


            <div className='overflow-hidden hidden md:flex w-80 md:w-80 lg:w-80 h-full'>
            <img className='object-contain' src={product?.image} alt="" />
            </div>
            </div>
            ))}


            <div className='h-full overflow-hidden w-full gap-x-3 2xl:grid-cols-6 xl:grid-cols-4 gap-y-3 grid md:grid-cols-2 lg:grid-cols-3 mb-10'>
                <div className={`${EnabledDark == true? 'bg-zinc-800' : 'bg-zinc-200 text-black'} h-auto px-4 py-4 flex items-start gap-1 justify-start flex-col w-full`}>
                    <h1 className='text-3xl font-bold tracking-tighter'>Featured in Kitchen</h1>

                    <div className='overflow-hidden mb-5 mt-5 flex md:hidden w-50 h-full'>
            <img className='object-contain ' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKfuWbbeGbP3TwZEHcO-DAtY5XFStCrLqiWKXWodmE-Mx4WHovamn9CXs&s=10' alt="" />
            </div>

                    <div className='mt-4 overflow-hidden hidden md:flex w-80 xl:w-73 md:w-66 lg:w-66 mb-4 h-full'>
                    <img className='object-contain' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKfuWbbeGbP3TwZEHcO-DAtY5XFStCrLqiWKXWodmE-Mx4WHovamn9CXs&s=10" alt="" />
                    </div>

                    <h1 className=' text-lg font-semibold tracking-tighter'>Starts from</h1>

                <div className='flex items-center justify-center gap-2'>

                <h3 className=' text-2xl font-semibold tracking-tighter'>$999.99</h3>
                <h3 className=' text-sm font-semibold tracking-tighter line-through mb-1'>$2999.00</h3>
                </div>

                <Link className='text-blue-400 text-sm font-semibold mt-2 hover:underline active:underline'>Shop Now</Link>

                </div>
                <div className={`${EnabledDark == true? 'bg-zinc-800' : 'bg-zinc-200 text-black'} h-auto px-4 py-4 flex items-start gap-1 justify-start flex-col w-full `}>
                    <h1 className='text-3xl font-bold tracking-tighter'>Featured in Kitchen</h1>

                    <div className='overflow-hidden mb-5 mt-5 flex md:hidden w-50 h-full'>
                <img className='object-contain ' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKfuWbbeGbP3TwZEHcO-DAtY5XFStCrLqiWKXWodmE-Mx4WHovamn9CXs&s=10' alt="" />
                </div>

                    <div className='mt-4 overflow-hidden hidden md:flex w-80 xl:w-73 md:w-66 lg:w-66 mb-4 h-full'>
                    <img className='object-contain' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKfuWbbeGbP3TwZEHcO-DAtY5XFStCrLqiWKXWodmE-Mx4WHovamn9CXs&s=10" alt="" />
                    </div>

                    <h1 className=' text-lg font-semibold tracking-tighter'>Starts from</h1>

                <div className='flex items-center justify-center gap-2'>

                <h3 className=' text-2xl font-semibold tracking-tighter'>$999.99</h3>
                <h3 className=' text-sm font-semibold tracking-tighter line-through mb-1'>$2999.00</h3>
                </div>

                <Link className='text-blue-400 text-sm font-semibold mt-2 hover:underline active:underline'>Shop Now</Link>

                </div>
                <div className={`${EnabledDark == true? 'bg-zinc-800' : 'bg-zinc-200 text-black'} h-auto px-4 py-4 flex items-start gap-1 justify-start flex-col w-full `}>
                    <h1 className='text-3xl font-bold tracking-tighter'>Featured in Kitchen</h1>

                    <div className='overflow-hidden mb-5 mt-5 flex md:hidden w-50 h-full'>
                    <img className='object-contain ' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKfuWbbeGbP3TwZEHcO-DAtY5XFStCrLqiWKXWodmE-Mx4WHovamn9CXs&s=10' alt="" />
                    </div>       

                    <div className='mt-4 overflow-hidden hidden md:flex w-80 xl:w-73 md:w-66 lg:w-66 mb-4 h-full'>
                    <img className='object-contain' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKfuWbbeGbP3TwZEHcO-DAtY5XFStCrLqiWKXWodmE-Mx4WHovamn9CXs&s=10" alt="" />
                    </div>

                    <h1 className=' text-lg font-semibold tracking-tighter'>Starts from</h1>

                <div className='flex items-center justify-center gap-2'>

                <h3 className=' text-2xl font-semibold tracking-tighter'>$999.99</h3>
                <h3 className=' text-sm font-semibold tracking-tighter line-through mb-1'>$2999.00</h3>
                </div>

                <Link className='text-blue-400 text-sm font-semibold mt-2 hover:underline active:underline'>Shop Now</Link>

                </div>
                <div className={`${EnabledDark == true? 'bg-zinc-800' : 'bg-zinc-200 text-black'} h-auto px-4 lg:hidden py-4 flex xl:flex items-start gap-1 justify-start flex-col w-full `}>
                    <h1 className='text-3xl font-bold tracking-tighter'>Featured in Kitchen</h1>

                <div className='overflow-hidden mb-5 mt-5 flex md:hidden w-50 h-full'>
                <img className='object-contain ' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKfuWbbeGbP3TwZEHcO-DAtY5XFStCrLqiWKXWodmE-Mx4WHovamn9CXs&s=10' alt="" />
                </div>      

                    <div className='mt-4 overflow-hidden hidden md:flex w-80 md:w-66 lg:w-73 mb-4 h-full'>
                    <img className='object-contain' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKfuWbbeGbP3TwZEHcO-DAtY5XFStCrLqiWKXWodmE-Mx4WHovamn9CXs&s=10" alt="" />
                    </div>

                    <h1 className=' text-lg font-semibold tracking-tighter'>Starts from</h1>

                <div className='flex items-center justify-center gap-2'>

                <h3 className=' text-2xl font-semibold tracking-tighter'>$999.99</h3>
                <h3 className=' text-sm font-semibold tracking-tighter line-through mb-1'>$2999.00</h3>
                </div>

                <Link className='text-blue-400 text-sm font-semibold mt-2 hover:underline active:underline'>Shop Now</Link>

                </div>
                <div className={`${EnabledDark == true? 'bg-zinc-800' : 'bg-zinc-200 text-black'} h-auto px-4 xl:hidden py-4 hidden 2xl:flex items-start gap-1 justify-start flex-col w-full `}>
                    <h1 className='text-3xl font-bold tracking-tighter'>Featured in Kitchen</h1>

                <div className='overflow-hidden mb-5 mt-5 flex md:hidden w-50 h-full'>
                <img className='object-contain ' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKfuWbbeGbP3TwZEHcO-DAtY5XFStCrLqiWKXWodmE-Mx4WHovamn9CXs&s=10' alt="" />
                </div>      

                    <div className='mt-4 overflow-hidden hidden md:flex w-80 md:w-66 lg:w-73 mb-4 h-full'>
                    <img className='object-contain ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKfuWbbeGbP3TwZEHcO-DAtY5XFStCrLqiWKXWodmE-Mx4WHovamn9CXs&s=10" alt="" />
                    </div>

                    <h1 className=' text-lg font-semibold tracking-tighter'>Starts from</h1>

                <div className='flex items-center justify-center gap-2'>

                <h3 className=' text-2xl font-semibold tracking-tighter'>$999.99</h3>
                <h3 className=' text-sm font-semibold tracking-tighter line-through mb-1'>$2999.00</h3>
                </div>

                <Link className='text-blue-400 text-sm font-semibold mt-2 hover:underline active:underline'>Shop Now</Link>

                </div>
                <div className={`${EnabledDark == true? 'bg-zinc-800' : 'bg-zinc-200 text-black'} h-auto px-4 hidden xl:hidden py-4 2xl:flex items-start gap-1 justify-start flex-col w-full `}>
                    <h1 className='text-3xl font-bold tracking-tighter'>Featured in Kitchen</h1>

                <div className='overflow-hidden mb-5 mt-5 flex md:hidden w-50 h-full'>
                <img className='object-contain ' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKfuWbbeGbP3TwZEHcO-DAtY5XFStCrLqiWKXWodmE-Mx4WHovamn9CXs&s=10' alt="" />
                </div>      

                    <div className='mt-4 overflow-hidden hidden md:flex w-80 md:w-66 lg:w-73 mb-4 h-full'>
                    <img className='object-contain' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKfuWbbeGbP3TwZEHcO-DAtY5XFStCrLqiWKXWodmE-Mx4WHovamn9CXs&s=10" alt="" />
                    </div>

                    <h1 className=' text-lg font-semibold tracking-tighter'>Starts from</h1>

                <div className='flex items-center justify-center gap-2'>

                <h3 className=' text-2xl font-semibold tracking-tighter'>$999.99</h3>
                <h3 className=' text-sm font-semibold tracking-tighter line-through mb-1'>$2999.00</h3>
                </div>

                <Link className='text-blue-400 text-sm font-semibold mt-2 hover:underline active:underline'>Shop Now</Link>

                </div>
                
            </div>
            

    </main>

    </>
  )
}

export default SiteBody