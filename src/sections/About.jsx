import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Gem, Palette, Clock, Award } from 'lucide-react';

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '500+', label: 'Sets Painted' },
  { value: '100+', label: 'Happy Clients' },
  { value: '1', label: 'Studio Space' },
];

const features = [
  {
    icon: Gem,
    title: 'Focus on Details',
    description:
      'I take my time with prep work because good prep means your set will last 3-4 weeks without lifting.',
  },
  {
    icon: Palette,
    title: 'Quality Gels',
    description:
      'I strictly use trusted, professional-grade builder gels and polishes to protect your natural nails.',
  },
  {
    icon: Clock,
    title: 'No Rushing',
    description:
      'I only take a few appointments a day. You get my full attention without feeling hurried out the door.',
  },
  {
    icon: Award,
    title: 'Artistic Freedom',
    description:
      'Bring reference photos! Whether it’s 3D chrome or hand-painted flowers, I love a good challenge.',
  },
];

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

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={sectionRef}>
      <motion.div
        className="container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.div className="section-header" variants={itemVariants}>
          <span className="section-label">About Me</span>
          <h2 className="section-title">
            Behind the <em>Table</em>
          </h2>
          <p className="section-description">
            I started doing nails because I couldn't find a place nearby that offered the kind of detailed, modern nail art I saw online. What started as a hobby in my room turned into a full-time profession. I focus on nail health first, using high-quality gels that won't ruin your natural nails, while delivering art that lasts for weeks.
          </p>
        </motion.div>

        <div className="about-grid">
          {/* Stats Column */}
          <motion.div className="about-stats" variants={containerVariants}>
            {stats.map((stat, i) => (
              <motion.div className="stat-card" key={i} variants={itemVariants}>
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Features Column */}
          <motion.div className="about-features" variants={containerVariants}>
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  className="feature-card"
                  key={i}
                  variants={itemVariants}
                >
                  <div className="feature-icon">
                    <Icon size={22} />
                  </div>
                  <div className="feature-text">
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
