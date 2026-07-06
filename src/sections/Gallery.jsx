import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import nailArt1 from '../assets/nail_art_1.png';
import nailArt2 from '../assets/nail_art_2.png';
import nailArt3 from '../assets/nail_art_3.png';
import nailArt4 from '../assets/nail_art_4.png';
import nailArt5 from '../assets/nail_art_5.png';
import nailArt6 from '../assets/nail_art_6.png';

const galleryItems = [
  { img: nailArt1, title: 'Floral Dreams', category: 'Floral Art' },
  { img: nailArt2, title: 'Lavender Bliss', category: 'Ombre Design' },
  { img: nailArt3, title: 'Rose Gold Tips', category: 'French Tip' },
  { img: nailArt4, title: 'Pastel Minimal', category: 'Minimalist' },
  { img: nailArt5, title: 'Blush Glam', category: 'Glitter Art' },
  { img: nailArt6, title: 'Marble Elegance', category: 'Marble Art' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function Gallery() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="gallery" ref={sectionRef}>
      <motion.div
        className="container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.div className="section-header" variants={itemVariants}>
          <span className="section-label">Portfolio</span>
          <h2 className="section-title">
            Recent <em>Work</em>
          </h2>
          <p className="section-description">
            Some of my favorite sets from the studio. For daily updates and more inspiration, follow my Instagram @nailsbyreema_.
          </p>
        </motion.div>

        <motion.div className="gallery-grid" variants={containerVariants}>
          {galleryItems.map((item, i) => (
            <motion.div
              className={`gallery-item${i === 0 ? ' gallery-item--featured' : ''}`}
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={item.img}
                alt={item.title}
                loading="lazy"
                draggable="false"
              />
              <div className="gallery-overlay">
                <span className="gallery-category">{item.category}</span>
                <h3 className="gallery-title">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
