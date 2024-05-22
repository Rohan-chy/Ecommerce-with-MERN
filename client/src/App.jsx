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
import Profile from './pages/profile/Profile'
import MyOrders from './pages/myOrders/MyOrders'
import OrderDetails from './pages/orderDetails/OrderDetails'
import ForgetPassword from './pages/auth/ForgetPassword'
import VerifyOtp from './pages/auth/VerifyOtp'
import ResetPassword from './pages/auth/ResetPassword'

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
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/myorders' element={<MyOrders/>}/>
          <Route path='/myorders/:id' element={<OrderDetails/>}/>
          <Route path='/forgetpassword' element={<ForgetPassword/>}/>
          <Route path='/verifyotp' element={<VerifyOtp/>}/>
          <Route path='/resetpassword' element={<ResetPassword/>}/>
        </Routes>
      
      </BrowserRouter>
   </Provider>
  )
}

export default App
