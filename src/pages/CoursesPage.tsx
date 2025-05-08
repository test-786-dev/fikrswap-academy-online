
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FloralPattern } from '@/components/FloralPattern';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  rating: number;
  students: number;
  image: string;
  featured?: boolean;
}

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedSearch, setExpandedSearch] = useState(false);

  const categories = [
    'All Courses',
    'Islamic Studies',
    'Arabic Calligraphy',
    'Quranic Sciences',
    'Islamic Arts & Culture'
  ];

  const courses: Course[] = [
    {
      id: '1',
      title: 'Foundations of Islamic Jurisprudence',
      instructor: 'Dr. Omar Farooq',
      category: 'Islamic Studies',
      level: 'Beginner',
      duration: '8 weeks',
      rating: 4.9,
      students: 1243,
      image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&q=80&w=500',
      featured: true
    },
    {
      id: '2',
      title: 'Arabic Calligraphy for Beginners',
      instructor: 'Fatima Zahra',
      category: 'Arabic Calligraphy',
      level: 'Beginner',
      duration: '6 weeks',
      rating: 4.8,
      students: 986,
      image: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&q=80&w=500',
      featured: true
    },
    {
      id: '3',
      title: 'Tajweed: The Art of Quranic Recitation',
      instructor: 'Aisha Rahman',
      category: 'Quranic Sciences',
      level: 'Intermediate',
      duration: '12 weeks',
      rating: 4.9,
      students: 1578,
      image: 'https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&q=80&w=500',
      featured: true
    },
    {
      id: '4',
      title: 'Islamic Geometric Patterns',
      instructor: 'Yusuf Ali',
      category: 'Islamic Arts & Culture',
      level: 'Intermediate',
      duration: '10 weeks',
      rating: 4.7,
      students: 842,
      image: 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&q=80&w=500',
      featured: false
    },
    {
      id: '5',
      title: 'Advanced Arabic Grammar',
      instructor: 'Dr. Omar Farooq',
      category: 'Arabic Calligraphy',
      level: 'Advanced',
      duration: '14 weeks',
      rating: 4.8,
      students: 526,
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=500',
      featured: false
    },
    {
      id: '6',
      title: 'Comparative Islamic Theology',
      instructor: 'Aisha Rahman',
      category: 'Islamic Studies',
      level: 'Advanced',
      duration: '16 weeks',
      rating: 4.6,
      students: 387,
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=500',
      featured: false
    },
    {
      id: '7',
      title: 'Introduction to Islamic Philosophy',
      instructor: 'Dr. Omar Farooq',
      category: 'Islamic Studies',
      level: 'Beginner',
      duration: '8 weeks',
      rating: 4.9,
      students: 1123,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=500',
      featured: false
    },
    {
      id: '8',
      title: 'Manuscript Illumination Techniques',
      instructor: 'Fatima Zahra',
      category: 'Islamic Arts & Culture',
      level: 'Intermediate',
      duration: '9 weeks',
      rating: 4.8,
      students: 654,
      image: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&q=80&w=500',
      featured: false
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !activeCategory || activeCategory === 'All Courses' || course.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredCourses = courses.filter(course => course.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  function renderStarRating(rating: number) {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg key={`star-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-brand-yellow" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <svg key={`star-half-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-brand-yellow" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else {
        stars.push(
          <svg key={`star-empty-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    
    return <div className="flex">{stars}</div>;
  }

  const CourseCard = ({ course }: { course: Course }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -10 }}
      className="card overflow-hidden"
    >
      <Link to={`/courses/${course.id}`} className="block">
        <div className="h-48 relative overflow-hidden">
          <img 
            src={course.image} 
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <Badge className="bg-brand-yellow text-brand-dark hover:bg-yellow-500 mb-2">{course.level}</Badge>
            <div className="flex items-center gap-1">
              {renderStarRating(course.rating)}
              <span className="text-white text-sm ml-1">({course.rating})</span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 font-playfair line-clamp-2">{course.title}</h3>
          <p className="text-muted-foreground text-sm mb-3">with {course.instructor}</p>
          <div className="flex justify-between items-center">
            <span className="text-brand-yellow font-medium">{course.duration}</span>
            <span className="text-sm text-muted-foreground">{course.students.toLocaleString()} students</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20"
    >
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <FloralPattern className="opacity-30" />
        
        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-gradient">Explore Our Courses</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Discover a wide range of courses taught by expert instructors from our community
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: expandedSearch ? "100%" : "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative"
                onFocus={() => setExpandedSearch(true)}
                onBlur={() => setExpandedSearch(false)}
              >
                <Input
                  type="text"
                  placeholder="Search for courses or instructors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 bg-background border-brand-yellow focus:ring-brand-yellow"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
              </motion.div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  className={
                    activeCategory === category
                      ? "bg-brand-yellow text-brand-dark hover:bg-yellow-500"
                      : "border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-brand-dark"
                  }
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      {featuredCourses.length > 0 && !searchTerm && activeCategory !== "All Courses" && (
        <section className="py-12 bg-muted/30">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8 font-playfair">
              Featured <span className="text-gradient">Courses</span>
            </h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* All Courses Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold font-playfair">
              {searchTerm ? "Search Results" : activeCategory || "All Courses"}
            </h2>
            <div className="text-muted-foreground">
              {filteredCourses.length} {filteredCourses.length === 1 ? "course" : "courses"} found
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory || "all" + searchTerm}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredCourses.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <h3 className="text-2xl font-medium mb-4">No courses found</h3>
              <p className="text-muted-foreground mb-6">
                We couldn't find any courses matching your criteria. Try adjusting your search or browse all courses.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("All Courses");
                }}
                className="bg-brand-yellow text-brand-dark hover:bg-yellow-500"
              >
                View All Courses
              </Button>
            </motion.div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-muted/50">
        <div className="container-custom">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <FloralPattern className="opacity-10" />
            
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 font-playfair">
                Can't Find What You're <span className="text-gradient">Looking For</span>?
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8">
                Request a course or suggest a topic you'd like to learn about. We're constantly expanding our curriculum based on community needs.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  asChild
                  className="bg-brand-yellow text-brand-dark hover:bg-yellow-500"
                >
                  <Link to="/contact">Request a Course</Link>
                </Button>
                
                <Button 
                  asChild
                  variant="outline" 
                  className="border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-brand-dark"
                >
                  <Link to="/become-instructor">Become an Instructor</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default CoursesPage;
