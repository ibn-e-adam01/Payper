import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import SiteBody from '../components/SiteBody'
import { useTheme } from '../components/ThemeContext.jsx';
import axios from 'axios';
import Lenis from 'lenis'

const Home = () => {
  const [HomeMenuIsOpen, setHomeMenuIsOpen] = useState(false);
  const [NoOfCarted, setNoOfCarted] = useState([]);
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
    
        <Navbar HomeMenuIsOpen={HomeMenuIsOpen} NoOfCarted={NoOfCarted} setNoOfCarted={setNoOfCarted} setHomeMenuIsOpen={setHomeMenuIsOpen}/>
        <SiteBody HomeMenuIsOpen={HomeMenuIsOpen} NoOfCarted={NoOfCarted} setNoOfCarted={setNoOfCarted} setHomeMenuIsOpen={setHomeMenuIsOpen}/>
    
    </>
  )
}

export default Home