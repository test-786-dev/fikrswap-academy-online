
import { motion } from "framer-motion";
import { FloralPattern } from "@/components/FloralPattern";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const missionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      } 
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        delay: i * 0.2,
        ease: [0.6, 0.05, 0.01, 0.9]
      } 
    })
  };

  const teamMembers = [
    {
      name: "Aisha Rahman",
      role: "Founder & Lead Instructor",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250",
      bio: "With over 15 years of experience in Islamic education, Aisha founded FikrSwap to make traditional knowledge accessible to all."
    },
    {
      name: "Dr. Omar Farooq",
      role: "Academic Director",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250",
      bio: "Dr. Omar holds a PhD in Islamic Studies and has dedicated his career to bridging classical texts with contemporary contexts."
    },
    {
      name: "Fatima Zahra",
      role: "Curriculum Developer",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=250",
      bio: "Fatima specializes in designing engaging learning experiences that combine traditional wisdom with modern teaching methods."
    },
    {
      name: "Yusuf Ali",
      role: "Community Manager",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=250",
      bio: "Yusuf fosters connections between learners and instructors, building a vibrant community of knowledge seekers."
    }
  ];

  const values = [
    {
      title: "Authentic Knowledge",
      description: "We ensure all content is rooted in authentic sources and presented by qualified instructors."
    },
    {
      title: "Inclusive Learning",
      description: "Our platform welcomes learners of all backgrounds, creating spaces for respectful dialogue and growth."
    },
    {
      title: "Community Connection",
      description: "We believe knowledge flourishes in community, with shared experiences enhancing understanding."
    },
    {
      title: "Continuous Growth",
      description: "We encourage both students and teachers to embrace lifelong learning and development."
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Find a Skill",
      description: "Browse our diverse catalog of courses taught by expert instructors.",
      icon: "🔍"
    },
    {
      step: 2,
      title: "Schedule a Class",
      description: "Choose between live sessions or self-paced learning based on your availability.",
      icon: "📅"
    },
    {
      step: 3,
      title: "Learn Together",
      description: "Join our community of learners for an enriching educational experience.",
      icon: "👥"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center pt-20 overflow-hidden">
        <FloralPattern className="opacity-30" />
        
        <div className="container-custom relative z-10 py-16">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={missionVariants}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="block mb-2">Our Mission</span>
              <span className="text-gradient">Sharing Knowledge, Inspiring Wisdom</span>
            </h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto"
              variants={missionVariants}
            >
              Empowering learners to share knowledge inspired by the wisdom of tradition, creating bridges between classical learning and contemporary needs.
            </motion.p>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute -bottom-10 -left-20 w-64 h-64 rounded-full bg-brand-yellow/20 blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
      </section>

      {/* How It Works Section */}
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
              How It <span className="text-gradient">Works</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="section-subtitle"
            >
              Our simple three-step process makes learning accessible to everyone
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={cardVariants}
                className="card p-8 flex flex-col items-center text-center hover:border-brand-yellow"
              >
                <motion.div 
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="text-5xl mb-6"
                >
                  {step.icon}
                </motion.div>
                <div className="w-10 h-10 rounded-full bg-brand-yellow text-brand-dark flex items-center justify-center font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-4 font-playfair">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              Meet Our <span className="text-gradient">Team</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="section-subtitle"
            >
              The passionate educators and experts behind FikrSwap Academy
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={cardVariants}
                className="card overflow-hidden hover:border-brand-yellow"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 font-playfair">{member.name}</h3>
                  <p className="text-brand-yellow text-sm mb-4">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our <span className="text-gradient">Values</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="section-subtitle"
            >
              The principles that guide our approach to education and community
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={cardVariants}
                className="card p-8 hover:border-brand-yellow"
              >
                <h3 className="text-xl font-bold mb-4 font-playfair">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="absolute top-20 -right-24 w-64 h-64 rounded-full bg-brand-red/10 blur-3xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
        />
      </section>

      {/* CTA Section */}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">
                Ready to Join Our <span className="text-gradient">Community</span>?
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8">
                Become part of our growing network of learners and educators dedicated to sharing knowledge and fostering spiritual and intellectual growth.
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
                  <Link to="/contact">Contact Us</Link>
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
    </motion.div>
  );
};

export default AboutPage;
