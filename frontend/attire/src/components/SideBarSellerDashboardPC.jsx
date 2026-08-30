import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney, faGear, faRightFromBracket, faTrashCan, faUserLock, faUserPlus, faBasketShopping, faPlus, faHeadset, faCube, faChartSimple, faIndianRupeeSign, faStar, faArrowRotateLeft, faWallet} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useTheme } from './ThemeContext';

const SideBarSellerDashboardPC = ({EnabledDark, setEnabledDark}) => {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);
    const [UserLoggedInSideBarProfile, setUserLoggedInSideBarProfile] = useState("");
    const { NotLoggedIn, setNotLoggedIn } = useTheme(false); 
    const { CreateProductOpen, setCreateProductOpen } = useTheme(false); 
    const { MyProductsClicked, setMyProductsClicked } = useTheme(false); 
    const { SellerDashboardClicked, setSellerDashboardClicked } = useTheme(true); 
    
    

    useEffect(() => {
        try{
            const getUserData = async () => {
                let userData = await axios.get("http://localhost:3000/", {
                    withCredentials: true
                });
    
                if(userData?.data?.success){
                    setUserLoggedInSideBarProfile(userData?.data?.user);
                    
                } 

                else{
                    setNotLoggedIn(true);
                }
    
            }
    
            getUserData();

        } catch(err){
            console.log(err);
            setNotLoggedIn(true)

        }
        }, []);

    const deleteAccount = async (e) => {
        e.preventDefault();

      const deleteMyAccount = await MySwal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      width: '90%', // Responsive width for mobile viewpoint
      target: 'body',
    });

    if(deleteMyAccount.isConfirmed){
        let deleteAPI = await axios.delete("http://localhost:3000/deleteAccount", {withCredentials: true});

        if(deleteAPI?.data?.success == true){
        MySwal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
        );
        }
    }
}

     const logout = async (e) => {
          e.preventDefault();
  
          let logoutUser = await axios.post("http://localhost:3000/logout", {}, {withCredentials: true});
  
          if(logoutUser?.data?.success == true){
              console.log(logoutUser?.data?.message);
              navigate('/')
          }
      }

  return (
    <>
    
    <div className={` border-r lg:flex hidden  flex-col items-center px-4 pr-7 py-3 justify-between bg-zinc-950 border-zinc-600 w-7/10 md:w-1/5`}>

    <div className='w-full flex items-center justify-center flex-col gap-3'>

   

    <div className='w-full flex flex-col items-center justify-center gap-1'>

    {NotLoggedIn == true &&

    <div className='flex items-center justify-center gap-2 flex-col'>

    <Link to='/signin' className={`w-full h-10 rounded-md tracking-tight font-semibold ${EnabledDark == true? 'bg-emerald-700 text-white' : "bg-zinc-700 text-white"} gap-2 flex items-center justify-start px-4 text-lg`}><FontAwesomeIcon icon={faUserLock} /> Login</Link>

    </div>

    }

    <button onClick={(e) => {
        e.preventDefault();
        setSellerDashboardClicked(true);
        setMyProductsClicked(false);

    }} className={`w-full h-10 rounded-md tracking-tight font-semibold text-white ${SellerDashboardClicked == true? 'bg-[#5c40074c] border border-[#9c6800] ' : ''} cursor-pointer gap-2  flex items-center justify-start px-4 text-md`}><FontAwesomeIcon className='text-[#ffc247]' icon={faHouseChimney}  /> Dashboard</button>
    <button onClick={(e) => {
        e.preventDefault();
        setMyProductsClicked(true);
        setSellerDashboardClicked(false);
    }} className={`w-full h-10 rounded-md tracking-tight font-semibold text-white ${MyProductsClicked == true? 'bg-[#5c40074c] border border-[#9c6800]' : ''} cursor-pointer gap-2 flex items-center justify-start px-4 text-lg`}><FontAwesomeIcon icon={faCube} className='text-[#ffc247]' />My Products</button>
    <Link to='/' className={`w-full h-10 rounded-md tracking-tight font-semibold text-white  active:bg-[#ffc247] active:text-black gap-2 flex items-center justify-start px-4 text-lg`}><FontAwesomeIcon icon={faBasketShopping} className='text-[#ffc247]' />Orders</Link>
    <Link to='/' className={`w-full h-10 rounded-md tracking-tight font-semibold text-white  active:bg-[#ffc247] active:text-black gap-2 flex items-center justify-start px-4 text-lg`}><FontAwesomeIcon icon={faChartSimple} className='text-[#ffc247]' />Analytics</Link>
    <Link to='/' className={`w-full h-10 rounded-md tracking-tight font-semibold text-white  active:bg-[#ffc247] active:text-black gap-2 flex items-center justify-start px-4 text-lg`}><FontAwesomeIcon icon={faIndianRupeeSign} className='text-[#ffc247]' />Earnings</Link>
    <Link to='/' className={`w-full h-10 rounded-md tracking-tight font-semibold text-white  active:bg-[#ffc247] active:text-black gap-2 flex items-center justify-start px-4 text-lg`}><FontAwesomeIcon icon={faStar} className='text-[#ffc247]' />Reviews</Link>
    <Link to='/' className={`w-full h-10 rounded-md tracking-tight font-semibold text-white  active:bg-[#ffc247] active:text-black gap-2 flex items-center justify-start px-4 text-lg`}><FontAwesomeIcon icon={faArrowRotateLeft} className='text-[#ffc247]' />Returns</Link>
    <Link to='/' className={`w-full h-10 rounded-md tracking-tight font-semibold text-white  active:bg-[#ffc247] active:text-black gap-2 flex items-center justify-start px-4 text-lg`}><FontAwesomeIcon icon={faWallet} className='text-[#ffc247]' />Payouts</Link>
    <Link to='/' className={`w-full h-10 rounded-md tracking-tight font-semibold text-white  active:bg-[#ffc247] active:text-black gap-2 flex items-center justify-start px-4 text-lg`}><FontAwesomeIcon icon={faGear} className='text-[#ffc247]' />Settings</Link>
     {!UserLoggedInSideBarProfile &&
    
    <Link to='/signin' className={`w-full h-10 rounded-md tracking-tight font-semibold ${EnabledDark == true? 'bg-emerald-700 text-white' : "bg-zinc-700 text-white"} gap-2 flex items-center justify-start px-4 text-lg`}><FontAwesomeIcon icon={faUserLock} /> Login</Link>
    
    }
 {!UserLoggedInSideBarProfile &&
    
    <Link to='/createAccount' className={`w-full h-10 rounded-md tracking-tight font-semibold ${EnabledDark == true? 'bg-blue-700 text-white' : "bg-blue-900 text-white"} gap-2 flex items-center justify-start px-4 text-lg`}><FontAwesomeIcon icon={faUserPlus} /> Signup</Link>
    
    }

    </div>
    </div>

    <div className='w-full flex flex-col items-center justify-center gap-1'>

        {UserLoggedInSideBarProfile && 
    <Link onClick={(e) => {
        e.preventDefault();
        setCreateProductOpen(true);
    }} className={`w-full h-10 rounded-md tracking-tight font-semibold border border-[#eba51a] text-[#ffc247] active:text-[#f9ab0e] gap-2 flex items-center justify-start px-4 text-lg`}><FontAwesomeIcon icon={faPlus} /> Add Product</Link>
    }

    <Link onClick={logout} className={`w-full h-10 rounded-md tracking-tight font-semibold active:bg-red-500 active:text-white gap-2 flex items-center text-white justify-start px-4 text-md`}><FontAwesomeIcon className='text-[#ffc247] text-xl' icon={faHeadset} /> Help & Support</Link>


    {UserLoggedInSideBarProfile && 
    <Link onClick={logout} className={`w-full h-10 rounded-md tracking-tight font-semibold text-red-400 active:bg-red-500 active:text-white gap-2 flex items-center justify-start px-4 text-lg`}><FontAwesomeIcon icon={faRightFromBracket} className='pl-1' /> Logout</Link>
    }

    

    </div>
    
    </div>
    
    </>
  )
}

export default SideBarSellerDashboardPC