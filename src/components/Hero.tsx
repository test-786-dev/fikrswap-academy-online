
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FloralPattern } from "@/components/FloralPattern";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <FloralPattern className="opacity-30" />
      
      <div className="container-custom relative z-10 py-16">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6" 
            variants={itemVariants}
          >
            <span className="block mb-2">FikrSwap Academy</span>
            <span className="text-gradient">Learn, Share, Enlighten</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Embrace the joy of knowledge through skill exchange and live classes with our community of learners and experts.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={containerVariants}
          >
            <motion.div variants={buttonVariants}>
              <Button 
                asChild
                size="lg" 
                className="bg-brand-yellow hover:bg-yellow-500 text-brand-dark text-lg px-8 py-6"
              >
                <Link to="/signup">Join Now</Link>
              </Button>
            </motion.div>
            
            <motion.div variants={buttonVariants}>
              <Button 
                asChild
                size="lg" 
                variant="outline" 
                className="border-2 border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-brand-dark text-lg px-8 py-6"
              >
                <Link to="/courses">Explore Courses</Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute -bottom-10 -left-20 w-64 h-64 rounded-full bg-brand-yellow/20 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
      <motion.div
        className="absolute -top-10 -right-20 w-72 h-72 rounded-full bg-brand-red/20 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.8 }}
      />
    </section>
  );
}
