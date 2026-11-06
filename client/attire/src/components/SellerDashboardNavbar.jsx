import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCartShopping, faUser, faHeart, faSliders, faBell} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, MoreVertical, ListFilter } from 'lucide-react';
import axios from 'axios';
import { useTheme } from './ThemeContext';

const SellerDashboardNavbar = ({MenuIsOpen, setMenuIsOpen}) => {
    const navigate = useNavigate();
    const [User, setUser] = useState([]);
    const [AccountProfession, setAccountProfession] = useState("");
    const [CartNumbers, setCartNumbers] = useState([]);
    const { EnabledDark, setEnabledDark } = useTheme(false);
    const {Seller, setSeller} = useTheme([]); 
    const BACKEND_LIVE_URL = import.meta.env.VITE_BACKEND_URL;

     const logout = async (e) => {
          e.preventDefault();
  
          let logoutUser = await axios.post(`${BACKEND_LIVE_URL}/logout`, {}, {withCredentials: true});
  
          if(logoutUser?.data?.success == true){
              console.log(logoutUser?.data?.message);
              navigate('/')
          }
      }    

    useEffect(() => {
        const getUserData = async () => {
            let userData = await axios.get(`${BACKEND_LIVE_URL}/`, {
                withCredentials: true
            });
            if(userData?.data?.success == true){
              console.log(userData?.data?.user);
                setUser([userData?.data?.user] || []);
                setAccountProfession(userData?.data?.user?.profession);
                setCartNumbers([userData?.data?.user?.cartProducts] || []);
                setEnabledDark(userData?.data?.user?.darkTheme)
            }
        }

        getUserData();
    }, []);

    const toggleMenu = (e) => {
            e.preventDefault();
    
            setMenuIsOpen(true);

            console.log(MenuIsOpen);
    
    
    }

     const toggleMenuClose = (e) => {
            e.preventDefault();
    
            setMenuIsOpen(false);

            console.log(MenuIsOpen);
    
    
    }


  return (
    <>
    <header className={`h-16 pt-1 w-full z-20 flex items-center justify-between  xl:px-3 gap-5 px-4 lg:px-2.5 md:px-17 bg-zinc-950 text-white border-zinc-700  md:border-b `}>
        
        <div className='w-full flex items-center justify-between  lg:justify-start px-3'>
            <div>
                  {MenuIsOpen == false &&
                <button onClick={toggleMenu} className='lg:hidden flex' aria-label="Open Menu">
                <Menu size={24} className='text-[#ffc247]' />
              </button>
                }
              {MenuIsOpen == true &&
                <button onClick={toggleMenuClose} className='lg:hidden flex' aria-label="Open Menu">
                <Menu size={22} className='text-[#ffc247]' />
              </button>
              }
              </div>
      
      <div className='w-3/10 flex items-center justify-center'>
        <Link className={`text-4xl text-[#FFC247]  pl-8 font-extrabold tracking-[0.03rem] cursor-pointer`} to='/become-a-seller'>Attire</Link>
        </div>

      <div className='w-11/10 lg:flex hidden items-center justify-center gap-3'>

            <div className=''>
                <FontAwesomeIcon className='text-xl mt-2 text-[#efa91c]' icon={faSliders} />
              </div>

        <Link className={`text-2xl text-white lg:pl-0  pl-8 font-semibold tracking-tight cursor-pointer`} to='/'>Seller Dashboard</Link>
        </div>


        



        <div className='flex items-center justify-center gap-5 lg:hidden'>
        <FontAwesomeIcon className='text-xl text-[#ffc247]' icon={faHeart} />
        <FontAwesomeIcon icon={faCartShopping} className='text-xl text-[#ffc247]'/>
        {CartNumbers.length > 0 && CartNumbers.map((Number) => (
        <div key={Number} className='w-auto absolute z-10 top-2.5 md:right-19 right-5.5 h-auto px-1.5 py-0.5 rounded-full bg-[#b97c02] text-white flex items-center justify-center'><p className='text-xs font-semibold'>{Number?.length}</p></div>
      ))}
        {CartNumbers.length == 0 || !CartNumbers && 
        <div className='w-auto absolute z-10 top-2.5 md:right-19 right-5.5 h-auto px-1.5 py-0.5 rounded-full bg-blue-500 text-white flex items-center justify-center'><p className='text-xs font-semibold'>0</p></div>
        }
        </div>
        
        </div>
        <div className='w-full lg:flex items-center justify-center gap-7 xl:pl-60 2xl:pl-280 lg:pl-72 px-3 hidden'>
            <div className={`flex items-center justify-center gap-1  'bg-zinc-900 border border-[#f3b029] px-3 py-0.5 rounded-xs`}>
                <FontAwesomeIcon className={`text-[#edb84ece]`} icon={faMagnifyingGlass} />
            <input type="text" placeholder='Search' className={`text-lg font-normal w-36 px-1 outline-none placeholder:text-[#edb84ece] text-[#ffc247]`}/>
            </div>
   
        <Link to={AccountProfession? '/profile' : '/setup-your-profile'} className={`h-auto flex items-center justify-center text-[#FCC247] text-2xl `}><FontAwesomeIcon icon={faBell} /></Link>

        <div className={`flex items-center justify-center text-[#FFC247] w-auto`}>
        <FontAwesomeIcon icon={faCartShopping} className='text-xl'/>
        <h3 className='font-semibold text-lg tracking-tight'>Cart</h3>
        {CartNumbers.length > 0 && CartNumbers.map((Number) => (
        <h3 className='font-semibold text-lg'>({Number?.length})</h3>
        ))}
        {CartNumbers.length == 0 && 
        <h3 className='font-semibold text-lg'>(0)</h3>
      }
        </div>

        {Seller && User?.map((user) => (
        <Link to='/profile' className='flex h-10 hover:scale-99 items-end justify-center gap-2 w-full border px-3 py-0.5 rounded-sm border-zinc-700 bg-zinc-900'>
          <div className='w-15 mt-0.5 h-9 flex items-center justify-center overflow-hidden rounded-full'>
            <img className='object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNWPZ1K2ao6oLCFLcgjFfjbu9zF16w1yXQ53tJqP1B3Q&s=10" alt="" />
          </div>

          <div className='flex font-semibold tracking-tight w-full text-white flex-col items-start justify-center'>
            <h1 className='text-sm'>{user?.firstName}</h1>
            <h1 className='text-xs pl-1 text-zinc-300'>{user?.primaryRole}</h1>
          </div>
        </Link>
        ))}

        </div>
    </header>
    </>

  )
}

export default SellerDashboardNavbar