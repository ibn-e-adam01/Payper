import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney, faGear, faRightFromBracket, faTrashCan, faUserLock, faUserPlus, faBasketShopping} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useTheme } from './ThemeContext';

const SideBarSellerApplyPage = ({EnabledDark, setEnabledDark}) => {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);
    const [UserLoggedInSideBarProfile, setUserLoggedInSideBarProfile] = useState("");
    const { NotLoggedIn, setNotLoggedIn } = useTheme(false); 
    const BACKEND_LIVE_URL = import.meta.env.VITE_BACKEND_URL;
    
    

    useEffect(() => {
        try{
            const getUserData = async () => {
                let userData = await axios.get(`${BACKEND_LIVE_URL}/`, {
                    withCredentials: true
                });
    
                if(userData?.data?.success){
                    setUserLoggedInSideBarProfile(userData?.data?.user);
                    setEnabledDark(userData?.data?.user?.darkTheme);
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
        let deleteAPI = await axios.delete(`${BACKEND_LIVE_URL}/deleteAccount`, {withCredentials: true});

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
  
          let logoutUser = await axios.post(`${BACKEND_LIVE_URL}/logout`, {}, {withCredentials: true});
  
          if(logoutUser?.data?.success == true){
              console.log(logoutUser?.data?.message);
              navigate('/')
          }
      }

  return (
    <>
    
    <div className={`h-full fixed flex border-r   flex-col items-start px-4 pr-7 py-10 justify-start z-10 top-14  gap-3 bg-zinc-950 border-zinc-600 w-7/10 md:w-1/3`}>

    {NotLoggedIn == true &&

    <div className='flex items-center justify-center gap-2 flex-col'>

    <Link to='/signin' className={`w-full h-10 rounded-md tracking-tight font-semibold ${EnabledDark == true? 'bg-emerald-700 text-white' : "bg-zinc-700 text-white"} gap-2 flex items-center justify-start px-4 text-lg`}><FontAwesomeIcon icon={faUserLock} /> Login</Link>

    </div>

    }

    <Link to='/' className={`w-full h-10 rounded-md tracking-tight font-semibold text-[#ffc247] border border-[#db9b1a] active:bg-[#ffc247] active:text-black gap-2 flex items-center justify-start px-4 text-lg`}><FontAwesomeIcon icon={faHouseChimney} /> Home</Link>
    <Link to='/' className={`w-full h-10 rounded-md tracking-tight font-semibold text-[#ffc247] border border-[#db9b1a] active:bg-[#ffc247] active:text-black gap-2 flex items-center justify-start px-4 text-lg`}><FontAwesomeIcon icon={faBasketShopping} />My Products</Link>
    <Link to='/' className={`w-full h-10 rounded-md tracking-tight font-semibold text-[#ffc247] border border-[#db9b1a] active:bg-[#ffc247] active:text-black gap-2 flex items-center justify-start px-4 text-lg`}><FontAwesomeIcon icon={faGear} />Settings</Link>
    {UserLoggedInSideBarProfile && 
    <Link onClick={logout} className={`w-full h-10 rounded-md tracking-tight font-semibold border border-red-500 text-red-400 active:bg-red-500 active:text-white gap-2 flex items-center justify-start px-4 text-lg`}><FontAwesomeIcon icon={faRightFromBracket} /> Logout</Link>
    } {!UserLoggedInSideBarProfile &&
    
    <Link to='/signin' className={`w-full h-10 rounded-md tracking-tight font-semibold ${EnabledDark == true? 'bg-emerald-700 text-white' : "bg-zinc-700 text-white"} gap-2 flex items-center justify-start px-4 text-lg`}><FontAwesomeIcon icon={faUserLock} /> Login</Link>
    
    }
 {!UserLoggedInSideBarProfile &&
    
    <Link to='/createAccount' className={`w-full h-10 rounded-md tracking-tight font-semibold ${EnabledDark == true? 'bg-blue-700 text-white' : "bg-blue-900 text-white"} gap-2 flex items-center justify-start px-4 text-lg`}><FontAwesomeIcon icon={faUserPlus} /> Signup</Link>
    
    }

    </div>
    
    </>
  )
}

export default SideBarSellerApplyPage