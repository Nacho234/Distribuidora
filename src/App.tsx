import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Brands from './components/sections/Brands'
import Products from './components/sections/Products'
import About from './components/sections/About'
import Contact from './components/sections/Contact'
import Features from './components/sections/Features'
import CartDrawer from './components/ui/CartDrawer'
import { CartProvider } from './context/CartContext'
import ProductsPage from './pages/ProductsPage'

function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-obsidian"
    >
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Brands />
        <Products />
        <About />
        <Contact />
      </main>
      <Footer />
    </motion.div>
  )
}

export default function App() {
  return (
    <CartProvider>
      <CartDrawer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productos" element={<ProductsPage />} />
      </Routes>
    </CartProvider>
  )
}
