import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCartShopping, faUser} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, MoreVertical, ListFilter } from 'lucide-react';
import axios from 'axios';
import { useTheme } from './ThemeContext';

const Navbar = ({HomeMenuIsOpen, setHomeMenuIsOpen, NoOfCarted,
setNoOfCarted}) => {
    const navigate = useNavigate();
    const [User, setUser] = useState("");
    const [AccountProfession, setAccountProfession] = useState("");
    const { EnabledDark, setEnabledDark } = useTheme(false); 

    useEffect(() => {
        const getUserData = async () => {
            let userData = await axios.get("http://localhost:3000/", {
                withCredentials: true
            });
            if(userData?.data?.success == true){
                setUser(userData?.data?.user);
                setAccountProfession(userData?.data?.user?.profession);
                setNoOfCarted([userData?.data?.user?.cartProducts] || []);
            }
        }

        getUserData();
    }, []);

     const toggleMenu = (e) => {
            e.preventDefault();
    
            setHomeMenuIsOpen(true);

            console.log(HomeMenuIsOpen);
    
    
    }

     const toggleMenuClose = (e) => {
            e.preventDefault();
    
            setHomeMenuIsOpen(false);

            console.log(HomeMenuIsOpen);
    
    
    }


  return (
    <>
    <header className={`h-16 w-full flex items-center pt-1 justify-between 2xl:gap-303  lg:px-14 lg:gap-3 gap-5 px-7 md:px-21 ${EnabledDark == true? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-zinc-200'} fixed md:border-b `}>
        
        <div className='w-full flex items-center justify-between'>
        <div>
          {HomeMenuIsOpen == false &&
        <button onClick={toggleMenu} className='lg:hidden flex' aria-label="Open Menu">
        <Menu size={24} />
      </button>
        }
      {HomeMenuIsOpen == true &&
        <button onClick={toggleMenuClose} className='lg:hidden flex' aria-label="Open Menu">
        <Menu size={22} />
      </button>
      }
      </div>
      
      <div>
        <Link className='text-4xl lg:pl-0 pl-8 font-extrabold tracking-[0.03rem] cursor-pointer' to='/'>Attire</Link>
        </div>
        <div className='flex items-center justify-center gap-5 lg:hidden'>
        <FontAwesomeIcon className='text-2xl' icon={faMagnifyingGlass} />
        
        <FontAwesomeIcon className='active:scale-99' icon={faCartShopping} className='text-xl'/>
        {NoOfCarted.length > 0 && NoOfCarted.map((Number) => (
        <div className='w-auto absolute z-10 top-2.5 md:right-19 right-5.5 h-auto px-1.5 py-0.5 rounded-full bg-blue-500 text-white flex items-center justify-center'><p className='text-xs font-semibold'>{Number?.length}</p></div>
      ))}
        {NoOfCarted.length == 0 || !NoOfCarted && 
        <div className='w-auto absolute z-10 top-2.5 md:right-19 right-5.5 h-auto px-1.5 py-0.5 rounded-full bg-blue-500 text-white flex items-center justify-center'><p className='text-xs font-semibold'>0</p></div>
        }
        </div>
        <h3 className='text-md font-semibold tracking-tight hidden lg:flex '>New Arrivals</h3>
        <h3 className='text-md font-semibold tracking-tight hidden lg:flex' >Men</h3>
        <h3 className='text-md font-semibold tracking-tight hidden lg:flex' >Women</h3>
        <h3 className=' lg:flex font-semibold tracking-tight hidden text-md' >Accessories</h3>
        <h3 className='text-md font-semibold tracking-tight hidden lg:flex' >Sale</h3>

        </div>
        <div className='w-full lg:flex items-center justify-center gap-5 px-3 hidden xl:pl-57'>
            <div className={`flex items-center justify-center gap-1  px-3 py-0.5 ${EnabledDark == true? 'bg-zinc-800' : 'bg-zinc-200'} rounded-xs`}>
                <FontAwesomeIcon className='text-zinc-400' icon={faMagnifyingGlass} />
            <input type="text" placeholder='Search' className='text-lg font-normal w-36 px-1 outline-none placeholder:text-zinc-400'/>
            </div>

        {User && 
        
        <Link to='/profile' className='h-auto flex items-center justify-center  text-2xl '><FontAwesomeIcon icon={faUser} /></Link>

        }

        {!User &&

        <Link to='/createAccount' className='h-auto w-22 py-1 rounded-sm font-semibold tracking-tight bg-blue-800 hover:bg-blue-900 flex items-center justify-center text-white '>SIGN UP</Link>

        }
        <div className='flex items-center justify-center w-auto'>
        <FontAwesomeIcon icon={faCartShopping} className='text-xl'/>
        <h3 className='font-semibold text-lg tracking-tight'>Cart</h3>
        {NoOfCarted.length > 0 && NoOfCarted.map((Number) => (
        <h3 className='font-semibold text-lg'>({Number?.length})</h3>
        ))}
        {NoOfCarted.length == 0 && 
        <h3 className='font-semibold text-lg'>(0)</h3>
      }
        </div>
        </div>
    </header>
    </>

  )
}

export default Navbar