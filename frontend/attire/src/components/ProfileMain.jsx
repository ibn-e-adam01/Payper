import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faUserLock, faSquareMinus, faCrown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Menu } from 'lucide-react';
import SideBarProfileMobile from './SideBarProfileMobile';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useTheme } from './ThemeContext';
import LoginPopUp from './LoginPopUp';

const ProfileMain = ({MenuIsOpen, setMenuIsOpen}) => {

    const navigate = useNavigate();
    const [firstName, setfirstName] = useState("Login");
    const [lastName, setlastName] = useState("First");
    const [Profession, setProfession] = useState("");
    const [AccountProfession, setAccountProfession] = useState('');
    const [EnabledLocation, setEnabledLocation] = useState(false);
    const [EnabledNotification, setEnabledNotification] = useState(false);
    const [EnabledMedia, setEnabledMedia] = useState(false);
    const { EnabledDark, setEnabledDark } = useTheme(false); 
    const { NotLoggedIn, setNotLoggedIn } = useTheme(false); 
    // const [EnabledDark, setEnabledDark] = useState(false);
    const MySwal = withReactContent(Swal); 
    const BACKEND_LIVE_URL = import.meta.env.VITE_BACKEND_URL;
    


    useEffect(() => {
        try{
        const getUserData = async () => {
            let userData = await axios.get(`${BACKEND_LIVE_URL}/`, {
                withCredentials: true
            });

            if(userData?.data?.success == true){
                setEnabledDark(userData?.data?.user.darkTheme);
                setfirstName(userData?.data?.user?.firstName);
                setlastName(userData?.data?.user?.lastName);
                setAccountProfession(userData?.data?.user?.profession);
                
            } 
            else{

                setNotLoggedIn(true);
       
    }

        }

        getUserData();

        } catch(err){
            console.error(err);
}

    }, []);

    

    const changeThemeMode = async() => {

        let onDarkTheme = await axios.patch(`${BACKEND_LIVE_URL}/themeChange`, {EnabledDark}, {withCredentials: true});

        if(onDarkTheme?.data?.success == true){
            console.log(onDarkTheme?.data);
        }
    }

    const setupProfile = async (e) => {
        e.preventDefault();
        const userData = {
            AccountProfession
        }

        let res = await axios.patch(`${BACKEND_LIVE_URL}/updateAccount`, userData, {
            headers: {
                "Content-Type": "application/json"
            }, withCredentials: true
        });

        if(res?.data?.success == true){
            console.log(res?.data);
            navigate('/profile')

        }

        else if(res?.data?.success == false){
        
        console.log(res.data);

    }


}


  return (
    <>
    
    <form action="" onSubmit={setupProfile}>
    <main className={`w-full  absolute flex xl:flex-row flex-col items-center xl:items-start justify-start px-7 gap-7 xl:px-43 -z-10 top-13 h-auto py-7 ${EnabledDark == true? 'bg-zinc-900 text-white' : 'bg-transparent'}`}>

    {NotLoggedIn == true &&
    
    <div className=' flex items-center justify-center lg:hidden bg'>

        <LoginPopUp />

    </div>

    }



    {MenuIsOpen == true &&
    <div className='flex h-full w-full absolute -top-18 bg-[#11111189] z-10 lg:hidden'>
    <SideBarProfileMobile EnabledDark={EnabledDark} setEnabledDark={setEnabledDark}/>
    </div>
    }

    <div className='w-full flex flex-col items-center justify-center gap-7'>
    <div className={`xl:flex xl:flex-col hidden w-8/10 pb-7 ${EnabledDark == true? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-black'} h-auto py-3 pt-4 gap-3 px-6 w-full`}>
        <h1 className='text-3xl tracking-tight font-semibold mt-2'>Manage Your Cart</h1>

        <div className={`${EnabledDark == true? 'bg-zinc-700' : 'bg-zinc-300'} h-[0.02rem] mt-3 w-full`}></div>

        <h3 className='text-2xl font-semibold tracking-tight'>Items (30)</h3>
        <div className='h-88 flex items-center px-3 justify-start gap-2 flex-col overflow-y-auto mt-2 mb-2'>
            <div className={`flex items-center h-auto w-full justify-center gap-3 px-5 py-5 border ${EnabledDark == true? 'border-zinc-600 bg-zinc-700' : 'bg-zinc-200 border-zinc-300'}`}>
                <div className='w-1/3'>
            <div className='w-21 h-21 rounded-sm overflow-hidden '>
                <img src="https://rukmini1.flixcart.com/image/1500/1500/xif0q/perfume/n/v/g/-original-imahggeujdhx6kbc.jpeg?q=70" alt="" />
            </div>
            </div>

            <div className='flex flex-col items-start w-full justify-center h-full'>

            <h1 className='font-semibold tracking-tight text-lg'>Calvin Klein CK One</h1>
            <h1 className='font-normal tracking-tight text-xs'>Lorem ipsum, dolor sit amet consectetur adipisicing.</h1>
            <div className='flex items-center justify-center gap-2'>
            <h1 className='font-semibold tracking-tight text-lg mt-1'>$98.00</h1>
            <h1 className='font-semibold tracking-tight text-xs line-through mt-1'>$448.99</h1>
            </div>

            </div>

            <div className='flex items-center justify-center gap-3 w-1/3'>
                <button>
                <FontAwesomeIcon className='text-4xl hover:text-red-400 cursor-pointer hover:scale-99 text-red-500' icon={faSquareMinus} />
                </button>
                <button className={`cursor-pointer hover:bg-cyan-400 hover:scale-99 h-auto w-15 py-1 rounded-sm font-bold tracking-tight bg-cyan-500 flex items-center justify-center ${EnabledDark == true? 'text-zinc-700' : 'text-zinc-100'}`} >Buy</button>
            </div>

            </div>
            <div className={`flex items-center h-auto w-full justify-center gap-3 px-5 py-5 border ${EnabledDark == true? 'border-zinc-600 bg-zinc-700' : 'bg-zinc-200 border-zinc-300'}`}>
                <div className='w-1/3'>
            <div className='w-21 h-21 rounded-sm overflow-hidden '>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiJpO9VSIeJ9ILBx8F07VXhhBDfCsRrIzj0gDmsB3izA&s" alt="" />
            </div>
            </div>

            <div className='flex flex-col items-start w-full justify-center h-full'>

            <h1 className='font-semibold tracking-tight text-lg'>Leather Jacket</h1>
            <h1 className='font-normal tracking-tight text-xs'>Lorem ipsum, sjkds dolor.</h1>
            <div className='flex items-center justify-center gap-2'>
            <h1 className='font-semibold tracking-tight text-lg mt-1'>$9.00</h1>
            <h1 className='font-semibold tracking-tight text-xs line-through mt-1'>$17.99</h1>
            </div>

            </div>

            <div className='flex items-center justify-center gap-3 w-1/3'>
                <button>
                <FontAwesomeIcon className='text-4xl hover:text-red-400 cursor-pointer hover:scale-99 text-red-500' icon={faSquareMinus} />
                </button>
                <button className={`cursor-pointer hover:bg-cyan-400 hover:scale-99 h-auto w-15 py-1 rounded-sm font-bold tracking-tight bg-cyan-500 flex items-center justify-center ${EnabledDark == true? 'text-zinc-700' : 'text-zinc-100'}`} >Buy</button>
            </div>

            </div>
            <div className={`flex items-center h-auto w-full justify-center gap-3 px-5 py-5 border ${EnabledDark == true? 'border-zinc-600 bg-zinc-700' : 'bg-zinc-200 border-zinc-300'}`}>
                <div className='w-1/3'>
            <div className='w-21 h-21 rounded-sm overflow-hidden '>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaf1TwhD21_AA6cpjwOBHW9BdxIB3r9usOAOUSkO8MWQ&s=10" alt="" />
            </div>
            </div>

            <div className='flex flex-col items-start w-full justify-center h-full'>

            <h1 className='font-semibold tracking-tight text-lg'>Decathlon Zapatillas Vans V</h1>
            <h1 className='font-normal tracking-tight text-xs'>Lorem ipsum, dolor sit amet consectetur adipisicingjj, skjoklskdlakdl kjan.</h1>
            <div className='flex items-center justify-center gap-2'>
            <h1 className='font-semibold tracking-tight text-lg mt-1'>$33.99</h1>
            <h1 className='font-semibold tracking-tight text-xs line-through mt-1'>$68.99</h1>
            </div>

            </div>

            <div className='flex items-center justify-center gap-3 w-1/3'>
                <button>
                <FontAwesomeIcon className='text-4xl hover:text-red-400 cursor-pointer hover:scale-99 text-red-500' icon={faSquareMinus} />
                </button>
                <button className={`cursor-pointer hover:bg-cyan-400 hover:scale-99 h-auto w-15 py-1 rounded-sm font-bold tracking-tight bg-cyan-500 flex items-center justify-center ${EnabledDark == true? 'text-zinc-700' : 'text-zinc-100'}`} >Buy</button>
            </div>

            </div>
        </div>
    </div>
    <div className={`xl:flex xl:flex-col hidden w-8/10 ${EnabledDark == true? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-black'} h-auto py-3 pb-5 pt-4 gap-3 px-6`}>
        <h1 className='text-3xl tracking-tight font-semibold mt-2'>Cart Summary</h1>

        <div className={`${EnabledDark == true? 'bg-zinc-700' : 'bg-zinc-300'} mt-3 h-[0.02rem] w-full`}></div>
        <div className='h-88 flex items-between justify-start gap-3 flex-col  mt-2 mb-2'>
            
        <div className='h-88 flex items-center w-full justify-start gap-3 flex-col  mt-2 mb-2'>
           
            <div className='flex items-center w-full justify-between px-1'>
                <h1 className='text-2xl font-semibold'>Subtotal</h1>
                <h3 className='text-2xl font-semibold'>$235.00</h3>
            </div>
            <div className='flex items-center w-full justify-between px-1'>
                <h1 className='text-2xl font-semibold'>Shipping</h1>
                <h3 className='text-2xl font-semibold'>$40.00</h3>
            </div>
            <div className='flex items-center w-full justify-between px-1'>
                <h1 className='text-2xl font-semibold'>Estimated Tax</h1>
                <h3 className='text-2xl font-semibold'>$0.00</h3>
            </div>

        </div>
           
            <div className={`${EnabledDark == true? 'bg-zinc-700' : 'bg-zinc-300'} h-[0.02rem] w-full mt-3 mb-3`}></div>
            
            
            <div className='flex items-center w-full justify-between px-1'>
                <h1 className='text-4xl font-semibold'>Total:</h1>
                <h3 className='text-4xl font-semibold'>$275.00</h3>
            </div>

            <Link className={`w-full h-auto py-3 px-4 ${EnabledDark == true? 'bg-orange-500' : 'bg-orange-500 text-white'} flex items-center justify-center text-3xl rounded-md mt-4 font-semibold tracking-tight`}>Proceed to Pay</Link>
            

         </div>
    </div>
    <div className={`xl:flex xl:flex-col hidden w-8/10 ${EnabledDark == true? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-black'} h-auto py-3 pb-5 pt-4 gap-3 px-6`}>
        <h1 className='text-3xl tracking-tight font-semibold mt-2'>Contact Us</h1>

        <div className={`${EnabledDark == true? 'bg-zinc-700' : 'bg-zinc-300'} mt-3 h-[0.02rem] w-full`}></div>
        
            
        <div className='h-auto flex items-center w-full justify-start gap-3 flex-col  mt-2 mb-2'>
           
            <div className='flex items-center w-full justify-between px-1'>
                <h1 className='text-2xl font-semibold'>Email</h1>
                <a className='text-2xl font-semibold'>example@gmail.com</a>
            </div>
            <div className='flex items-center w-full justify-between px-1'>
                <h1 className='text-2xl font-semibold'> Ph.No.</h1>
                <h3 className='text-2xl font-semibold'>+919622xxxxxx</h3>
            </div>

        </div>
           
    </div>
    <div className={`xl:flex xl:flex-col hidden w-8/10 ${EnabledDark == true? 'bg-zinc-950 text-white border border-[#FFC247]' : 'bg-[#ffc247] text-black'} h-auto py-1.5 rounded-md pb-5 pt-4 gap-3 px-6`}>
        
            
        <div className={`h-auto flex items-center w-full justify-start gap-3 flex-col  mt-2 mb-2`}>
           
            <div className='flex items-center  w-full justify-between px-1'>
                <h1 className={`text-2xl font-semibold tracking-tight ${EnabledDark == true? 'text-[#FFC247]' : ''}`}> <FontAwesomeIcon icon={faCrown} /> Become a Seller</h1>
                <Link to='/become-a-seller  ' className={` tracking-tight px-5  hover:scale-99 rounded-md  ${EnabledDark == true? 'text-[#FFC247] border-[#FFC247] hover:bg-zinc-900 border' : 'text-zinc-950 border-yellow-600 border-2 hover:bg-yellow-500'}  py-1 text-xl font-semibold`}>APPLY  <FontAwesomeIcon icon={faAngleRight} className='text-lg '/></Link>
            </div>
           

        </div>
           
    </div>

</div>

        <div className=' w-full flex flex-col gap-3 items-center justify-center'>
            <div className='lg:w-50 w-40 md:w-43 h-40 md:h-43 overflow-hidden lg:h-50 lg:mt-4 mt-0.5  mb-8 rounded-full flex items-center justify-center gap-2'>
            <img className='object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStRK27j-h_gVI-GYCYPH88exuOYyJnR2gQajF3gRNCgpka6uRSHeBFW7E&s=10" alt="" />
            </div>
            <div className='input-CON w-auto h-auto gap-3 flex items-center justify-center flex-col'>
            <div className=' w-full flex gap-3 items-center justify-center'>
                <div className=' flex flex-col items-start gap-1.5 justify-center'>
                    <p className='font-bold sm:text-lg text-sm tracking-tight'>FIRST NAME</p>
                    <input type="text" value={firstName} disabled={true} onChange={(e) => {
                        setfirstName(e.target.value);
                    }} placeholder='' className={`${EnabledDark == true?  'bg-zinc-800 text-zinc-200 border-none' :'bg-zinc-300 text-zinc-500'} rounded-sm outline-none px-4 sm:py-2 w-full sm:text-2xl text-lg py-1`}/>
                    {/* {ErrorForNoFirstName &&  */}
                {/* <p className='text-red-600 text-md tracking-tight'>{ErrorForNoFirstName}</p> */}
                {/* } */}
                </div>
                <div className=' flex flex-col items-start gap-1.5 justify-center'>
                    <p className='font-bold sm:text-lg text-sm tracking-tight'>LAST NAME</p>
                    <input type="text" disabled={true} value={lastName}  onChange={(e) => {
                        setlastName(e.target.value);
                    }} placeholder='' className={`${EnabledDark == true?  'bg-zinc-800 text-zinc-200 border-none' :'bg-zinc-300 text-zinc-500'} rounded-sm outline-none px-4 sm:py-2 w-full sm:text-2xl text-lg py-1`}/>
                    {/* {ErrorForNoLastName && 
                <p className='text-red-600 text-md tracking-tight'>{ErrorForNoLastName}</p>
                } */}
                </div>
                
            </div>

            <div className='w-full flex flex-col items-start gap-1.5 justify-center'>
                <div className='flex items-center justify-start w-full gap-1'>
                <p className='font-bold sm:text-lg text-sm tracking-tight'>WHAT'S YOUR PROFESSION?</p> <p className={`${EnabledDark? 'text-zinc-300' : 'text-zinc-600'} text-sm mb-0.5 sm:text-lg`}>(optional)</p>
                </div>
                    <input type="text" value={AccountProfession} onChange={(e) => {
                        setProfession(e.target.value);
                    }} disabled={AccountProfession? true : false} placeholder='e.g, Student' className={`rounded-sm outline-none border-2 ${AccountProfession? 'bg-zinc-200' : 'bg-transparent'} ${EnabledDark == true? 'placeholder:text-zinc-400' : 'text-zinc-800'} border-zinc-300 px-4 sm:py-2 w-full sm:text-2xl text-lg py-1 ${AccountProfession !== ''? `${EnabledDark == true? 'text-zinc-200' : "text-zinc-500"}` : 'text-zinc-900'}`}/>
                <div className='w-full flex items-center justify-between px-1'><button onChange={(e) => {
                    e.preventDefault(); 
                }} className={`${EnabledDark == true? 'text-zinc-200' : 'text-zinc-800'}`}>Edit</button>
                <button className={`cursor-pointer ${EnabledDark == true? 'text-red-400' : 'text-red-700'}`} onClick={async (e) => {
                    e.preventDefault();

                    let remainedUser = await axios.delete(`${BACKEND_LIVE_URL}/deleteProfession`, {AccountProfession, headers:{
                        'Content-Type': "application/json"
                    }, withCredentials: true});

                }}>Delete</button>
                </div>
    
            </div>

            <div className='w-full flex items-center justify-center'></div>
            
            <div className='BORDER w-full mt-1 h-[0.05rem] bg-zinc-200'></div>

            <div className='w-full flex items-center justify-start'>
            <h1>Themes</h1>
            </div>

                <div className='w-full flex flex-col items-center justify-center gap-3'>

                <div className='flex w-full items-center justify-between'>
                    <h1 className={`text-2xl font-semibold ${EnabledDark == true? 'text-white' : 'text-zinc-700'}`}>Dark Mode</h1>
                    {EnabledDark == false &&
                    <button onClick={async (e) => {
                        e.preventDefault()
                        setEnabledDark(true);

                        changeThemeMode();

                    }} className='cursor-pointer h-8 w-16 rounded-4xl bg-zinc-300 px-2 py-2 flex items-center justify-start'>
                        <div className='bg-white h-5 w-5 rounded-full'></div>
                    </button>
                    } {EnabledDark == true &&
                    
                    <button onClick={(e) => {
                        e.preventDefault()
                        setEnabledDark(false);

                        changeThemeMode();

                    }} className='cursor-pointer h-8 w-16 rounded-4xl bg-zinc-600 px-2 py-2 flex items-center justify-end'>
                        <div className='bg-white h-5 w-5 rounded-full'></div>
                    </button>
                    
                    }
                </div>
                </div>


                <div className='BORDER w-full mt-1 h-[0.05rem] bg-zinc-200'></div>

            

            <div className='w-full flex items-center justify-start'>
            <h1>Permissions</h1>
            </div>

                <div className='w-full flex flex-col items-center justify-center gap-3'>

                <div className='flex w-full items-center justify-between'>
                    <h1 className={`text-2xl font-semibold ${EnabledDark == true? 'text-white' :  'text-zinc-700'}`}>Location Sharing</h1>
                    {EnabledLocation == false &&
                    <button onClick={(e) => {
                        e.preventDefault()
                        setEnabledLocation(true);
                    }} className='cursor-pointer h-8 w-16 rounded-4xl bg-zinc-300 px-2 py-2 flex items-center justify-start'>
                        <div className='bg-white h-5 w-5 rounded-full'></div>
                    </button>
                    } {EnabledLocation == true &&
                    
                    <button onClick={(e) => {
                        e.preventDefault()
                        setEnabledLocation(false);
                    }} className={`cursor-pointer h-8 w-16 rounded-4xl ${EnabledDark == true? 'bg-zinc-600' : 'bg-zinc-900'} px-2 py-2 flex items-center justify-end`}>
                        <div className='bg-white h-5 w-5 rounded-full'></div>
                    </button>
                    
                    }
                </div>
                <div className='flex w-full items-center justify-between'>
                    <h1 className={`text-2xl font-semibold ${EnabledDark == true? 'text-white' :  'text-zinc-700'}`}>Notification</h1>
                    {EnabledNotification == false &&
                    <button onClick={(e) => {
                        e.preventDefault()
                        setEnabledNotification(true);
                    }} className='cursor-pointer h-8 w-16 rounded-4xl bg-zinc-300 px-2 py-2 flex items-center justify-start'>
                        <div className='bg-white h-5 w-5 rounded-full'></div>
                    </button>
                    } {EnabledNotification == true &&
                    
                    <button onClick={(e) => {
                        e.preventDefault()
                        setEnabledNotification(false);
                    }} className={`cursor-pointer h-8 w-16 rounded-4xl ${EnabledDark == true? 'bg-zinc-600' : 'bg-zinc-900'} px-2 py-2 flex items-center justify-end`}>
                        <div className='bg-white h-5 w-5 rounded-full'></div>
                    </button>
                    
                    }
                </div>
                <div className='flex w-full items-center justify-between'>
                    <h1 className={`text-2xl font-semibold ${EnabledDark == true? 'text-white' :  'text-zinc-700'}`}>Camera, Photos & Videos</h1>
                    {EnabledMedia == false &&
                    <button onClick={(e) => {
                        e.preventDefault()
                        setEnabledMedia(true);
                    }} className='cursor-pointer h-8 w-16 rounded-4xl bg-zinc-300 px-2 py-2 flex items-center justify-start'>
                        <div className='bg-white h-5 w-5 rounded-full'></div>
                    </button>
                    } {EnabledMedia == true &&
                    
                    <button onClick={(e) => {
                        e.preventDefault()
                        setEnabledMedia(false);
                    }} className={`cursor-pointer h-8 w-16 rounded-4xl ${EnabledDark == true? 'bg-zinc-600' : 'bg-zinc-900'} px-2 py-2 flex items-center justify-end`}>
                        <div className='bg-white h-5 w-5 rounded-full'></div>
                    </button>
                    
                    }
                </div>

                </div>


            <div className='BORDER w-full mt-1 h-[0.05rem] bg-zinc-200'></div>

            <div className='w-full flex h-full flex-col items-center justify-center'>
            <div className='w-full h-full flex items-center justify-start'>
            <h1>My Orders</h1>
            </div>

                <div className={`w-full h-auto rounded-md mb-4 ${EnabledDark == true? 'bg-zinc-800 border border-zinc-700' : 'bg-zinc-100'} flex items-center justify-start mt-4 px-4 py-2`}>

                    <div className=' w-full flex flex-col items-start justify-center gap-1'>
                        <div className='w-full flex items-center justify-between'>
                        <h1 className='text-lg font-semibold'>Order #1</h1>
                        <Link className={`${EnabledDark == true? 'text-blue-300' : 'text-blue-500'} underline font-semibold`}>View Details<FontAwesomeIcon className='text-sm' icon={faChevronRight} /></Link>
                        </div>
                        <div className='flex items-center justify-start gap-1'>
                            <p>Date:</p>
                            <p>2024-05-15</p>
                        </div>
                        <div className='flex items-center justify-start gap-1'>
                            <p>Status:</p>
                            <p>Shipped(Expected: 2024-05-20)</p>
                        </div>
                        <div className='flex items-center justify-start gap-1'>
                            <p>Total:</p>
                            <p>$125.00</p>
                        </div>

                    <div className='flex items-center w-full mt-3 justify-start gap-3'>
                        <div className='w-20 rounded-md h-20 overflow-hidden flex items-center justify-center'>
                            <img src="https://cdn.faymas.in/prompt_outputs/ee42e35a-107a-4cfb-a43f-1e0e55614744/89eb3cb7-66fa-46f2-92b4-f72b7a939e61.webp" className='object-cover' alt="" />
                        </div>
                        <div className='w-20 rounded-md h-20 overflow-hidden flex items-center justify-center'>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGRj24ZJBnDIvu0gOmSvYfCPWFhnCbsdeAoPT_B6fdlRQpWS1Mja9JK4VD&s=10" className='object-cover' alt="" />
                        </div>
                        <div className='w-20 rounded-md h-20 overflow-hidden flex items-center justify-center'>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpjF6JGIlgj8dFeNhPMWbwgzw4vBkpPWtKdradAlpuaQ&s" className='object-cover' alt="" />
                        </div>
                    </div>
                    <button className={`w-full mt-6 h-11 ${EnabledDark == true? 'bg-blue-300 hover:bg-blue-400' : 'bg-blue-100 hover:bg-blue-200'} text-black text-xl font-semibold tracking-tight rounded-sm  cursor-pointer hover:scale-99`}>Track Order</button>
                    </div>


                </div>
                
                    
                  
             

                </div>

            <div className='BORDER w-full h-[0.05rem] bg-zinc-200'></div>

            <button className={`w-full mt-4 h-13 ${EnabledDark == true? 'bg-blue-300 text-black hover:bg-blue-400' : 'bg-zinc-900 text-white hover:bg-zinc-800'} text-xl font-semibold tracking-tight rounded-sm cursor-pointer hover:scale-99`}>{AccountProfession? "EDIT PROFILE" : "COMPLETE PROFILE"}</button>
            <button className={`w-full mt-1 h-13 text-xl font-semibold tracking-tight rounded-sm hover:bg-zinc-200 cursor-pointer hover:scale-99 ${EnabledDark == true? 'bg-zinc-100 text-black' : 'bg-zinc-100 text-black' }`}>CHANGE PASSWORD</button>

            <Link to='/' className='font-semibold tracking-tight hover:underline mt-3'>Go Back To Home</Link>
            </div>

                <div className={`xl:hidden xl:flex-col flex w-full md:w-9/10 ${EnabledDark == true? 'bg-zinc-950 text-white border border-[#FFC247]' : 'bg-[#ffc247] text-black'} h-auto py-1.5 rounded-md md:pb-5 md:pt-4 gap-3 md:px-6`}>
        
            
        <div className={`h-auto flex items-center w-full justify-start gap-3 flex-col  mt-2 mb-2`}>
           
            <div className='flex items-center  w-full justify-center gap-4 md:justify-between px-1'>
                <h1 className={`md:text-2xl font-semibold tracking-tight ${EnabledDark == true? 'text-[#FFC247]' : ''}`}> <FontAwesomeIcon icon={faCrown} /> Become a Seller</h1>
                <Link to='/become-a-seller  ' className={` tracking-tight md:px-5 px-2  hover:scale-99 rounded-md  ${EnabledDark == true? 'text-[#FFC247] border-[#FFC247] hover:bg-zinc-900 border' : 'text-zinc-950 border-zinc-800 border-2 hover:bg-yellow-500'}  py-0.5 text-sm md:text-xl font-semibold`}>APPLY  <FontAwesomeIcon icon={faAngleRight} className='text-md md:text-lg '/></Link>
            </div>
           

        </div>
           
    </div>

        </div>

            

    </main>
    </form>
    
    </>
  )
}

export default ProfileMain