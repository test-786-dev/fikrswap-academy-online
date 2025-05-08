
import { motion } from "framer-motion";

interface Feature {
  title: string;
  description: string;
  icon: string;
}

export function FeatureSection() {
  const features: Feature[] = [
    {
      title: "Skill Exchange",
      description: "Connect with others to share knowledge and learn new skills from experts in their fields.",
      icon: "🔄"
    },
    {
      title: "Live Classes",
      description: "Participate in interactive live sessions with real-time feedback and community engagement.",
      icon: "🎬"
    },
    {
      title: "Community Learning",
      description: "Join a supportive community dedicated to growth, knowledge sharing, and collaborative learning.",
      icon: "👥"
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="section-title"
          >
            Our <span className="text-gradient">Features</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="section-subtitle"
          >
            Discover how FikrSwap Academy transforms traditional learning into an engaging, community-driven experience
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="card p-8 flex flex-col items-center text-center group hover:border-brand-yellow"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="text-5xl mb-6 transition-transform"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold mb-4 font-playfair group-hover:text-brand-yellow transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Decorative Elements */}
      <motion.div
        className="absolute top-40 -left-24 w-48 h-48 rounded-full bg-brand-red/10 blur-3xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
      />
    </section>
  );
}
