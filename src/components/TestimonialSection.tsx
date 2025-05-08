
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export function TestimonialSection() {
  const testimonials: Testimonial[] = [
    {
      name: "Ahmed Hassan",
      role: "Islamic Studies Student",
      quote: "FikrSwap Academy has transformed my learning experience. The live classes and community support made complex topics accessible and engaging.",
      rating: 5
    },
    {
      name: "Fatima Ali",
      role: "Arabic Calligraphy Enthusiast",
      quote: "Learning Arabic calligraphy here has been a joy. The instructors are patient, knowledgeable, and provide personalized feedback that has helped me improve rapidly.",
      rating: 5
    },
    {
      name: "Mohammad Khan",
      role: "Quranic Sciences Learner",
      quote: "The depth of knowledge and teaching methods at FikrSwap Academy are unparalleled. I've gained insights I couldn't find anywhere else.",
      rating: 4
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    nextTestimonial();
  };

  const handlePrev = () => {
    setDirection(-1);
    prevTestimonial();
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
            What Our <span className="text-gradient">Students</span> Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="section-subtitle"
          >
            Hear from our community of learners about their experiences
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="relative h-64 sm:h-48 overflow-hidden">
            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute w-full"
              >
                <div className="bg-card p-8 rounded-2xl shadow-lg border border-border">
                  <div className="flex items-center gap-1 text-brand-yellow mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className={`w-5 h-5 ${i < testimonials[currentIndex].rating ? "text-brand-yellow" : "text-gray-300"}`}
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-lg italic mb-6">"{testimonials[currentIndex].quote}"</blockquote>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-brand-yellow/20 flex items-center justify-center text-brand-yellow">
                      {testimonials[currentIndex].name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <p className="font-bold">{testimonials[currentIndex].name}</p>
                      <p className="text-sm text-muted-foreground">{testimonials[currentIndex].role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? "bg-brand-yellow" : "bg-gray-300 dark:bg-gray-600"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <motion.div
        className="absolute bottom-20 -right-24 w-48 h-48 rounded-full bg-brand-yellow/10 blur-3xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
      />
    </section>
  );
}
