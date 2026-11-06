import { faArrowTrendUp, faBagShopping, faCalendarDays, faChevronDown, faCube, faIndianRupeeSign, faStar, faWallet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import FourStarYellow from '../assets/FourStarYellow.png'
import { Link } from 'react-router-dom'
import CreateProductSeller from './CreateProductSeller'
import { useTheme } from './ThemeContext'

const SellerDashboardMain = () => {

    const {CreateProductOpen, setCreateProductOpen} = useTheme(false);    
  return (
    <>
    
    <main className='flex w-full h-full items-center justify-start flex-col gap-1 px-2 lg:px-5 py-2 bg-zinc-950'>
   

   {CreateProductOpen == true &&

   <div className='fixed top-0 z-30 bg-[#00000082] h-full flex left-0 w-full justify-center items-center '>
   <CreateProductSeller CreateProductOpen={CreateProductOpen} setCreateProductOpen={setCreateProductOpen} />

   </div>
   
   }
   
    <div className='w-full h-auto py-1 px-3 flex items-center justify-between'>

    <h1 className='text-lg font-semibold tracking-tight text-white'>Overview</h1>

    <div className='px-2 py-1 bg-zinc-900 border border-zinc-700 rounded-md text-white flex items-center justify-center gap-1'>

    <FontAwesomeIcon icon={faCalendarDays} />
    <h1 className='text-sm font-semibold tracking-tight lg:flex hidden'>21 Aug 2026 - 22 Aug 2026</h1>
    <h1 className='text-sm font-semibold tracking-tight lg:hidden flex'>21 - 22 Aug 2026</h1>
    <FontAwesomeIcon className='text-sm' icon={faChevronDown} />

    </div>

    </div>

    <div className='lg:grid-cols-5 grid grid-cols-2 items-center justify-between gap-2 w-full h-auto px-1 py-1.5'>

    <div className='dataBox w-full h-auto py-3 px-3 flex flex-col bg-zinc-900 border border-zinc-700 rounded-md gap-1.5'>

        <div className='flex items-center w-full justify-between'>
            <div className='flex  flex-col items-start justify-center gap-2'>
                <h5 className='text-xs text-zinc-300 font-semibold tracking-tight'>Total Revenue</h5>
                <h1 className='text-3xl text-[#ffc247] font-semibold tracking-tight'>$4,800</h1>
            </div>

            <div className='w-14 h-14 rounded-full border-[#4c3301] border-2 bg-[#1a161092] flex items-center justify-center'>
                <FontAwesomeIcon icon={faIndianRupeeSign} className='text-3xl text-[#ffc247]'/>
            </div>
        </div>

        <div className='w-full flex items-center justify-start gap-1 text-xs font-semibold tracking-tight'>
            <h1 className='text-green-400'><FontAwesomeIcon icon={faArrowTrendUp} className='' /> 12.5%</h1>
            <h1 className='text-zinc-400'>vs last 30 days</h1>
        </div>

    </div>
    <div className='dataBox w-full h-auto py-3 px-3 flex flex-col bg-zinc-900 border border-zinc-700 rounded-md gap-1.5'>

        <div className='flex items-center w-full justify-between'>
            <div className='flex flex-col items-start justify-center gap-2'>
                <h5 className='text-xs text-zinc-300 font-semibold tracking-tight'>Total Orders</h5>
                <h1 className='text-3xl text-white font-semibold tracking-tight'>47</h1>
            </div>

            <div className='w-14 h-14 rounded-full border-[#4c3301] border-2 bg-[#1a161092] flex items-center justify-center'>
                <FontAwesomeIcon icon={faBagShopping} className='text-3xl text-[#ffc247]'/>
            </div>
        </div>

        <div className='w-full flex items-center justify-start gap-1 text-xs font-semibold tracking-tight'>
            <h1 className='text-green-400'><FontAwesomeIcon icon={faArrowTrendUp} className='' /> 8.3%</h1>
            <h1 className='text-zinc-400'>vs last 30 days</h1>
        </div>

    </div>
    <div className='dataBox w-full h-auto py-3 px-3 flex flex-col bg-zinc-900 border border-zinc-700 rounded-md gap-1.5'>

        <div className='flex items-center w-full justify-between'>
            <div className='flex flex-col items-start justify-center gap-2'>
                <h5 className='text-xs text-zinc-300 font-semibold tracking-tight'>Products Sold</h5>
                <h1 className='text-3xl text-white font-semibold tracking-tight'>63</h1>
            </div>

            <div className='w-14 h-14 rounded-full border-[#4c3301] border-2 bg-[#1a161092] flex items-center justify-center'>
                <FontAwesomeIcon icon={faCube} className='text-3xl text-[#ffc247]'/>
            </div>
        </div>

        <div className='w-full flex items-center justify-start gap-1 text-xs font-semibold tracking-tight'>
            <h1 className='text-green-400'><FontAwesomeIcon icon={faArrowTrendUp} className='' /> 15.2%</h1>
            <h1 className='text-zinc-400'>vs last 30 days</h1>
        </div>

    </div>
    <div className='dataBox w-full h-auto py-3 px-3 flex flex-col bg-zinc-900 border border-zinc-700 rounded-md gap-1.5'>

        <div className='flex items-center w-full justify-between'>
            <div className='flex flex-col items-start justify-center gap-2'>
                <h5 className='text-xs text-zinc-300 font-semibold tracking-tight'>Average Rating</h5>
                <h1 className='text-3xl text-white font-semibold tracking-tight'>4.1</h1>
            </div>

            <div className='w-14 h-14 rounded-full border-[#4c3301] border-2 bg-[#1a161092] flex items-center justify-center'>
                <FontAwesomeIcon icon={faStar} className='text-3xl text-[#ffc247]'/>
            </div>
        </div>

        <div className='w-full flex items-center justify-start gap-1 text-xs font-semibold tracking-tight'>
            <div className='flex items-center justify-center w-20 h-4 overflow-hidden'>
            <img src={FourStarYellow} className='object-cover' alt="" />
            </div>
            <h1 className='text-zinc-400'>(128)</h1>
        </div>

    </div>
    <div className='dataBox w-full h-auto py-3 px-3 hidden lg:flex flex-col bg-zinc-900 border border-zinc-700 rounded-md gap-1.5'>

        <div className='flex items-center w-full justify-between'>
            <div className='flex flex-col items-start justify-center gap-2'>
                <h5 className='text-xs text-zinc-300 font-semibold tracking-tight'>Total Revenue</h5>
                <h1 className='text-3xl text-[#ffc247] font-semibold tracking-tight'>$4,800</h1>
            </div>

            <div className='w-14 h-14 rounded-full border-[#4c3301] border-2 bg-[#1a161092] flex items-center justify-center'>
                <FontAwesomeIcon icon={faIndianRupeeSign} className='text-3xl text-[#ffc247]'/>
            </div>
        </div>

        <div className='w-full flex items-center justify-start gap-1 text-xs font-semibold tracking-tight'>
            <h1 className='text-green-400'><FontAwesomeIcon icon={faArrowTrendUp} className='' /> 12.5%</h1>
            <h1 className='text-zinc-400'>vs last 30 days</h1>
        </div>

    </div>
    </div>

<div className='lg:flex-row flex-col flex items-start w-full px-1 justify-center gap-3'>

    <div className='flex flex-col items-start justify-center w-full gap-3'>

        <div className='w-full px-3 py-3 flex flex-col items-center justify-center gap-2 border border-zinc-700 rounded-md bg-zinc-900'>

            <div className='w-full h-auto py-1 lg:px-7 flex items-center justify-between'>

    <h1 className='text-lg font-semibold tracking-tight text-white'>Sales Overview</h1>

    <div className='px-2 py-1 bg-zinc-900 border border-zinc-700 rounded-md text-white flex items-center justify-center gap-1'>

    {/* <FontAwesomeIcon icon={faCalendarDays} /> */}
    <h1 className='text-sm font-semibold tracking-tight lg:flex hidden'>Last 7 days</h1>
    <h1 className='text-sm font-semibold tracking-tight lg:hidden flex'>Last 7d</h1>
    <FontAwesomeIcon className='text-sm' icon={faChevronDown} />

    </div>

    </div>

    <div className='w-full'>
        <div className=' w-6/10 h-full overflow-hidden'>
            <img src="https://helpingwithmath.com/wp-content/uploads/2022/03/image-207.png" alt="" />
        </div>
    </div>

    </div>
        <div className='w-full px-3 py-3 lg:flex hidden flex-col items-center justify-center gap-2 border border-zinc-700 rounded-md bg-zinc-900'>

            <div className='w-full h-auto py-1 px-7 flex items-center justify-between'>

    <h1 className='text-lg font-semibold tracking-tight text-white'>Recent Orders</h1>

    <div className='px-2 py-1  rounded-md text-white flex items-center justify-center gap-1'>

    {/* <FontAwesomeIcon icon={faCalendarDays} /> */}
    <Link className='text-sm text-[#ffc247] hover:underline font-semibold tracking-tight'>View all orders</Link>
    {/* <FontAwesomeIcon className='text-sm' icon={faChevronDown} /> */}

    </div>

    </div>

    <div className='w-full flex items-start justify-between px-2 py-1'>

    <div className='w-full flex items-center justify-center  gap-4  flex-col rounded-md text-zinc-300 font-semibold tracking-tight text-sm py-3  px-3'>

        <div className='px-2 py-1 bg-zinc-800 rounded-md border border-zinc-700'>
        <h1>Order ID</h1>
        </div>
        <h1>#Att101</h1>
        <h1>#Att102</h1>
        <h1>#Att103</h1>
        <h1 className='2xl:flex hidden'>#Att104</h1>
        <h1 className='2xl:flex hidden'>#Att105</h1>
       
    </div>
    <div className='w-full flex items-start justify-center gap-4  flex-col rounded-md text-zinc-300 font-semibold tracking-tight text-sm py-3  px-3'>

        <div className='px-2 py-1 bg-zinc-800 rounded-md border border-zinc-700'>
        <h1>Customer</h1>
        </div>
        <h1>Rakesh Kumar</h1>
        <h1>Abrar Majeed</h1>
        <h1>Irfan Manzoor</h1>
        <h1 className='2xl:flex hidden'>Rahul Yadav</h1>
        <h1 className='2xl:flex hidden'>Amir Yaqoob</h1>
       
    </div>
    <div className='w-full flex items-start justify-center gap-4  flex-col rounded-md text-zinc-300 font-semibold tracking-tight text-sm py-3  px-3'>

        <div className='px-2 py-1 bg-zinc-800 rounded-md border border-zinc-700'>
        <h1>Product</h1>
        </div>
        <h1>Premium Cotton Kurta</h1>
        <h1>Linen Shirt</h1>
        <h1>Casual T-Shirt</h1>
        <h1 className='2xl:flex hidden'>Formal Trousers</h1>
        <h1 className='2xl:flex hidden'>Premium Casio Watch</h1>
       
    </div>
    <div className='w-full flex items-center justify-center gap-4  flex-col rounded-md text-zinc-300 font-semibold tracking-tight text-sm py-3  px-3'>

        <div className='px-2 py-1 bg-zinc-800 rounded-md border border-zinc-700'>
        <h1>Amount</h1>
        </div>
        <h1>$29.99</h1>
        <h1>$10.00</h1>
        <h1>$9.72</h1>
        <h1 className='2xl:flex hidden'>$16.55</h1>
        <h1 className='2xl:flex hidden'>$21.99</h1>
       
    </div>
    <div className='w-full flex items-start justify-center gap-4  flex-col rounded-md text-zinc-300 font-semibold tracking-tight text-sm py-3  px-3'>

        <div className='px-2 py-1 bg-zinc-800 rounded-md border border-zinc-700'>
        <h1>Status</h1>
        </div>
        <h1>Processing</h1>
        <h1>Shipped</h1>
        <h1>Out for delivery</h1>
        <h1 className='2xl:flex hidden'>Delivered</h1>
        <h1 className='2xl:flex hidden'>Confirmed</h1>
       
    </div>
    <div className='w-full flex items-start justify-center gap-4  flex-col rounded-md text-zinc-300 font-semibold tracking-tight text-sm py-3  px-3'>

        <div className='px-2 py-1 bg-zinc-800 rounded-md border border-zinc-700'>
        <h1>Date</h1>
        </div>
        <h1>21 Aug 2026</h1>
        <h1>21 Aug 2026</h1>
        <h1>20 Aug 2026</h1>
        <h1 className='2xl:flex hidden'>19 Aug 2026</h1>
        <h1 className='2xl:flex hidden'>19 Aug 2026</h1>
       
    </div>
    </div>
    

    

    </div>

    

    </div>

    <div className='lg:w-6/10 w-full flex items-center justify-center gap-3 flex-col'>

    <div className='w-full px-1 py-3 flex flex-col items-center justify-center gap-2 border border-zinc-700 rounded-md bg-zinc-900'>

            <div className='w-full h-auto py-1 px-4 flex items-center justify-between'>

    <h1 className='text-lg font-semibold tracking-tight text-white'>Top Selling Products</h1>

    <div className='px-2 py-1  rounded-md text-white flex items-center justify-center gap-1'>

    {/* <FontAwesomeIcon icon={faCalendarDays} /> */}
    <Link className='text-sm text-[#ffc247] hover:underline font-semibold tracking-tight'>View all</Link>
    {/* <FontAwesomeIcon className='text-sm' icon={faChevronDown} /> */}

    </div>
    </div>
    
    <div className='w-full flex flex-col items-center justify-center gap-2'>
        <div className='w-full py-1 px-7 flex items-center justify-between'>
            <div className='flex items-start justify-center gap-4'>
            <div className='w-17 h-14 flex items-center justify-center rounded-md overflow-hidden'>
                <img className='object-cover' src="https://m.media-amazon.com/images/I/81UTk-K06GL._AC_UY1100_.jpg" alt="" />
            </div>
            <div className='flex flex-col font-semibold text-white tracking-tight items-start justify-center gap-1'>
                <h1 className='text-lg'>Premium T-Shirt</h1>
                <h5 className='text-sm text-zinc-300'>$33.99</h5>
            </div>
            </div>
            
            <div className=' flex items-center font-semibold text-white tracking-tight justify-center flex-col gap-1'>
                <h1 className='text-xl'>24</h1>
                <h5 className='text-xs text-zinc-300'>sold</h5>
            </div>

        </div>
        <div className='w-full py-1 px-7 flex items-center justify-between'>
            <div className='flex items-start justify-center gap-4'>
            <div className='w-17 h-14 flex items-center justify-center rounded-md overflow-hidden'>
                <img className='object-cover' src="https://m.media-amazon.com/images/I/81UTk-K06GL._AC_UY1100_.jpg" alt="" />
            </div>
            <div className='flex flex-col font-semibold text-white tracking-tight items-start justify-center gap-1'>
                <h1 className='text-lg'>Linen Shirt</h1>
                <h5 className='text-sm text-zinc-300'>$15.99</h5>
            </div>
            </div>
            
            <div className=' flex items-center font-semibold text-white tracking-tight justify-center flex-col gap-1'>
                <h1 className='text-xl'>17</h1>
                <h5 className='text-xs text-zinc-300'>sold</h5>
            </div>

        </div>
        <div className='w-full py-1 px-7 flex items-center justify-between'>
            <div className='flex items-start justify-center gap-4'>
            <div className='w-17 h-14 flex items-center justify-center rounded-md overflow-hidden'>
                <img className='object-cover' src="https://m.media-amazon.com/images/I/81UTk-K06GL._AC_UY1100_.jpg" alt="" />
            </div>
            <div className='flex flex-col font-semibold text-white tracking-tight items-start justify-center gap-1'>
                <h1 className='text-lg'>Casual Solid T-Shirt</h1>
                <h5 className='text-sm text-zinc-300'>$19.30</h5>
            </div>
            </div>
            
            <div className=' flex items-center font-semibold text-white tracking-tight justify-center flex-col gap-1'>
                <h1 className='text-xl'>12</h1>
                <h5 className='text-xs text-zinc-300'>sold</h5>
            </div>

        </div>
        <div className='w-full py-1 px-7 flex items-center justify-between'>
            <div className='flex items-start justify-center gap-4'>
            <div className='w-17 h-14 flex items-center justify-center rounded-md overflow-hidden'>
                <img className='object-cover' src="https://m.media-amazon.com/images/I/81UTk-K06GL._AC_UY1100_.jpg" alt="" />
            </div>
            <div className='flex flex-col font-semibold text-white tracking-tight items-start justify-center gap-1'>
                <h1 className='text-lg'>Formal Trousers</h1>
                <h5 className='text-sm text-zinc-300'>$45.26</h5>
            </div>
            </div>
            
            <div className=' flex items-center font-semibold text-white tracking-tight justify-center flex-col gap-1'>
                <h1 className='text-xl'>10</h1>
                <h5 className='text-xs text-zinc-300'>sold</h5>
            </div>

        </div>
    </div>
    </div>
    <div className='w-full px-4 py-3 flex flex-col items-center justify-center gap-2 border border-zinc-700 rounded-md bg-zinc-900'>

            <div className='w-full h-auto py-1 flex items-center justify-between'>

    <h1 className='text-lg font-semibold tracking-tight text-white'>Earnings Summary</h1>

    <div className=' py-1  rounded-md text-white flex items-center justify-center gap-1'>

    {/* <FontAwesomeIcon icon={faCalendarDays} /> */}
    <Link className='text-sm text-[#ffc247] hover:underline font-semibold tracking-tight'>View all</Link>
    {/* <FontAwesomeIcon className='text-sm' icon={faChevronDown} /> */}

    </div>
    </div>
    
    <div className='w-full flex flex-col items-center justify-center gap-2'>
        <div className='w-full py-1 px-1 text-white font-semibold tracking-tight flex items-center justify-between'>
           
           <h1>Gross Sales</h1>
           <h1>$363</h1>

        </div>
        <div className='w-full py-1 px-1 text-white font-semibold tracking-tight flex items-center justify-between'>
           
           <h1>Attire Commission (₹30/order)</h1>
           <h1 className='text-red-500'>-$13.00</h1>

        </div>

        <div className='w-full h-[0.02rem] bg-zinc-700'></div>

        <div className='w-full py-1 px-1 text-white font-semibold tracking-tight flex items-center justify-between'>
           
           <h1 className='text-xl'>Your Earnings</h1>
           <h1 className='text-green-500 text-xl'>+$350.00</h1>

        </div>

        <Link className='w-full flex items-center justify-center bg-[#ffc247] rounded-md py-1.5 mt-3 mb-3 text-lg font-semibold tracking-tight'><FontAwesomeIcon icon={faWallet}/>  View Payouts</Link>

    </div>
    </div>
    
    </div>
    
    

    </div>
    </main>
    
    </>
  )
}

export default SellerDashboardMain