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
        </Routes>
      
      </BrowserRouter>
   </Provider>
  )
}

export default App
