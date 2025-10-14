

import { useEffect, useState } from 'react'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Cart from './components/Cart'
import { AnimatePresence , motion } from 'framer-motion'
import Toast from './components/Toast'
import Shop from './pages/Shop'
import CategoryPage from './pages/CategoryPage'
import ProductPage from './pages/ProductPage'
import ScrollToTop from './components/ScrollToTop'
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,   
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth,provider } from './FireBaseLogin/firebase'
import Profile from './pages/Profile'
function App() {
  const[user , setUser] = useState(null)
  const [cartItems , setCartItem] = useState([])

  const [toasts , setToasts] = useState([])

  const addToast = (product,message="Item Added")=>{
    const id = Date.now()
    setToasts(prev => [...prev , {id,message:message}])
    let updProd = product
  if(!product.hasOwnProperty("quantity")) {
     updProd = {...product , quantity:1} 
  }
    if(cartItems.some(item => item.id === product.id)) {
    setCartItem(prev => 
      prev.map((p)=>{
        if(p.id === updProd.id) {
          return {...p , quantity:p.quantity + updProd.quantity}
        }else{
          return p
        }
      }))

    

    } else{
    setCartItem(prev => [...prev , updProd])
    }
    setTimeout(()=>{
      setToasts(prev => prev.filter(t => t.id !==id))
    },1500)
  }

    // FIREBASE LOGIN: Hybrid approach
    const handleLogin = async () => {
      try {
          // Desktop → popup
          const result = await signInWithPopup(auth, provider);
          setUser(result.user);
        
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleLogOut = async () => {
      await signOut(auth);
      setUser(null);
    };
  
    // Check result after redirect (mobile)
    useEffect(() => {
      getRedirectResult(auth)
        .then((result) => {
          if (result) {
            setUser(result.user);
          }
        })
        .catch((error) => console.error(error));
    }, []);
  
    // Auth state listener
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
      return () => unsubscribe();
    }, []);
  
const addCheckToast = () =>{
  const id = Date.now()

  setToasts(prev => [...prev , {id,message:"CheckOut Successfull !!"}])
  setTimeout(()=>{
    setToasts(prev => prev.filter(t => t.id !==id))
  },1500)
}
// LocalStorage
  useEffect(() => {
    if (user) {
      try {
        const stored = localStorage.getItem(`cart_${user.uid}`);
        if (stored) {
          setCartItem(JSON.parse(stored));
        } else {
          setCartItem([]); // new user, empty cart
        }
      } catch (e) {
        console.error("Error loading cart:", e);
      }
    } else {
      setCartItem([]); // clear when user logs out
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.uid}`, JSON.stringify(cartItems));
    }
  }, [user, cartItems]);

  return (
    <div className="bg-gray-50 min-h-screen">

      <Router>
      <Navbar user={user} handleLogin={handleLogin} handleLogout={handleLogOut} />
      <ScrollToTop  />
      <Routes>
        <Route path='/' element={<Home  addToast={addToast} />} />
        <Route path='/cart' element={<Cart CartItems={cartItems}  setCartItems={setCartItem} addToast={addCheckToast}/>}  />
        <Route path='/products' element={<Shop addToast={addToast} />} />
        <Route path='/category/:name' element={<CategoryPage addToast={addToast} />} />
        <Route path='/products/:name/:id' element={<ProductPage addToast={addToast} />} />
        <Route path='/user/:uid' element={<Profile handleLogOut={handleLogOut} user={user} />} />





      </Routes>
    </Router>
    <div className="fixed top-14 right-4 flex flex-col gap-2 z-50">
        <AnimatePresence>
          {toasts.map((t) => (
           <Toast t={t} key={t.id} />
          ))}
        </AnimatePresence>
    </div>
  </div>
  )
}

export default App