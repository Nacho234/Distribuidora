import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Brands from './components/sections/Brands'
import Products from './components/sections/Products'
import About from './components/sections/About'
import Contact from './components/sections/Contact'
import Features from './components/sections/Features'
import CustomCursor from './components/ui/CustomCursor'
import ScrollProgress from './components/ui/ScrollProgress'
import PageLoader from './components/ui/PageLoader'
import SpotlightCursor from './components/ui/SpotlightCursor'
import FloatingCTA from './components/ui/FloatingCTA'
import CartDrawer from './components/ui/CartDrawer'
import { CartProvider } from './context/CartContext'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <CartProvider>
      <PageLoader onComplete={() => setLoaded(true)} />

      <AnimatePresence>
        {loaded && (
          <motion.div
            key="site"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen bg-obsidian"
          >
            <CustomCursor />
            <SpotlightCursor />
            <ScrollProgress />
            <FloatingCTA />
            <CartDrawer />
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
        )}
      </AnimatePresence>
    </CartProvider>
  )
}
