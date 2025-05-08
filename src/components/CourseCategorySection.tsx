
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface Category {
  title: string;
  description: string;
  imageUrl: string;
  slug: string;
}

export function CourseCategorySection() {
  const categories: Category[] = [
    {
      title: "Islamic Studies",
      description: "Explore the rich traditions and teachings of Islam with expert guidance.",
      imageUrl: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&q=80&w=500",
      slug: "islamic-studies"
    },
    {
      title: "Arabic Calligraphy",
      description: "Learn the art of beautiful Arabic handwriting from master calligraphers.",
      imageUrl: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&q=80&w=500",
      slug: "arabic-calligraphy"
    },
    {
      title: "Quranic Sciences",
      description: "Deepen your understanding of the Quran through detailed study and reflection.",
      imageUrl: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&q=80&w=500",
      slug: "quranic-sciences"
    },
    {
      title: "Islamic Arts & Culture",
      description: "Discover the beauty and significance of Islamic art, architecture, and cultural traditions.",
      imageUrl: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&q=80&w=500",
      slug: "islamic-arts-culture"
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-20 bg-muted/50 relative overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="section-title"
          >
            Explore Course <span className="text-gradient">Categories</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="section-subtitle"
          >
            Discover a wide range of subjects taught by expert instructors from our community
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="card overflow-hidden"
            >
              <Link to={`/courses?category=${category.slug}`} className="block">
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src={category.imageUrl} 
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 font-playfair">{category.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{category.description}</p>
                  <div className="flex items-center text-brand-yellow">
                    <span className="text-sm font-medium">Explore courses</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
