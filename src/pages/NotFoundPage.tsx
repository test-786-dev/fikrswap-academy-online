
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FloralPattern } from "@/components/FloralPattern";

const NotFoundPage = () => {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <FloralPattern className="opacity-20" />
      
      <motion.div
        className="container-custom text-center relative z-10 py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-9xl font-bold text-gradient mb-6">
          404
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="text-4xl font-bold font-playfair mb-4">
          Page Not Found
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-xl text-muted-foreground mb-12 max-w-lg mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </motion.p>
        
        <motion.div variants={itemVariants}>
          <Button 
            asChild
            size="lg" 
            className="bg-brand-yellow hover:bg-yellow-500 text-brand-dark"
          >
            <Link to="/">Return to Homepage</Link>
          </Button>
        </motion.div>
      </motion.div>
      
      {/* Decorative Elements */}
      <motion.div
        className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-brand-yellow/10 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />
      <motion.div
        className="absolute top-10 right-10 w-48 h-48 rounded-full bg-brand-red/10 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
    </div>
  );
};

export default NotFoundPage;
