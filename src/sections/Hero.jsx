import { motion } from 'framer-motion';
import { Sparkles, MessageCircle } from 'lucide-react';
import NailScene from '../components/NailScene';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Hero() {
  return (
    <section id="home" className="hero">
      {/* Aurora Floating Blobs */}
      <div className="hero-bg-blobs">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <div className="hero-canvas">
        <NailScene />
      </div>

      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span className="hero-label" variants={itemVariants}>
          Based in Hospet, Karnataka
        </motion.span>

        <motion.h1 className="hero-title" variants={itemVariants}>
          Nails done
          <br />
          <em>right.</em>
        </motion.h1>

        <motion.p className="hero-description" variants={itemVariants}>
          Hi, I'm Reema. I specialize in custom gel extensions, builder gels, and intricate hand-painted nail art. No rush jobs—just healthy nails and designs that actually last.
        </motion.p>

        <motion.div className="hero-buttons" variants={itemVariants}>
          <a
            href="https://wa.me/918050305541"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            WhatsApp
            <MessageCircle size={16} />
          </a>
          <a href="#gallery" className="btn btn-secondary">
            See my work
          </a>
        </motion.div>
      </motion.div>

      {/* Infinite Scrolling Marquee */}
      <div className="hero-marquee">
        <div className="marquee-track">
          <div className="marquee-group">
            <span>CUSTOM GEL EXTENSIONS</span>
            <span>•</span>
            <span>HANDPAINTED ART</span>
            <span>•</span>
            <span>3D CHROME NAILS</span>
            <span>•</span>
            <span>BUILDER GEL</span>
            <span>•</span>
            <span>HOSPET, KARNATAKA</span>
          </div>
          <div className="marquee-group">
            <span>CUSTOM GEL EXTENSIONS</span>
            <span>•</span>
            <span>HANDPAINTED ART</span>
            <span>•</span>
            <span>3D CHROME NAILS</span>
            <span>•</span>
            <span>BUILDER GEL</span>
            <span>•</span>
            <span>HOSPET, KARNATAKA</span>
          </div>
        </div>
      </div>
    </section>
  );
}
