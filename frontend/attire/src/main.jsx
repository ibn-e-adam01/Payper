import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './routes/Home.jsx'
import SignUp from './routes/SignUp.jsx'
import Login from './routes/Login.jsx'
import Profile from './routes/Profile.jsx'

import  {ThemeProvider}  from './components/ThemeContext.jsx';
import BecomeASeller from './routes/BecomeASeller.jsx'
import SellerDashboard from './routes/SellerDashboard.jsx'
import PurchasePortal from './routes/purchasePortal.jsx'

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home />}/>
    <Route path='/createAccount' element={<SignUp />}/>
    <Route path='/signin' element={<Login />}/>
    <Route path='/profile' element={<Profile />}/>
    <Route path='/product-purchase' element={<PurchasePortal />}/>
    <Route path='/become-a-seller' element={<BecomeASeller />}/>
    <Route path='/seller-dashboard' element={<SellerDashboard />}/>
    </Routes>
  </BrowserRouter>
  </ThemeProvider>
)
