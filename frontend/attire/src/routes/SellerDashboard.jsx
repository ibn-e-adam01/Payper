import React, { useState } from 'react'
import SideBarSellerDashboardPC from '../components/SideBarSellerDashboardPC'
import SellerDashboardNavbar from '../components/SellerDashboardNavbar'
import SellerDashboardMain from '../components/SellerDashboardMain'
import { useTheme } from '../components/ThemeContext'
import MyProductsSeller from '../components/MyProductsSeller'
import { useEffect } from 'react'
import axios from 'axios'

const SellerDashboard = () => {
    const { MyProductsClicked, setMyProductsClicked } = useTheme(false); 
    const { SellerDashboardClicked, setSellerDashboardClicked } = useTheme(true);
    const {Seller, setSeller} = useTheme([]);
    const BACKEND_LIVE_URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
      const getSellerData = async (e) => {
        

        const sellerData = await axios.get(`${BACKEND_LIVE_URL}/seller-dashboard`, {withCredentials: true});

        
        console.log(sellerData?.data?.seller);
        setSeller([sellerData?.data?.seller] || []);

      }

      getSellerData();
    },[])


  return (
    <>

    
    <SellerDashboardNavbar  /> 
    <div className='w-full flex 2xl:h-screen'>
    <SideBarSellerDashboardPC />
    {SellerDashboardClicked == true?
    <SellerDashboardMain /> : <MyProductsSeller />
    }
    {/* {MyProductsClicked == true &&
    
    } */}
    </div>
    
    
    
    </>
  )
}

export default SellerDashboard