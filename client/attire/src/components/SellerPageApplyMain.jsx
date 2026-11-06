import React, { useState } from 'react'
import { useTheme } from './ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight, faArrowDownLong, faArrowRightLong, faArrowTrendUp, faAward, faDownload, faDownLong, faFileLines, faFireFlameCurved, faHandshake, faHeadset, faMoneyBillTrendUp, faRightLong, faShield, faShieldHalved, faStore, faUsers, faWebAwesome } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import AttireSellerTrophy from '../assets/AttireSellerTrophy.png'
import dashedArrow from '../assets/dashedArrow.png'
import SideBarProfileMobile from './SideBarProfileMobile';
import SideBarSellerApplyPage from './SideBarSellerApplyPage';
import axios from 'axios';
import LoginSeller from './LoginSeller';


const SellerPageApplyMain = ({MenuIsOpen, setMenuIsOpen}) => {
    const {EnabledDark, setEnabledDark} = useTheme(false);
    const {LoginSellerOpen, setLoginSellerOpen} = useTheme(false);
    const [CountryCode, setCountryCode] = useState('+91');
    const [FullName, setFullName] = useState('');
    const [EmailSeller, setEmailSeller] = useState('');
    const [PhNumber, setPhNumber] = useState('');
    const [EmailError, setEmailError] = useState('');
    const [BusinessType, setBusinessType] = useState('');
    const [BusinessName, setBusinessName] = useState('');
    const [PasswordSeller, setPasswordSeller] = useState('');
    const [BusinessDescription, setBusinessDescription] = useState('');
    const navigate = useNavigate();
    const BACKEND_LIVE_URL = import.meta.env.VITE_BACKEND_URL;


    const sendSellerData = async (e) => {
        e.preventDefault();
        const SellerData = {
            FullName,
            EmailSeller,
            PhNumber,
            BusinessType,
            BusinessName,
            BusinessDescription,
            PasswordSeller
        }

        const sellerResponse = await axios.post(`${BACKEND_LIVE_URL}/createSellerAccount`, SellerData, {headers: {
            'Content-Type' : 'application/json'
        }, withCredentials: true
        });

        if(sellerResponse?.data?.success == true){
        console.log(sellerResponse?.data);
        navigate('/seller-dashboard')
        }
        if (sellerResponse?.data.success == false){
        console.log(sellerResponse?.data);
        setEmailError(sellerResponse?.data?.message);
        }

    }

    
  return (
   <>
   
   <main className={`w-full h-full md:px-8 px-5 lg:px-5 py-5 gap-5 bg-zinc-950 text-white  relative top-14`}>


        
           {LoginSellerOpen == true &&
        
           <div className='fixed top-0 z-30 md:px-0 px-4 bg-[#00000082] h-full flex left-0 w-full justify-center items-center '>
           <LoginSeller />
        
           </div>
           
           }

        {MenuIsOpen == true &&
       <div className='flex h-full w-full absolute -top-18 bg-[#111111d3] z-10 lg:hidden'>
       <SideBarSellerApplyPage EnabledDark={EnabledDark} setEnabledDark={setEnabledDark}/>
       </div>
        }

           <div className='w-full h-auto gap-2 flex items-center justify-start'>
               <Link to='/' className={`hover:text-zinc-200 text-zinc-300 text-xs lg:text-md font-semibold`}>Home</Link>
               <FontAwesomeIcon className={`text-zinc-300 text-xs lg:text-md font-semibold`} icon={faAngleRight} />
               <Link to='/profile' className={`hover:text-zinc-200 text-zinc-300 text-xs lg:text-md font-semibold`}>Profile</Link>
               <FontAwesomeIcon className={`text-zinc-300 text-xs lg:text-md font-semibold`} icon={faAngleRight} />
               <Link className={`font-semibold text-xs lg:text-md text-[#FFC247]`}>Become a Seller</Link>
           </div>

           <div className='w-full flex items-center justify-center gap-3 h-auto py-7'>

            <div className='w-full flex flex-col items-start justify-center md:gap-3.5 gap-1.5'>

                <h4 className='text-[#FFC247] font-semibold text-sm tracking-tight'>GROW YOUR BUSINESS WITH Attire</h4>
                <div className='flex md:flex-row flex-col items-start md:items-center justify-center gap-3'>
                <h4 className='font-serif text-5xl tracking-tight'>Become a</h4>
                <h4 className='text-[#FFC247] font-serif text-5xl tracking-tight'>Seller</h4>
                </div>
                <h4 className='font-serif text-5xl tracking-tight'>on Attire</h4>
                <div className='flex items-start justify-center flex-col gap-0.5 text-zinc-300 font-semibold'>
                <h4 className='text-xs tracking-tight'>Join thousands of successful sellers who trust Attire</h4>
                <h4 className='text-xs tracking-tight'>to grow their business and reach millions of customers.</h4>
                </div>
                <div className='flex md:flex-row flex-col items-start md:items-center justify-center gap-4 mt-3'>

                <div className='flex items-center justify-center gap-2'>
                    <div className='w-13 h-13 rounded-full border-2 border-[#E3A72F] bg-[#1A1610] flex items-center justify-center'>
                    <FontAwesomeIcon className='text-xl text-[#fcc247]' icon={faHandshake} />
                    </div>
                    <div>
                    <h1 className='font-semibold tracking-tight text-md'>Trusted Platform</h1>
                    <h1 className='font-semibold tracking-tight text-xs text-zinc-300'>Secure & reliable marketplace.</h1>
                    </div>
                </div>


                <div className='flex items-center justify-center gap-2'>
                    <div className='w-13 h-13 rounded-full border-2 border-[#E3A72F] bg-[#1A1610] flex items-center justify-center'>
                    <FontAwesomeIcon className='text-xl text-[#fcc247]' icon={faFireFlameCurved} />
                    </div>
                    <div>
                    <h1 className='font-semibold tracking-tight text-md'>Wide Reach</h1>
                    <h1 className='font-semibold tracking-tight text-xs text-zinc-300'>Millions of active customers.</h1>
                    </div>
                </div>
                <div className='flex items-center justify-center gap-2'>
                    <div className='w-13 h-13 rounded-full border-2 border-[#E3A72F] bg-[#1A1610] flex items-center justify-center'>
                    <FontAwesomeIcon className='text-xl text-[#fcc247]' icon={faMoneyBillTrendUp} />
                    </div>
                    <div>
                    <h1 className='font-semibold tracking-tight text-md'>Great Earnings</h1>
                    <h1 className='font-semibold tracking-tight text-xs text-zinc-300'>Competitive fees & fast payments.</h1>
                    </div>
                </div>
                </div>

                <button onClick={(e) => {
                    e.preventDefault();
                    setLoginSellerOpen(true);
                }} className='w-auto px-10 text-lg py-2.5 hover:scale-99 cursor-pointer rounded-md mt-5 text-black font-semibold tracking-tight bg-[#FCC247]  '>Start Your Journey < FontAwesomeIcon icon={faArrowRightLong} className='text-md pt-1 ml-3' /></button>

                <div className='flex items-center justify-center gap-2'>
                    <FontAwesomeIcon className='text-[#FFC247]' icon={faShieldHalved} />
                    <h5 className='text-sm text-zinc-300 font-semibold tracking-tight'>Secure</h5>
                    <h5 className='text-xl text-zinc-300 font-semibold tracking-tight'>·</h5>
                    <h5 className='text-sm text-zinc-300 font-semibold tracking-tight'>Transparent</h5>
                    <h5 className='text-xl text-zinc-300 font-semibold tracking-tight'>·</h5>
                    <h5 className='text-sm text-zinc-300 font-semibold tracking-tight'>Professional</h5>

                </div>
                
            </div>
            {/* <div className='flex items-center w-7/10 justify-center overflow-hidden'>
            <img className='object-cover' src={AttireSellerTrophy} alt="" />
            </div> */}

           </div>

           <div className='w-full bg-zinc-900 h-auto py-3 px-3 flex-col flex items-center justify-center gap-1.5 border border-zinc-700 rounded-md'>

                <h1 className='font-semibold tracking-tight md:px-0 px-5 text-sm text-[#FFC247]'>HOW IT WORKS</h1>

                <div className='flex md:flex-row flex-col md:gap-0 gap-5 px-3 items-start md:items-center md:justify-between w-full lg:px-39 py-2'>

                <div className='flex w-full items-center justify-center flex-col gap-2'>
                    <div className='w-13 h-13 rounded-full border-2 border-[#E3A72F] bg-[#1A1610] flex items-center justify-center'>
                    <FontAwesomeIcon className='text-xl text-[#fcc247]' icon={faFileLines} />
                    </div>
                    <div>
                        <div className='w-full flex items-center justify-center gap-1'>
                        <div className='flex items-center justify-center w-5 h-5 rounded-full bg-[#FFC247]'><h1 className='text-xs text-black font-semibold'>1</h1></div>
                        
                            
                    <div className='ml-2'>
                    <h1 className='font-semibold tracking-tight text-md'>Apply to Sell</h1>
                        
                    <h1 className='font-semibold tracking-tight text-xs text-zinc-300'>Fill out the simple</h1>
                    <h1 className='font-semibold tracking-tight text-xs text-zinc-300'>application form.</h1>
                    </div>
                </div>
            </div>
        </div>
                <div className='w-full md:flex hidden items-center justify-center'>
                <FontAwesomeIcon className='md:flex hidden text-[#ffc247] text-sm' icon={faRightLong} />
                </div>
                {/* <FontAwesomeIcon className='md:hidden flex text-[#ffc247] text-sm' icon={faDownLong} /> */}

                <div className='flex w-full items-center justify-center flex-col gap-2'>
                    <div className='w-13 h-13 rounded-full border-2 border-[#E3A72F] bg-[#1A1610] flex items-center justify-center'>
                    <FontAwesomeIcon className='text-xl text-[#fcc247]' icon={faShield} />
                    </div>
                    <div>
                        <div className='w-full flex items-center justify-center gap-1'>
                        <div className='flex items-center justify-center w-5 h-5 rounded-full bg-[#FFC247]'><h1 className='text-xs text-black font-semibold'>2</h1></div>
                        
                            
                    <div className='ml-2'>
                    <h1 className='font-semibold tracking-tight text-md'>Verification</h1>
                        
                    <h1 className='font-semibold tracking-tight text-xs text-zinc-300'>We'll review &</h1>
                    <h1 className='font-semibold tracking-tight text-xs text-zinc-300'>verify your info.</h1>
                    </div>
                </div>
            </div>
        </div>

                <div className='w-full md:flex hidden items-center justify-center'>
                <FontAwesomeIcon className='md:flex hidden text-[#ffc247] text-sm' icon={faRightLong} />
                </div>

                <div className='flex w-full items-center justify-center flex-col gap-2'>
                    <div className='w-13 h-13 rounded-full border-2 border-[#E3A72F] bg-[#1A1610] flex items-center justify-center'>
                    <FontAwesomeIcon className='text-xl text-[#fcc247]' icon={faAward} />
                    </div>
                    <div>
                        <div className='w-full flex items-center justify-center gap-1'>
                        <div className='flex items-center justify-center w-5 h-5 rounded-full bg-[#FFC247]'><h1 className='text-xs text-black font-semibold'>3</h1></div>
                        
                            
                    <div className='ml-2'>
                    <h1 className='font-semibold tracking-tight text-md'>Get Approved</h1>
                        
                    <h1 className='font-semibold tracking-tight text-xs text-zinc-300'>Once approved, you'll</h1>
                    <h1 className='font-semibold tracking-tight text-xs text-zinc-300'>become a seller.</h1>
                    </div>
                </div>
            </div>
        </div>

                <div className='w-full md:flex hidden items-center justify-center'>
                <FontAwesomeIcon className='md:flex hidden text-[#ffc247] text-sm' icon={faRightLong} />
                </div>


                <div className='flex w-full items-center justify-center flex-col gap-2'>
                    <div className='w-13 h-13 rounded-full border-2 border-[#E3A72F] bg-[#1A1610] flex items-center justify-center'>
                    <FontAwesomeIcon className='text-xl text-[#fcc247]' icon={faStore} />
                    </div>
                    <div>
                        <div className='w-full flex items-center justify-center gap-1'>
                        <div className='flex items-center justify-center w-5 h-5 rounded-full bg-[#FFC247]'><h1 className='text-xs text-black font-semibold'>4</h1></div>
                        
                            
                    <div className='ml-2'>
                    <h1 className='font-semibold tracking-tight text-md'>Start Selling</h1>
                        
                    <h1 className='font-semibold tracking-tight text-xs text-zinc-300'>List your products</h1>
                    <h1 className='font-semibold tracking-tight text-xs text-zinc-300'> and start earning.</h1>
                    </div>
                </div>
            </div>
        
        </div>
           </div>
           </div>

        
        <div className='w-full h-auto flex md:flex-row flex-col items-start mt-4 justify-center gap-3'>
                <form onSubmit={sendSellerData} action="" className='w-full'>
                <div className='ApplicationForm w-full flex items-start justify-center flex-col gap-3 bg-zinc-900 px-5 py-5 rounded-md border border-zinc-700'>

                    <h1 className='text-[#FFC247] text-2xl font-serif'><FontAwesomeIcon className='text-xl'  icon={faFileLines} /> Seller Application</h1>

                    <h5 className='text-zinc-400 text-xs tracking-tight'>Please fill the details below to apply as a seller on Attire.</h5>

                    <div className='w-full flex items-center justify-start mt-3 gap-2 md:gap-7'>

                    <div className='flex w-full items-start justify-center flex-col gap-1.5'>
                        <h1 className='font-semibold tracking-tight'>Full Name</h1>
                        <input onChange={(e) => {
                            e.preventDefault();
                            setFullName(e.target.value)
                        }} type="text" className='border-zinc-700 rounded-md w-full border px-3 py-1.5' placeholder='Enter your full name' />
                    </div>
                    <div className='flex w-full items-start justify-center flex-col gap-1.5'>
                        <h1 className='font-semibold tracking-tight'>Password</h1>
                        <input onChange={(e) => {
                            e.preventDefault();
                            setPasswordSeller(e.target.value)
                        }} type="password" className='border-zinc-700 rounded-md w-full border px-3 py-1.5' placeholder='Enter new password' />
                        <p className='text-xs font-semibold tracking-tight text-red-500'>{EmailError}</p>
                    </div>

                    </div>

                    <div className='flex w-full items-start justify-center flex-col gap-1.5'>
                        <h1 className='font-semibold tracking-tight'>Email Address (Same as registered)</h1>
                        <input onChange={(e) => {
                            e.preventDefault();
                            setEmailSeller(e.target.value)
                        }} type="email" className='border border-zinc-700 rounded-md  w-full px-3 outline-none py-1.5' placeholder='Enter your email' />
                    </div>
                    <div className='flex w-full items-start justify-center flex-col gap-1.5'>
                        <h1 className='font-semibold tracking-tight'>Phone Number</h1>
                        <div className='flex items-center rounded-md w-full border-zinc-700 border justify-center'>
                            <div className='bg-zinc-800 py-1.5 px-3 flex items-center justify-center'>{CountryCode} <FontAwesomeIcon className='text-sm ml-0.5' icon={faAngleDown} /></div>
                        <input onChange={(e) => {
                            e.preventDefault();
                            setPhNumber(e.target.value)
                        }} type="number" className='  w-full px-7 outline-none py-1.5' placeholder='Enter your phone number' /> </div>
                    </div>
                <div className='flex w-full items-start justify-center flex-col gap-1.5'>
                        <h1 className='font-semibold tracking-tight'>Business Type</h1>
                        <input onChange={(e) => {
                            e.preventDefault();
                            setBusinessType(e.target.value)
                        }} type="text" className='border-zinc-700 rounded-md w-full border px-3 py-1.5' placeholder='Enter your business type' />
                    </div>

                <div className='flex w-full items-start justify-center flex-col gap-1.5'>
                        <h1 className='font-semibold tracking-tight'>Business Name (Optional)</h1>
                        <input onChange={(e) => {
                            e.preventDefault();
                            setBusinessName(e.target.value)
                        }} type="text" className='border-zinc-700 rounded-md w-full border px-3 py-1.5' placeholder='Enter your business name' />
                    </div>

                <div className='flex w-full items-start justify-center flex-col gap-1.5'>
                        <h1 className='font-semibold tracking-tight'>Tell us about your business</h1>
                        <textarea onChange={(e) => {
                            e.preventDefault();
                            setBusinessDescription(e.target.value)
                        }} type="text" className='border-zinc-700 resize-none rounded-md w-full border px-3 py-1.5' placeholder='What type of products do you plan to sell?' />
                    </div>

                    <div className='flex items-center justify-between gap-3 w-full h-auto py-3 px-6 rounded-md border border-[#644a15f3]  bg-[#c4860c18]'>

                    <div className='flex items-center justify-center gap-2'>
                    <FontAwesomeIcon className='text-[#ffc247] text-xl' icon={faFileLines} />
                    <div className='w-full flex flex-col items-start justify-center'>
                        <h1 className='text-sm font-semibold tracking-tight text-amber-100 '>Documents you'll need</h1>
                        <h1 className='text-xs font-semibold tracking-tight text-zinc-400'>PAN Card, Adhaar Card, Business Proof (if any).</h1>
                    </div>
                    </div>

                    <FontAwesomeIcon className='text-[#ffc247] text-xl' icon={faDownload} />

                    </div>
                    
                    <button className='hover:bg-[#e7b654] mt-1.5 cursor-pointer hover:scale-99 w-full h-auto flex items-center justify-between py-1.5 px-3 bg-[#ffc247] text-black font-semibold tracking-tight text-lg rounded-md'><div> </div><h1>Submit Application</h1> <FontAwesomeIcon icon={faArrowRightLong} /></button>

                    <div className='w-full flex lg:flex-row flex-col items-center justify-center gap-1'>
                        <p className='text-xs text-zinc-400 font-semibold tracking-tight'>By submitting, you agree to Attire's</p>
                        <div className='flex items-center justify-center gap-1'>
                        <Link className='hover:underline text-xs text-[#ffc247] font-semibold tracking-tight'>Seller Policy</Link>
                        <p className='text-xs text-zinc-400 font-semibold tracking-tight'>and</p>
                        <Link className='hover:underline text-xs text-[#ffc247] font-semibold tracking-tight'>Terms of Service.</Link>
                        </div>

                        
                    </div>

                    

                </div>
                
               </form>

                <div className='AttireProfitFromSeller lg:w-7/10 w-full flex items-start justify-center flex-col gap-1.5 bg-zinc-900 px-5 py-5 rounded-md border border-zinc-700'>

                    <h1 className='text-[#FFC247] text-2xl font-serif'> Why Sell on Attire?</h1>

                    
                    <div className='flex items-center justify-start  py-4 rounded-md bg-zinc-800 px-4 gap-4 w-full mt-4'>
                    <div className='w-13 h-13 rounded-full border-2 border-[#E3A72F] bg-[#1A1610] flex items-center justify-center'>
                    <h1 className='text-4xl text-[#fcc247]' >₹</h1>
                    </div>
                    <div className='w-full'>
                    <h1 className='font-semibold tracking-tight text-md text-[#ffc247]'>Low Commission</h1>
                    <h1 className='font-semibold tracking-tight text-xs text-zinc-300'>Flat ₹30 commission per order. No hidden charges, no monthly fees.</h1>
                    </div>
                    </div>
                    <div className='flex items-center justify-start  py-4 rounded-md bg-zinc-800 px-4 gap-4 w-full'>
                    <div className='w-13 h-13 rounded-full border-2 border-[#E3A72F] bg-[#1A1610] flex items-center justify-center'>
                    <FontAwesomeIcon className='text-xl text-[#fcc247]' icon={faUsers} />
                    </div>
                    <div className='w-full'>
                    <h1 className='font-semibold tracking-tight text-md text-[#ffc247]'>Massive Customer Base</h1>
                    <h1 className='font-semibold tracking-tight text-xs text-zinc-300'>Reach millions of potential customers across India with Attire.</h1>
                    </div>
                    </div>
                    <div className='flex items-center justify-start  py-4 rounded-md bg-zinc-800 px-4 gap-4 w-full'>
                    <div className='w-13 h-13 rounded-full border-2 border-[#E3A72F] bg-[#1A1610] flex items-center justify-center'>
                    <FontAwesomeIcon className='text-2xl text-[#fcc247]' icon={faShieldHalved} />
                    </div>
                    <div className='w-full'>
                    <h1 className='font-semibold tracking-tight text-md text-[#ffc247]'>Secure & Reliable</h1>
                    <h1 className='font-semibold tracking-tight text-xs text-zinc-300'>Your business is protected with our secure platform and timely payments.</h1>
                    </div>
                    </div>
                    <div className='flex items-center justify-start  py-4 rounded-md bg-zinc-800 px-4 gap-4 w-full'>
                    <div className='w-13 h-13 rounded-full border-2 border-[#E3A72F] bg-[#1A1610] flex items-center justify-center'>
                    <FontAwesomeIcon className='text-2xl text-[#fcc247]' icon={faArrowTrendUp} />
                    </div>
                    <div className='w-full'>
                    <h1 className='font-semibold tracking-tight text-md text-[#ffc247]'>Grow Your Brand</h1>
                    <h1 className='font-semibold tracking-tight text-xs text-zinc-300'>Build your brand identity and grow your business with powerful tools.</h1>
                    </div>
                    </div>
                    <div className='flex items-center justify-start  py-4 rounded-md bg-zinc-800 px-4 gap-4 w-full'>
                    <div className='w-13 h-13 rounded-full border-2 border-[#E3A72F] bg-[#1A1610] flex items-center justify-center'>
                    <FontAwesomeIcon className='text-2xl text-[#fcc247]' icon={faHeadset} />
                    </div>
                    <div className='w-full'>
                    <h1 className='font-semibold tracking-tight text-md text-[#ffc247]'>24/7 Seller Support</h1>
                    <h1 className='font-semibold tracking-tight text-xs text-zinc-300'>Get dedicated support whenever you need help with your business.</h1>
                    </div>
                    </div>

                    <div className='flex items-center justify-between mt-4 border border-amber-500  py-4 rounded-md bg-zinc-950 px-7 gap-4 w-full'>

                        <div className='flex items-start gap-4 justify-center'>
                    
                    <FontAwesomeIcon className='text-2xl mt-1 text-[#fcc247]' icon={faWebAwesome} />
                  
                    <div>
                    <h1 className='font-semibold tracking-tight text-md text-[#ffc247]'>Attire Verified Seller</h1>
                    <div>
                    <h1 className='font-semibold tracking-tight text-xs text-zinc-300'>Complete 10+ orders with 4+ average star rating</h1>
                    <h1 className='font-semibold tracking-tight text-xs text-zinc-300'> and get the Attire Verified Seller Badge of honor.</h1>
                    </div>
                    
                    </div>
                    </div>

                    <div className='w-13 h-13 rounded-full   bg-[#1A1610] flex items-center justify-center'>
                    <FontAwesomeIcon className='text-3xl text-[#fcc247]' icon={faAward} />
                    </div>

                    </div>
                    

                </div>

        </div>

 <div className='w-full h-auto mt-4 flex items-center justify-center'>

        <div className='flex items-center justify-between  py-4 rounded-md border border-zinc-600 bg-zinc-900 px-8 gap-4 w-full'>

                    <div className='flex items-center justify-center gap-3'>
                    
                    <FontAwesomeIcon className='text-4xl text-[#fcc247]' icon={faShieldHalved} />
                   
                    <div>
                    <h1 className='font-serif tracking-tight text-xl text-[#ffc247]'>Your Business, Our Priority</h1>
                    <h1 className='font-semibold tracking-tight text-xs text-zinc-400'>We are committed to your success. Our platform is designed to help</h1>
                    <h1 className='font-semibold tracking-tight text-xs text-zinc-400'>you grow your business while we handle the rest.</h1>
                    </div>
                    </div>

                    <div className='flex items-center justify-center flex-col gap-0.5'>
                    
                    <h1 className='text-3xl font-semibold text-[#fcc247]' >₹0</h1>
                   
                  
                        
                        
                        
                            
                   
                        
                    <h1 className='font-semibold tracking-tight text-xs text-zinc-300'>Setup Fees</h1>
                 
                </div>
         
          


                    </div>

                

 </div>

    </main>
   
   
   </>
  )
}

export default SellerPageApplyMain