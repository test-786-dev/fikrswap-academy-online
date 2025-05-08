
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FloralPattern } from "@/components/FloralPattern";

export function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <FloralPattern className="opacity-20" />
      
      <div className="container-custom">
        <div className="bg-card border border-border rounded-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl relative z-10"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-playfair">
              Ready to Start Your <span className="text-gradient">Learning Journey</span>?
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Join our community of learners today and unlock access to expert-led courses, live classes, and a supportive network of fellow students.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                size="lg" 
                className="bg-brand-yellow hover:bg-yellow-500 text-brand-dark"
              >
                <Link to="/signup">Join Now</Link>
              </Button>
              
              <Button 
                asChild
                size="lg" 
                variant="outline" 
                className="border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-brand-dark"
              >
                <Link to="/courses">Browse Courses</Link>
              </Button>
            </div>
          </motion.div>
          
          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-brand-yellow/20 blur-3xl"
          />
        </div>
      </div>
    </section>
  );
}
