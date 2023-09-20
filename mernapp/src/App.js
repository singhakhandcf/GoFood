import './App.css';
import { Routes,Route } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-unlit.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min';

import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer';
import Cart from './screens/Cart';
import MyOrders from './screens/MyOrders';
function App() {
  return (
    <>
    <CartProvider>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route  path='/Login' element={<Login/>}/>
      <Route  path='/Signup' element={<Signup/>}/>
      <Route  path='/Cart' element={<Cart/>}/>
      <Route  path='/myorder' element={<MyOrders/>}/>

    </Routes>
    </CartProvider>
    </>
  );
}

export default App;
