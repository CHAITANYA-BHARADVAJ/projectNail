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
          <footer className="footer-enhanced">
            <div className="footer-top">
              <div className="footer-brand">
                <h3>Nails By Reema</h3>
                <p>Custom gel extensions & intricate hand-painted nail art. No rush jobs—just healthy nails.</p>
              </div>
              <div className="footer-links">
                <h4>Connect</h4>
                <a href="https://instagram.com/nailsbyreema_" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://wa.me/918050305541" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                <a href="#gallery">Portfolio</a>
              </div>
            </div>
            
            <div className="footer-bottom">
              <p>© 2026 NailsByReema. All rights reserved.</p>
              <a 
                href="https://www.linkedin.com/in/h-v-chaitanya-bharadvaj-34a24332a" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="developer-credit"
              >
                Designed and developed by Bharadvaj
              </a>
            </div>
          </footer>
        </>
      )}
    </>
  )
}

export default App
