import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  MapPin,
  Phone,
  Clock,
  Heart,
  MessageCircle,
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="contact" ref={sectionRef}>
      <motion.div
        className="container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.div className="section-header" variants={itemVariants}>
          <span className="section-label">Contact</span>
          <h2 className="section-title">
            Book an <em>Appointment</em>
          </h2>
          <p className="section-description">
            My calendar usually fills up a week in advance, so please plan ahead! The quickest way to get in touch or book a slot is by sending me a message on WhatsApp.
          </p>
        </motion.div>

        <div className="contact-grid-centered">
          <motion.div
            className="contact-info-grid"
            variants={containerVariants}
          >
            {/* WhatsApp Big Button */}
            <motion.a
              href="https://wa.me/918050305541"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-big-btn"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle size={24} />
              Book on WhatsApp
            </motion.a>

            {/* Contact Cards */}
            <motion.div className="contact-card" variants={itemVariants}>
              <div className="contact-card-icon">
                <MapPin size={20} />
              </div>
              <div className="contact-card-text">
                <h4>Visit Me</h4>
                <p>Hospet, Karnataka, India</p>
              </div>
            </motion.div>

            <motion.div className="contact-card" variants={itemVariants}>
              <div className="contact-card-icon">
                <Phone size={20} />
              </div>
              <div className="contact-card-text">
                <h4>Call Me</h4>
                <a href="tel:+918050305541">+91 8050305541</a>
              </div>
            </motion.div>

            <motion.div className="contact-card" variants={itemVariants}>
              <div className="contact-card-icon">
                <Clock size={20} />
              </div>
              <div className="contact-card-text">
                <h4>Working Hours</h4>
                <p>Mon – Sat: 10:00 AM – 7:00 PM</p>
                <p className="muted">Sunday: By Appointment</p>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div className="social-links-centered" variants={itemVariants}>
              <a
                href="https://instagram.com/nailsbyreema_"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Instagram"
              >
                <Heart size={18} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
