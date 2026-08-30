import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCartShopping, faUser, faHeart} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, MoreVertical, ListFilter } from 'lucide-react';
import axios from 'axios';
import { useTheme } from './ThemeContext';

const NavbarProfile = ({MenuIsOpen, setMenuIsOpen}) => {
    const navigate = useNavigate();
    const [User, setUser] = useState("");
    const [AccountProfession, setAccountProfession] = useState("");
    const [CartNumbers, setCartNumbers] = useState([]);
    const { EnabledDark, setEnabledDark } = useTheme(false); 

     const logout = async (e) => {
          e.preventDefault();
  
          let logoutUser = await axios.post("http://localhost:3000/logout", {}, {withCredentials: true});
  
          if(logoutUser?.data?.success == true){
              console.log(logoutUser?.data?.message);
              navigate('/')
          }
      }    

    useEffect(() => {
        const getUserData = async () => {
            let userData = await axios.get("http://localhost:3000/", {
                withCredentials: true
            });
            if(userData?.data?.success == true){
                setUser(userData?.data?.user);
                setAccountProfession(userData?.data?.user?.profession);
                setCartNumbers([userData?.data?.user?.cartProducts] || []);
                setEnabledDark(userData?.data?.user?.darkTheme)
            }
        }

        getUserData();
    });

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
    <header className={`h-16 w-full absolute pt-1 z-20 flex items-center justify-between lg:px-33 xl:px-3 gap-5 px-4 md:px-17 ${EnabledDark == true? 'bg-zinc-900 text-white border-zinc-700' : 'bg-white border-zinc-200'} fixed md:border-b `}>
        
        <div className='w-full flex items-center justify-between lg:pl-16 xl:pl-43 lg:justify-start px-3'>
            <div>
                  {MenuIsOpen == false &&
                <button onClick={toggleMenu} className='lg:hidden flex' aria-label="Open Menu">
                <Menu size={24} />
              </button>
                }
              {MenuIsOpen == true &&
                <button onClick={toggleMenuClose} className='lg:hidden flex' aria-label="Open Menu">
                <Menu size={22} />
              </button>
              }
              </div>
      
      <div>
        <Link className='text-4xl lg:pl-0 pl-8 font-extrabold tracking-[0.03rem] cursor-pointer' to='/'>Attire</Link>
        </div>
        <div className='flex items-center justify-center gap-5 lg:hidden'>
        <FontAwesomeIcon className='text-xl' icon={faHeart} />
        <FontAwesomeIcon icon={faCartShopping} className='text-xl'/>
        {CartNumbers.length > 0 && CartNumbers.map((Number) => (
        <div key={Number} className='w-auto absolute z-10 top-2.5 md:right-19 right-5.5 h-auto px-1.5 py-0.5 rounded-full bg-blue-500 text-white flex items-center justify-center'><p className='text-xs font-semibold'>{Number?.length}</p></div>
      ))}
        {CartNumbers.length == 0 || !CartNumbers && 
        <div className='w-auto absolute z-10 top-2.5 md:right-19 right-5.5 h-auto px-1.5 py-0.5 rounded-full bg-blue-500 text-white flex items-center justify-center'><p className='text-xs font-semibold'>0</p></div>
        }
        </div>
      
        </div>
        <div className='w-full lg:flex items-center justify-center lg:pr-17 xl:pr-31 gap-5 px-3 hidden'>
            <div className={`flex items-center justify-center gap-1 ${EnabledDark == true? 'bg-zinc-800' : 'bg-zinc-200'} px-3 py-0.5 rounded-xs`}>
                <FontAwesomeIcon className='text-zinc-400' icon={faMagnifyingGlass} />
            <input type="text" placeholder='Search' className='text-lg font-normal w-36 px-1 outline-none placeholder:text-zinc-400'/>
            </div>
   
        <Link to={AccountProfession? '/profile' : '/setup-your-profile'} className='h-auto flex items-center justify-center  text-2xl '><FontAwesomeIcon icon={faHeart} /></Link>

        <div className='flex items-center justify-center w-auto'>
        <FontAwesomeIcon icon={faCartShopping} className='text-xl'/>
        <h3 className='font-semibold text-lg tracking-tight'>Cart</h3>
        {CartNumbers.length > 0 && CartNumbers.map((Number) => (
        <h3 className='font-semibold text-lg'>({Number?.length})</h3>
        ))}
        {CartNumbers.length == 0 && 
        <h3 className='font-semibold text-lg'>(0)</h3>
      }
        </div>


    
    <button onClick={logout} className='h-auto py-0.5 font-semibold hover:bg-red-600 cursor-pointer tracking-tight w-auto px-3.5 rounded-md text-lg bg-red-700 text-white'>LOGOUT</button>

        </div>
    </header>
    </>

  )
}

export default NavbarProfile