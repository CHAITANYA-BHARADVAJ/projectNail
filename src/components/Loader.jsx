import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import logo from '../assets/logo.png'

function Loader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 10 + 2
      })
    }, 120)
    return () => clearInterval(interval)
  }, [])

  const dashArray = 2 * Math.PI * 66; // circumference for r=66
  const dashOffset = dashArray - (dashArray * Math.min(progress, 100)) / 100;

  return (
    <motion.div
      className="loader-premium"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
    >
      <div className="loader-premium-ring-container">
        {/* The Logo */}
        <motion.img 
          src={logo} 
          alt="NailsByReema" 
          className="loader-premium-logo"
          animate={{ scale: [0.95, 1.03, 0.95] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* The Circular SVG Progress Ring */}
        <svg className="loader-premium-svg" width="140" height="140" viewBox="0 0 140 140">
          <circle 
            className="loader-ring-bg" 
            cx="70" cy="70" r="66" 
            strokeWidth="2.5" 
            fill="none" 
          />
          <motion.circle 
            className="loader-ring-progress" 
            cx="70" cy="70" r="66" 
            strokeWidth="2.5" 
            fill="none"
            strokeDasharray={dashArray}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 0.2, ease: 'linear' }}
          />
        </svg>
      </div>

      <motion.div 
        className="loader-premium-text"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Nails<span>ByReema</span>
      </motion.div>
    </motion.div>
  )
}

export default Loader
