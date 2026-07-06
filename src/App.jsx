import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Gallery from './sections/Gallery'
import Contact from './sections/Contact'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Gallery />
            <Contact />
          </main>
          <footer className="footer">
            <div className="footer-left">
              <p>© 2026 NailsByReema. All rights reserved.</p>
              <p>Handcrafted nail art with love ♡</p>
            </div>
            <div className="footer-right">
              <a href="https://instagram.com/nailsbyreema_" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://wa.me/918050305541" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <a href="#contact">Contact</a>
            </div>
          </footer>
        </>
      )}
    </>
  )
}

export default App
