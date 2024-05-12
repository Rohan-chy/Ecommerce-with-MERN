import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './global/Navbar'
import { Provider } from 'react-redux'
import store from './store/store'
import Home from './pages/Home'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Cart from './pages/Cart'
import RegistrationForm from './pages/RegistrationForm'
import LoginForm from './pages/LoginForm'
import ProductDetails from './pages/productDetails/ProductDetails'
import CheckOut from './pages/CheckOut'
import KhaltiSuccess from './pages/KhaltiSuccess'
import StudentDetails from './pages/StudentDetails'
import Profile from './pages/profile/Profile'
import MyOrders from './pages/myOrders/MyOrders'
import OrderDetails from './pages/orderDetails/OrderDetails'

function App() {

  return (
   <Provider store={store}>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/register' element={<RegistrationForm/>}/>
          <Route path='/login' element={<LoginForm/>}/>
          <Route path='/productdetails/:id' element={<ProductDetails/>}/>
          <Route path='/checkout' element={<CheckOut/>}/>
          <Route path='/payment/success' element={<KhaltiSuccess/>}/>
          <Route path='/studentdetails' element={<StudentDetails/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/myorders' element={<MyOrders/>}/>
          <Route path='/myorders/:id' element={<OrderDetails/>}/>
        </Routes>
      
      </BrowserRouter>
   </Provider>
  )
}

export default App
