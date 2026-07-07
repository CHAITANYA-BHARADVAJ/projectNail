import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../assets/logo.png'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const closeMobile = () => setMobileOpen(false)

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Portfolio', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <a href="#home" className="nav-logo">
          <img src={logo} alt="NailsByReema Logo" className="nav-logo-img" />
          <div className="logo-brand-container">
            <span className="logo-brand-title">Nails</span>
            <span className="logo-brand-subtitle">By Reema</span>
          </div>
        </a>

        <div className="nav-links">
          {navLinks.map(link => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="nav-cta">

          <button
            className={`mobile-toggle${mobileOpen ? ' active' : ''}`}
            onClick={() => setMobileOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={closeMobile}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  delay: 0.08 * i,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="https://wa.me/918050305541"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              onClick={closeMobile}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                delay: 0.08 * navLinks.length,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Book Now
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
