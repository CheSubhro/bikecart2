import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/pages/Reusable/Header/Header'
import Footer from './components/pages/Reusable/Footer/Footer'
import Home from './components/pages/Home/Home'
import CardItem from './components/pages/Reusable/CardItem/CardItem'
import Cart from './components/pages/Cart/Cart';
import Admin from './components/pages/AdminPanel/Admin'
import Category from './components/pages/AdminPanel/Category'
import Product from './components/pages/AdminPanel/Product'
import Contact from './components/pages/Contact/Contact'
import About from './components/pages/About/About'
import Login from './components/pages/Login/Login'
import SignUp from './components/pages/SignUp/SignUp'
import Profile from './components/pages/Profile/Profile'
import ProductsByCategory from './components/pages/ProductsByCategory/ProductsByCategory'
import Checkout from './components/pages/Checkout/Checkout'
import ThankYou from './components/pages/Reusable/ThankYou/ThankYou'
// import Wishlist from './components/pages/Wishlist/Wishlist'


function App() {
	return (	
		<>
			<Router>
				<Header/>
				<Routes>
					<Route exact path="/" element={< Home />} />
					<Route exact path="/carditem/:id" element={< CardItem />} />
					<Route exact path="/cart" element={< Cart />} /> 
					<Route path="/admin" element={<Admin />} />
					<Route path="/admin/category"element={<Category/>}/>
					<Route path="/admin/product"element={<Product/>}/>
					<Route path="/contact" element={<Contact/>}/>
					<Route path="/about" element={<About/>}/>
					<Route path="/login" element={<Login/>}/>
					<Route path="/signup" element={<SignUp/>}/>
					<Route path="/profile" element={<Profile/>}/>
					<Route path="/category/:id" element={<ProductsByCategory />}/>
					<Route path="/checkout" element={<Checkout/>}/>
					{/* <Route path="/wishlist" element={<Wishlist/>}/> */}
					<Route path="/thankyou" element={<ThankYou/>}/>

				</Routes>
				<Footer />
			</Router>
		</>
	);
}

export default App;
