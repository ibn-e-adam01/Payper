import React, { useEffect, useState } from 'react'
import NavbarProfile from '../components/NavbarProfile'
import Lenis from 'lenis';
import { useTheme } from '../components/ThemeContext.jsx';
import axios from 'axios';
import PurchasePortalMain from '../components/PurchasePortalMain.jsx';
import SellerPageNavbar from '../components/SellerPageNavbar';
import SellerPageApplyMain from '../components/SellerPageApplyMain.jsx';

const BecomeASeller = () => {

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
    
    <SellerPageNavbar  MenuIsOpen={MenuIsOpen} setMenuIsOpen={setMenuIsOpen}/>
    <SellerPageApplyMain  MenuIsOpen={MenuIsOpen} setMenuIsOpen={setMenuIsOpen}/>
    
    
    </>
  )
}

export default BecomeASeller