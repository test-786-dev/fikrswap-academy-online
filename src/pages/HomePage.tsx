
import { motion } from "framer-motion";
import { Hero } from "@/components/Hero";
import { FeatureSection } from "@/components/FeatureSection";
import { CourseCategorySection } from "@/components/CourseCategorySection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { CTASection } from "@/components/CTASection";

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overflow-hidden"
    >
      <Hero />
      <FeatureSection />
      <CourseCategorySection />
      <TestimonialSection />
      <CTASection />
    </motion.div>
  );
};

export default HomePage;
