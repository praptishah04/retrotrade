import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { UserSidebar } from './components/layouts/UserSidebar'
// import './App.css'
// import './assets/adminlte.css'
//  import './assets/adminlte.min.css'
import { Route, Routes } from 'react-router-dom'
import { UserProfile } from './components/user/UserProfile'
import {Login} from './components/common/Login'
import {Signup} from './components/common/Signup'
import { Demo } from './components/common/Demo'
import axios from 'axios'
import { Admin } from './components/user/Admin'
import { BuyerSignup } from './components/common/BuyerSignup'
import { BuyerProfile } from './components/user/BuyerProfile'
import { SellerSignup } from './components/common/SellerSignup'
import { AdminSignup } from './components/common/AdminSignup'
import { AdminProfile } from './components/user/AdminProfile'
import { SellerSidebar } from './components/layouts/SellerSidebar'
import { AddProduct } from './components/seller/AddProduct'
import LandingPage from './components/common/LandingPage'
import { ViewProducts } from './components/seller/ViewProducts'
import  ExploreItems  from './components/common/ExploreItems'
import AboutUs from './components/common/AboutUs'
import { BuyerLogin } from './components/common/BuyerLogin'
import { SellerLogin } from './components/common/SellerLogin'
import { ResetPassword } from './components/common/ResetPassword'
import Cart from './components/common/Cart'
import Invoice from './components/common/Invoice'
import Wishlist from './components/common/Wishlist'
import SellerDashboard from './components/seller/SellerDashboard'
import { AddCategory } from './components/seller/AddCategory'
import Auction from './components/seller/Auction'
import ForgotPassword from './components/common/ForgotPassword'



function App() {

   axios.defaults.baseURL="http://localhost:4000"

  return (

    <div class="layout-fixed sidebar-expand-lg bg-body-tertiary app-loaded sidebar-open">
      <div class="app-wrapper">
        <Routes>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/' element={<LandingPage/>}></Route>
          <Route path='/aboutus' element={<AboutUs/>}></Route>
          <Route path='/exploreitems' element={<ExploreItems/>}></Route>
          <Route path='/wishlist' element={<Wishlist/>}></Route>
          <Route path='/cart' element={<Cart/>}></Route>
          <Route path='/invoice' element={<Invoice/>}></Route>
          <Route path='/buyerlogin' element={<BuyerLogin/>}></Route>
          <Route path='/sellerlogin' element={<SellerLogin/>}></Route>
          <Route path='/demo' element={<Demo/>}></Route>
          <Route path ="/resetpassword/:token" element={<ResetPassword/>}></Route>
          <Route path='/forgotpassword' element={<ForgotPassword/>}></Route>
          <Route path='/buyersignup' element={<BuyerSignup/>}></Route>
          <Route path='/sellersignup' element={<SellerSignup/>}></Route>
          <Route path='/adminsignup' element={<AdminSignup/>}></Route>


          <Route path='/user' element={<UserSidebar/>}>
            <Route path='profile' element={<UserProfile/>}></Route>
          </Route>

          
          <Route path='/sellerdashboard' element={<SellerDashboard/>}>
              {/* <Route path='sellerdashboard' element={<SellerDashboard/>}></Route> */}
              <Route path='auction' element={<Auction/>}></Route>
              <Route path='addproduct' element={<AddProduct/>}></Route>
              <Route path='addcategory' element={<AddCategory/>}></Route>
              <Route path='viewproduct/:id' element={<ViewProducts/>}></Route>
          </Route>
          {/* <Route path='/buyerprofile' element={<BuyerProfile/>}></Route>
          <Route path='/sellerprofile' element={<SellerProfile/>}></Route>
          <Route path='/adminprofile' element={<AdminProfile/>}></Route> */}
        </Routes>
      </div>
    </div>
  
  )
}

export default App
