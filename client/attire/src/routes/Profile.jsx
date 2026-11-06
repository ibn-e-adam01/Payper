import React, { useEffect, useState } from 'react'
import ProfileMain from '../components/ProfileMain'
import NavbarProfile from '../components/NavbarProfile'
import Lenis from 'lenis';
import { useTheme } from '../components/ThemeContext.jsx';
import axios from 'axios';

const Profile = () => {

  const { EnabledDark, setEnabledDark } = useTheme(false);
  const BACKEND_LIVE_URL = import.meta.env.VITE_BACKEND_URL; 

  useEffect(() => {
          const getUserData = async () => {
              let userData = await axios.get(`${BACKEND_LIVE_URL}/`, {
                  withCredentials: true
              });
  
              if(userData?.data?.success == true){
                  setEnabledDark(userData?.data?.user.darkTheme);
              } 
  
          }
  
          getUserData();
      }, []);

  const [MenuIsOpen, setMenuIsOpen] = useState(false);

  // Initialize Lenis
          const lenis = new Lenis();
  
          // Use requestAnimationFrame to continuously update the scroll
          function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
          }
          
          requestAnimationFrame(raf);

  return (
    <>
    
    <NavbarProfile  MenuIsOpen={MenuIsOpen} setMenuIsOpen={setMenuIsOpen}/>
    <ProfileMain  MenuIsOpen={MenuIsOpen} setMenuIsOpen={setMenuIsOpen}/>
    
    
    </>
  )
}

export default Profile