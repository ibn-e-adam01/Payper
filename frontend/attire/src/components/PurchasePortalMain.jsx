import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faCreditCard, faLock, faHandHoldingDollar, faMoneyBillTransfer, faPuzzlePiece, faGripLinesVertical, faHandsBubbles, faBacterium, faFeather, faGripVertical, faTruckFast, faShieldHeart, faShieldHalved, faPersonWalkingArrowLoopLeft, faHeadset, faAngleDown} from '@fortawesome/free-solid-svg-icons';
import mastercard from '../assets/mastercard.png'
import visaCard from '../assets/visaCard.png'
import GooglePayAppLogo from '../assets/GooglePayAppLogo.png'
import PaytmAppLogo from '../assets/PaytmAppLogo.png'
import rating4Stars from '../assets/rating4Stars.png'
import JammuandKashmirBankAppLogo from '../assets/JammuandKashmirBankAppLogo.png'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import PaymentDonePopUp from './PaymentDonePopUp';
import { useTheme } from './ThemeContext';
import SideBarProfileMobile from './SideBarProfileMobile';

const PurchasePortalMain = ({MenuIsOpen, setMenuIsOpen}) => {


    const [CODClicked, setCODClicked] = useState(false);
     const { EnabledDark, setEnabledDark } = useTheme(false); 
     const { PopUpPaidShow ,setPopUpPaidShow } = useTheme(false); 
     const { TransactionID ,setTransactionID } = useTheme(''); 
    const [OnlinePayClicked, setOnlinePayClicked] = useState(false);
    const [CurrencyOpen, setCurrencyOpen] = useState(false);
    const {TestingPayClicked, setTestingPayClicked} = useTheme(true);
    const [UserID, setUserID] = useState('');
    const [Error, setError] = useState('');
    const [Currency, setCurrency] = useState('USD');
    const BACKEND_LIVE_URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
         const getUserData = async () => {
            let userData = await axios.get(`${BACKEND_LIVE_URL}/`, {
                withCredentials: true
            });
                
            if(userData?.data?.success == true){
                setUserID(userData?.data?.user._id)
                console.log(userData?.data?.user._id)
            } 
                
        }
                
        getUserData();
    })
  return (

    <>
    
    {MenuIsOpen == true &&
        <div className='flex h-full w-full absolute -top-18 bg-[#11111189] z-10 lg:hidden'>
        <SideBarProfileMobile EnabledDark={EnabledDark} setEnabledDark={setEnabledDark}/>
        </div>
    }

    <div className={`w-full h-full md:px-13 px-5 py-5 gap-5 ${EnabledDark == true? 'bg-zinc-950 text-white' : ''}  relative top-11`}>

        <div className='w-full h-auto py-4 gap-2 flex items-center justify-start'>
            <Link to='/' className={`${EnabledDark == true? 'hover:text-zinc-200 text-zinc-300' : 'hover:text-zinc-900 text-zinc-600'} text-xs lg:text-md font-semibold`}>Home</Link>
            <FontAwesomeIcon className={`${EnabledDark == true? 'text-zinc-300' : ' text-zinc-600'} text-xs lg:text-md font-semibold`} icon={faAngleRight} />
            <Link className={`${EnabledDark == true? 'hover:text-zinc-200 text-zinc-300' : 'hover:text-zinc-900 text-zinc-600'} text-xs lg:text-md font-semibold`}>Kitchen Accessories</Link>
            <FontAwesomeIcon className={`${EnabledDark == true? 'text-zinc-300' : ' text-zinc-600'} text-xs lg:text-md font-semibold`} icon={faAngleRight} />
            <Link className={`font-semibold text-xs lg:text-md ${EnabledDark == true? 'text-zinc-100' : 'text-zinc-950'}`}>Black Whisk</Link>
        </div>

        <div className='flex lg:flex-row flex-col items-start mt-2 w-full justify-center gap-3'>

            <div className='productDetails&Support gap-5 flex items-center flex-col justify-center w-full h-auto'>

            <div className={`productDetails h-auto flex lg:flex-row flex-col items-start justify-between gap-7 px-5 py-5 w-full border ${EnabledDark == true? 'border-zinc-800' : 'border-zinc-300'} rounded-md`}>

            <div className='flex flex-col items-start justify-center gap-3'>
            
            <div className='flex items-center rounded-md bg-zinc-200 lg:h-80 lg:w-80 h-40 w-40 xl:h-129 xl:w-129 justify-center overflow-hidden'>
                <img className='object-cover lg:h-79 lg:w-79 h-40 w-40 xl:h-128 xl:w-lg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTFtgIoYZgdLkXHOB0XK6vmq6ah2ATGceBDdGZZAlz7w&s" alt="" />
            </div>

            <div className='flex items-center justify-center lg:flex-row flex-wrap gap-3'>
                <div className={`flex items-center bg-zinc-200 h-19 ${EnabledDark == true? 'border-zinc-700 border-2' : 'border-2'} rounded-md w-19  justify-center overflow-hidden`}>
                <img className='object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTFtgIoYZgdLkXHOB0XK6vmq6ah2ATGceBDdGZZAlz7w&s" alt="" />
            </div>
            <div className='flex items-center bg-zinc-200 h-19 border-none rounded-md w-19  justify-center overflow-hidden'>
                <img className='object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSstsY1-FjvfAH3AWp1JbHPTmZzd8Oy-BVmFTgBD9Qd-Q&s" alt="" />
            </div>
            <div className='flex items-center bg-zinc-200 h-19 border-none rounded-md w-19  justify-center overflow-hidden'>
                <img className='object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzXvyxsyqbBZddpI0tMsxCqamo6dBzwMBn7kvgMBgGD1KRky2lNVK3PEU&s=10" alt="" />
            </div>
            </div>
            
            <h1 className='text-md font-semibold tracking-tight hidden lg:flex xl:hidden'>Product Details</h1>
                <p className={`-mt-2 hidden lg:flex xl:hidden text-xs font-semibold ${EnabledDark == true? 'text-zinc-300' : 'text-zinc-600'}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, suscipit laboriosam!</p>

                <div className='hidden lg:flex xl:hidden items-center justify-between'>
                    <div className={`flex items-center justify-center gap-1 ${EnabledDark == true? 'text-zinc-300' : 'text-zinc-600'}`}>
                        <h3 className='text-sm font-semibold'>
                        <FontAwesomeIcon icon={faPuzzlePiece} /> Material :
                        </h3>

                        <h3 className='text-sm font-semibold'>Stainless Steel</h3>
                    </div>
                </div>
                <div className='hidden lg:flex xl:hidden items-center justify-between'>
                    <div className={`flex items-center justify-center gap-1 ${EnabledDark == true? 'text-zinc-300' : 'text-zinc-600'}`}>
                        <h3 className='text-sm font-semibold'>
                        <FontAwesomeIcon icon={faGripVertical} /> Handle :
                        </h3>

                        <h3 className='text-sm font-semibold'>Ergonomic Black Grip</h3>
                    </div>
                </div>
                <div className='hidden lg:flex xl:hidden items-center justify-between'>
                    <div className={`flex items-center justify-center gap-1 ${EnabledDark == true? 'text-zinc-300' : 'text-zinc-600'}`}>
                        <h3 className='text-sm font-semibold'>
                        <FontAwesomeIcon icon={faHandsBubbles} />  Dishwasher
                        </h3>

                        <h3 className='text-sm font-semibold'>Safe</h3>
                    </div>
                </div>
                <div className='hidden lg:flex xl:hidden items-center justify-between'>
                    <div className={`flex items-center justify-center gap-1 ${EnabledDark == true? 'text-zinc-300' : 'text-zinc-600'}`}>
                        <h3 className='text-sm font-semibold'>
                        <FontAwesomeIcon icon={faBacterium} /> Rust
                        </h3>

                        <h3 className='text-sm font-semibold'>Resistant</h3>
                    </div>
                </div>
                <div className='hidden lg:flex xl:hidden items-center justify-between'>
                    <div className={`flex items-center justify-center gap-1 ${EnabledDark == true? 'text-zinc-300' : 'text-zinc-600'}`}>
                        <h3 className='text-sm font-semibold'>
                        <FontAwesomeIcon icon={faFeather} /> Lightweight &
                        </h3>

                        <h3 className='text-sm font-semibold'>Durable</h3>
                    </div>
                </div>
            </div>

            <div className='flex w-full flex-col items-start justify-center gap-4'>

                <h1 className='font-semibold text-3xl'>Black Whisk</h1>
                <h1 className={`font-semibold ${EnabledDark == true? 'text-zinc-300' : 'text-zinc-600'} text-sm`}>Kitchen Accessories</h1>

                <div className='flex items-center justify-center gap-6'>

                    <h1 className='font-bold text-3xl tracking-tight'>$9.99</h1>
                    <h1 className={`font-semibold text-sm tracking-tight mt-1.5 ${EnabledDark == true? 'text-zinc-300' : 'text-zinc-500'}`}>(10.24% off)</h1>

                </div>

                <div className='flex items-center justify-center gap-2'>

                <h1 className={`font-semibold text-sm ${EnabledDark == true? 'text-green-400' : 'text-green-700'} tracking-tight`}>4.0</h1>
                <img src={rating4Stars} className='w-16 h-auto' alt="" />
                <h1 className={`font-semibold text-sm ${EnabledDark == true? 'text-zinc-300' : 'text-zinc-500'} tracking-tight`}>(128)</h1>

                </div>
            <div className='BORDER w-full mt-1 mb-1 h-[0.05rem] flex lg:hidden xl:flex bg-zinc-300'></div>

                <h1 className='text-md font-semibold tracking-tight flex lg:hidden xl:flex'>Product Details</h1>
                <p className={`-mt-2 lg:hidden xl:flex text-xs font-semibold ${EnabledDark == true? 'text-zinc-300' : 'text-zinc-600'}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, suscipit laboriosam!</p>

                <div className='flex lg:hidden xl:flex items-center justify-between'>
                    <div className={`flex items-center justify-center gap-1 ${EnabledDark == true? 'text-zinc-300' : 'text-zinc-600'}`}>
                        <h3 className='text-sm font-semibold'>
                        <FontAwesomeIcon icon={faPuzzlePiece} /> Material :
                        </h3>

                        <h3 className='text-sm font-semibold'>Stainless Steel</h3>
                    </div>
                </div>
                <div className='flex lg:hidden xl:flex items-center justify-between'>
                    <div className={`flex items-center justify-center gap-1 ${EnabledDark == true? 'text-zinc-300' : 'text-zinc-600'}`}>
                        <h3 className='text-sm font-semibold'>
                        <FontAwesomeIcon icon={faGripVertical} /> Handle :
                        </h3>

                        <h3 className='text-sm font-semibold'>Ergonomic Black Grip</h3>
                    </div>
                </div>
                <div className='flex lg:hidden xl:flex items-center justify-between'>
                    <div className={`flex items-center justify-center gap-1 ${EnabledDark == true? 'text-zinc-300' : 'text-zinc-600'}`}>
                        <h3 className='text-sm font-semibold'>
                        <FontAwesomeIcon icon={faHandsBubbles} />  Dishwasher
                        </h3>

                        <h3 className='text-sm font-semibold'>Safe</h3>
                    </div>
                </div>
                <div className='flex lg:hidden xl:flex items-center justify-between'>
                    <div className={`flex items-center justify-center gap-1 ${EnabledDark == true? 'text-zinc-300' : 'text-zinc-600'}`}>
                        <h3 className='text-sm font-semibold'>
                        <FontAwesomeIcon icon={faBacterium} /> Rust
                        </h3>

                        <h3 className='text-sm font-semibold'>Resistant</h3>
                    </div>
                </div>
                <div className='flex lg:hidden xl:flex items-center justify-between'>
                    <div className={`flex items-center justify-center gap-1 ${EnabledDark == true? 'text-zinc-300' : 'text-zinc-600'}`}>
                        <h3 className='text-sm font-semibold'>
                        <FontAwesomeIcon icon={faFeather} /> Lightweight &
                        </h3>

                        <h3 className='text-sm font-semibold'>Durable</h3>
                    </div>
                </div>
            </div>
            </div>

            <div className={`xl:flex grid items-center rounded-md justify-start  xl:justify-evenly border border-zinc-200 w-full h-auto py-7 ${EnabledDark == true? 'bg-zinc-900 border-zinc-700': 'bg-zinc-100'} px-5`}>

                <div className='flex items-center justify-center gap-3'>

                    <FontAwesomeIcon className='text-2xl' icon={faTruckFast} />
                    <div>
                        <h1 className='text-sm font-semibold tracking-tighter'>Free Shipping</h1>
                        <h1 className={`text-xs ${EnabledDark == true? 'text-zinc-300' : 'text-zinc-600'}  font-semibold tracking-tighter`}>On orders above $50</h1>
                    </div>

                </div>

                <div className='BORDER w-[0.07rem] mt-1 mb-1 h-13 bg-zinc-300'></div>

                <div className='flex items-center justify-center gap-3'>

                    <FontAwesomeIcon className='text-2xl' icon={faShieldHalved} />
                    <div>
                        <h1 className='text-sm font-semibold tracking-tighter'>Secure Payment</h1>
                        <h1 className={`text-xs ${EnabledDark == true? 'text-zinc-300' : 'text-zinc-600'}  font-semibold tracking-tighter`}>100% secure checkout</h1>
                    </div>

                </div>

                <div className='BORDER w-[0.07rem] mt-1 mb-1 h-13 bg-zinc-300'></div>

                <div className='flex items-center justify-center gap-3'>

                    <FontAwesomeIcon className='text-2xl' icon={faPersonWalkingArrowLoopLeft} />
                    <div>
                        <h1 className='text-sm font-semibold tracking-tighter'>Easy Return</h1>
                        <h1 className={`text-xs ${EnabledDark == true? 'text-zinc-300' : 'text-zinc-600'}  font-semibold tracking-tighter`}>30 days return policy</h1>
                    </div>

                </div>

                <div className='BORDER w-[0.07rem] mt-1 mb-1 h-13 bg-zinc-300'></div>

                <div className='flex items-center justify-center gap-3'>

                    <FontAwesomeIcon className='text-2xl' icon={faHeadset} />
                    <div>
                        <h1 className='text-sm font-semibold tracking-tighter'>24/7 Support</h1>
                        <h1 className={`text-xs ${EnabledDark == true? 'text-zinc-300' : 'text-zinc-600'}  font-semibold tracking-tighter`}>We are here to help</h1>
                    </div>

                </div>

            </div>

            </div>

            <div className='productSummary&Purchase gap-3 flex items-center justify-center w-full xl:w-1/2 flex-col h-auto'>
            <div className={`productSummary h-auto flex items-center justify-center gap-0.5 flex-col md:px-5 px-2 py-5 w-full border ${EnabledDark == true? 'bg-zinc-900 border-zinc-700' : 'bg-zinc-100 border-zinc-200'} rounded-md`}>

            <div className='w-full h-auto py-0.5 px-4'>
                    <h1 className='text-lg font-semibold tracking-tighter'>Order Summary</h1>
            </div>

            
            <div className='w-full h-auto py-1 px-4 flex items-center justify-between'>

                <div className='flex items-center justify-center gap-3.5'>
            <div className='flex items-center bg-zinc-200 h-19 w-19 justify-center overflow-hidden'>
                <img className='object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTFtgIoYZgdLkXHOB0XK6vmq6ah2ATGceBDdGZZAlz7w&s" alt="" />
            </div>
                <div>
                <h3 className='font-semibold text-md tracking-tight'>Black Whisk</h3>
                <h3 className={`font-semibold text-xs ${EnabledDark == true? 'text-zinc-30`' : 'text-zinc-600'} tracking-tight`}>Kitchen Accessories</h3>
                </div>
            </div>

             <div><h3 className='font-bold text-lg tracking-tight'>$9.99</h3></div>
            </div>

                 <div className='BORDER w-9/10 mt-1 h-[0.05rem] bg-zinc-200'></div>

            <div className='flex px-5 py-2 w-full items-center justify-center gap-3 flex-col'>
                <div className='flex w-full items-center justify-between'>

                    <h4>Subtotal</h4>
                    <h4 className='font-semibold'>$9.99</h4>

                </div>
                <div className='flex w-full items-center justify-between'>

                    <h4 className={`${EnabledDark == true? 'text-green-400' : 'text-green-600'} `}>Discount (10.24%)</h4>
                    <h4 className={`${EnabledDark == true? 'text-green-400' : 'text-green-600'} font-semibold`}>-$1.02</h4>

                </div>
                <div className='flex w-full items-center justify-between'>

                    <h4>Shipping</h4>
                    <h4 className='font-semibold'>$2.99</h4>

                </div>
            </div>

            <div className='BORDER w-9/10 mt-1 h-[0.05rem] bg-zinc-200'></div>


                <div className='flex px-5 w-full items-center justify-between mt-2'>

                    <h4 className='text-2xl font-semibold tracking-tight'>Total</h4>
                    <h4 className='text-2xl font-semibold tracking-tight'>$11.96</h4>

                </div>


            </div>
            <div className={`productSummary h-auto flex items-center justify-center gap-0.5 flex-col md:px-5 px-2 py-5 w-full border ${EnabledDark == true? 'bg-zinc-900 border-zinc-700' : 'bg-zinc-100 border-zinc-200'} rounded-md`}>

            <div className='w-full h-auto py-0.5 px-4'>
                    <h1 className='text-xl font-semibold tracking-tighter'>Choose Payment Method</h1>
            </div>

            
            <div className='w-full h-auto py-1 px-4 flex-col gap-3 flex items-center justify-start'>

                <button onClick={(e) => {
                    e.preventDefault();
                    setCODClicked(!CODClicked);
                    setOnlinePayClicked(false);
                    setTestingPayClicked(false);
                }} className={` ${CODClicked == true? `${EnabledDark == true? 'bg-zinc-800 border-zinc-600 border' : 'border bg-white'}` : 'border-none'} rounded-md cursor-pointer h-auto py-2 px-4 flex items-center justify-between w-full gap-3`}>

                    <div className='flex items-center justify-center gap-2'>

                    <FontAwesomeIcon className='text-2xl' icon={faHandHoldingDollar} />
                    <div className='flex items-start justify-center gap-1 flex-col'>
                    <h2 className='font-semibold md:text-md text-sm tracking-tight'>Cash on Delivery</h2>
                    <h2 className='font-semibold ml-0.5 text-xs tracking-tight'>Pay with cash when your order is delivered.</h2>
                    </div>
                    </div>

                    <div className={`h-5 w-5 flex items-center justify-center rounded-full ${CODClicked == true? `${EnabledDark == true? 'bg-white' : 'bg-black'}` : `${EnabledDark == true? 'bg-black border-2 border-zinc-300' : 'bg-white border-2 border-zinc-700'}`}`}>
                        <div className={`h-2 w-2 rounded-full ${EnabledDark == true? 'bg-black' : 'bg-white'}`}></div>
                    </div>

                </button>
                <button onClick={(e) => {
                    e.preventDefault();
                    setOnlinePayClicked(!OnlinePayClicked);
                    setCODClicked(false);
                    setTestingPayClicked(false);
                }} className={` ${OnlinePayClicked == true? `${EnabledDark == true? 'bg-zinc-800 border-zinc-600 border' : 'border bg-white'}` : 'border-none'} rounded-md h-auto cursor-pointer py-2 px-4 flex items-center justify-between w-full gap-3`}>
                    <div className='flex items-center justify-center gap-2'>

                    <FontAwesomeIcon className='text-2xl' icon={faCreditCard} />
                    <div className='flex items-start justify-center gap-1 flex-col'>
                    <h2 className='font-semibold tracking-tight md:text-md text-sm'>Online Payment</h2>
                    <h2 className='font-semibold ml-0.5 text-xs tracking-tight'>Pay securely using your card or UPI.</h2>
                    </div>
                    </div>

                    <div className={`h-5 w-5 flex items-center justify-center rounded-full ${OnlinePayClicked == true? `${EnabledDark == true? 'bg-white' : 'bg-black'}` : `${EnabledDark == true? 'bg-black border-2 border-zinc-300' : 'bg-white border-2 border-zinc-700'}`}`}>
                        <div className={`h-2 w-2 rounded-full ${EnabledDark == true? 'bg-black' : 'bg-white'}`}></div>
                    </div>

                </button>
                <div className='h-auto w-full flex flex-wrap md:flex-row  items-center justify-start pl-5 gap-6'>
                    <img className='md:w-12 w-6 h-auto' src={visaCard} alt="" />
                    <img className='md:w-9  w-6 h-auto' src={mastercard} alt="" />
                    <img className='md:w-10 w-6 h-auto' src={GooglePayAppLogo} alt="" />
                    <img className='md:w-14 w-6 h-auto' src={PaytmAppLogo} alt="" />
                    <img className='md:w-10 w-6 h-auto' src={JammuandKashmirBankAppLogo} alt="" />
                </div>

        {PopUpPaidShow == true &&
        
        <div className='w-full  h-full flex items-center justify-center relative mb-3 mt-2 z-2'>
        <PaymentDonePopUp />
        </div>
        
        }
                {PopUpPaidShow == false &&
                <button onClick={(e) => {
                    e.preventDefault();
                    setTestingPayClicked(!TestingPayClicked);
                    setCODClicked(false);
                    setOnlinePayClicked(false);
                    setError('');
                }} className={` ${TestingPayClicked == true? `${EnabledDark == true? 'bg-zinc-800 border-zinc-600 border' : 'border bg-white'}` : 'border-none'} rounded-md h-auto py-2 px-4 cursor-pointer flex items-center justify-between w-full gap-3`}>

                    <div className='flex items-center justify-center gap-2'>

                    <FontAwesomeIcon className='text-2xl' icon={faMoneyBillTransfer} />
                    <div className='flex items-start justify-center gap-1 flex-col'>
                    <h2 className='font-semibold tracking-tight md:text-md text-sm'>Payment Testing Demo</h2>
                    <h2 className='font-semibold ml-0.5 text-xs tracking-tight'>For Development Purpose of Payment Gateway.</h2>
                    </div>
                    </div>

                    <div className={`h-5 w-5 flex items-center justify-center rounded-full ${TestingPayClicked == true ?`${EnabledDark == true? 'bg-white' : 'bg-black'}` : `${EnabledDark == true? 'bg-black border-2 border-zinc-300' : 'bg-white border-2 border-zinc-700'}`}`}>
                        <div className={`h-2 w-2 rounded-full ${EnabledDark == true? 'bg-black' : 'bg-white'}`}></div>
                    </div>

                </button>
                }

             {TestingPayClicked == true &&
             <>
             <div className={`${CurrencyOpen == true? '' : "mb-3"} border w-full border-zinc-600 px-3 py-1.5 flex items-center justify-center gap-2 rounded-md`}>
                <button onClick={(e) => {
                e.preventDefault();
                setCurrencyOpen(!CurrencyOpen);
             }} className={`${EnabledDark == true? 'bg-zinc-800' : 'bg-zinc-200'} px-3 py-1 rounded-sm cursor-pointer flex items-center justify-center gap-0.5`}><h1 className='font-semibold'>{Currency}</h1> <FontAwesomeIcon className='font-semibold text-sm' icon={faAngleDown} /></button>
             

             <input className='w-full outline-none px-3' type="number" step='any' placeholder='Enter Amount' />
             </div>

             {CurrencyOpen == true &&

             <div className='w-full rounded-md h-10 relative z-30 -top-4'>

                <div className={`w-20 ml-2.5 rounded-md ${EnabledDark == true? 'bg-zinc-800' : 'bg-zinc-200 border border-zinc-500'} px-0.5 py-0.5 h-auto flex items-center justify-center flex-col`}>

                <button onClick={(e) => {
                    e.preventDefault();
                    setCurrency('USD');
                    setCurrencyOpen(false);
                }} className={`w-full rounded-sm ${EnabledDark == true? 'hover:bg-zinc-700 active:bg-zinc-700 border-zinc-700' : ' border-none hover:bg-zinc-300 active:bg-zinc-300'} cursor-pointer border `}>USD</button>
                <button onClick={(e) => {
                    e.preventDefault();
                    setCurrency('INR');
                    setCurrencyOpen(false);
                }} className={`w-full rounded-sm ${EnabledDark == true? 'hover:bg-zinc-700 active:bg-zinc-700 border-zinc-700' : 'border-none hover:bg-zinc-300 active:bg-zinc-300'} cursor-pointer border `}>INR</button>

             </div>

             </div>

             }

             

             </>

             }


            </div>

                 <div className='BORDER w-9/10 mt-1 h-[0.05rem] bg-zinc-200'></div>

                  {Error &&
            <h3 className='text-red-600 text-sm mt-5 font-semibold tracking-tight'>{Error}</h3>
            }

            <button onClick={async (e) => {
                e.preventDefault();
                if(TestingPayClicked == true){

                    setError('');
                
                    let paymentGatewayRes = await axios.post(`${BACKEND_LIVE_URL}/payment-gateway-portal/${UserID}`, {}, {withCredentials: true});

                    if(paymentGatewayRes?.data){
                         console.log(paymentGatewayRes?.data?.TransactionID)
                         setTransactionID(paymentGatewayRes?.data?.TransactionID)
                         setPopUpPaidShow(true);
                         setTestingPayClicked(false);

                    }
                } else {
                        setError("This option is still in development")
                    }
            }} className={`cursor-pointer hover:scale-99 w-full h-auto py-2 ${EnabledDark == true? 'bg-orange-600 text-white hover:bg-orange-500' : 'bg-zinc-900 hover:bg-zinc-800 text-white'} font-semibold tracking-tight text-lg rounded-sm mt-5 mb-5`}>{TransactionID? 'Order Placed' : 'Place Order Now'}</button>

            <div className='BORDER w-9/10 mt-1 h-[0.05rem] bg-zinc-200'></div>


                <div className='flex px-5 w-full items-center justify-center gap-3 mt-2'>

                <h4 className={`text-xs ${EnabledDark == true? 'text-zinc-300' : 'text-zinc-600'} font-semibold tracking-tight`}><FontAwesomeIcon icon={faLock} /> Secure Checkout</h4>
                    <h4 className={`text-sm ${EnabledDark == true? 'text-zinc-300' : 'text-zinc-600'} font-bold tracking-tight`}>·</h4>
                    <h4 className={`text-xs ${EnabledDark == true? 'text-zinc-300' : 'text-zinc-600'} font-semibold tracking-tight`}>Your data is safe with us.</h4>

                </div>


            </div>

        </div>

        </div>

    </div>
    
    </>
  )
}

export default PurchasePortalMain