
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FloralPattern } from "@/components/FloralPattern";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar,
  Clock,
  User,
  Users,
  Star,
  BookOpen,
  Check,
} from "lucide-react";

interface CourseDetail {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  instructor: {
    name: string;
    title: string;
    bio: string;
    avatar: string;
  };
  category: string;
  level: string;
  duration: string;
  schedule: string;
  lessons: number;
  students: number;
  rating: number;
  reviews: number;
  image: string;
  price: string;
  prerequisites: string[];
  learningObjectives: string[];
  relatedCourses: RelatedCourse[];
}

interface RelatedCourse {
  id: string;
  title: string;
  instructor: string;
  image: string;
  rating: number;
}

const mockCourseData: Record<string, CourseDetail> = {
  "1": {
    id: "1",
    title: "Foundations of Islamic Jurisprudence",
    description: "Explore the foundational principles of Islamic law and jurisprudence",
    longDescription: "This comprehensive course takes you through the rich history and evolution of Islamic jurisprudence (Fiqh) and its foundational principles (Usool al-Fiqh). You'll learn about the major schools of thought, methodologies of deriving rulings, and how classical principles are applied to contemporary issues. By the end of this course, you'll have a solid understanding of how Islamic legal rulings are formulated and the wisdom behind the diversity of legal opinions in the tradition.",
    instructor: {
      name: "Dr. Omar Farooq",
      title: "Professor of Islamic Studies",
      bio: "Dr. Omar holds a PhD in Islamic Law from Al-Azhar University and has authored multiple books on contemporary Fiqh issues. With over 15 years of teaching experience, he specializes in making complex legal theories accessible to students of all levels.",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250"
    },
    category: "Islamic Studies",
    level: "Beginner",
    duration: "8 weeks",
    schedule: "Twice weekly, Mondays and Thursdays",
    lessons: 24,
    students: 1243,
    rating: 4.9,
    reviews: 426,
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&q=80&w=1200",
    price: "$199",
    prerequisites: [
      "Basic understanding of Islamic principles",
      "Ability to read simple Arabic texts (optional)",
      "No prior knowledge of Islamic law required"
    ],
    learningObjectives: [
      "Understand the historical development of Islamic legal schools",
      "Identify the sources of Islamic law and their hierarchy",
      "Recognize methodologies of deriving rulings from primary texts",
      "Apply classical principles to contemporary issues",
      "Appreciate the wisdom behind differences of opinion in Islamic law"
    ],
    relatedCourses: [
      {
        id: "6",
        title: "Comparative Islamic Theology",
        instructor: "Aisha Rahman",
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=500",
        rating: 4.6
      },
      {
        id: "7",
        title: "Introduction to Islamic Philosophy",
        instructor: "Dr. Omar Farooq",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=500",
        rating: 4.9
      }
    ]
  },
  "2": {
    id: "2",
    title: "Arabic Calligraphy for Beginners",
    description: "Learn the beautiful art of Arabic calligraphy from master practitioners",
    longDescription: "This course introduces you to the timeless art of Arabic calligraphy, focusing on the Naskh style, which is perfect for beginners. You'll discover the rich history of Islamic calligraphy, learn about traditional tools and techniques, and develop practical skills through guided exercises. Our step-by-step approach takes you from basic letterforms to creating your own artistic compositions by the end of the course.",
    instructor: {
      name: "Fatima Zahra",
      title: "Master Calligrapher",
      bio: "Fatima has studied under master calligraphers in Istanbul and Morocco, receiving traditional ijazah (certification) in multiple styles. Her work has been exhibited in galleries across the Middle East and Europe, and she has taught calligraphy for over a decade.",
      avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=250"
    },
    category: "Arabic Calligraphy",
    level: "Beginner",
    duration: "6 weeks",
    schedule: "Weekly sessions on Saturdays",
    lessons: 18,
    students: 986,
    rating: 4.8,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&q=80&w=1200",
    price: "$149",
    prerequisites: [
      "No prior experience with Arabic or calligraphy required",
      "Basic drawing materials (specialized tools will be discussed in first session)",
      "Patience and willingness to practice regularly"
    ],
    learningObjectives: [
      "Understand the historical significance of calligraphy in Islamic culture",
      "Master the basic techniques and tools of Arabic calligraphy",
      "Learn to write the Arabic alphabet in the Naskh style",
      "Develop skills to create simple compositions and designs",
      "Gain knowledge about traditional and modern applications of the art form"
    ],
    relatedCourses: [
      {
        id: "5",
        title: "Advanced Arabic Grammar",
        instructor: "Dr. Omar Farooq",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=500",
        rating: 4.8
      },
      {
        id: "8",
        title: "Manuscript Illumination Techniques",
        instructor: "Fatima Zahra",
        image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&q=80&w=500",
        rating: 4.8
      }
    ]
  },
  "3": {
    id: "3",
    title: "Tajweed: The Art of Quranic Recitation",
    description: "Master the rules and techniques of proper Quranic recitation",
    longDescription: "This intermediate course delves into the science of Tajweed—the rules governing the correct pronunciation and recitation of the Quran. You'll learn the detailed rules of Tajweed from an experienced instructor, practice with assigned passages, and receive personalized feedback on your recitation. By the end of the course, you'll have improved your recitation quality and gained a deeper appreciation for the beauty of the Quranic text.",
    instructor: {
      name: "Aisha Rahman",
      title: "Quranic Recitation Specialist",
      bio: "Aisha holds multiple ijazah (certifications) in Quranic recitation from renowned teachers in Egypt and Saudi Arabia. She has memorized the entire Quran and has been teaching Tajweed for over 20 years, helping hundreds of students improve their recitation.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250"
    },
    category: "Quranic Sciences",
    level: "Intermediate",
    duration: "12 weeks",
    schedule: "Twice weekly, Tuesdays and Saturdays",
    lessons: 36,
    students: 1578,
    rating: 4.9,
    reviews: 587,
    image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&q=80&w=1200",
    price: "$249",
    prerequisites: [
      "Ability to read Arabic script",
      "Familiarity with basic Quranic recitation",
      "Commitment to regular practice between sessions"
    ],
    learningObjectives: [
      "Master the rules of pronunciation (Makharij al-Huruf)",
      "Apply the rules of prolongation (Madd)",
      "Practice proper stopping and starting points (Waqf and Ibtida)",
      "Recognize and implement special recitation rules",
      "Develop a melodious and accurate recitation style"
    ],
    relatedCourses: [
      {
        id: "6",
        title: "Comparative Islamic Theology",
        instructor: "Aisha Rahman",
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=500",
        rating: 4.6
      },
      {
        id: "7",
        title: "Introduction to Islamic Philosophy",
        instructor: "Dr. Omar Farooq",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=500",
        rating: 4.9
      }
    ]
  }
};

const CourseDetailPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const course = mockCourseData[courseId || "1"];

  if (!course) {
    return <div className="container-custom py-20">Course not found</div>;
  }

  const renderStarRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={`star-${i}`} className="h-4 w-4 fill-brand-yellow text-brand-yellow" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star key={`star-half-${i}`} className="h-4 w-4 fill-brand-yellow text-brand-yellow" />
        );
      } else {
        stars.push(
          <Star key={`star-empty-${i}`} className="h-4 w-4 text-gray-300" />
        );
      }
    }
    
    return <div className="flex">{stars}</div>;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-16"
    >
      {/* Course Header */}
      <section className="relative py-16 overflow-hidden bg-muted/30">
        <FloralPattern className="opacity-20" />
        
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Badge className="bg-brand-yellow text-brand-dark hover:bg-yellow-500 mb-4">
                {course.category}
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-playfair">
                {course.title}
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground mb-6">
                {course.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {renderStarRating(course.rating)}
                  <span className="ml-1">({course.rating})</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>{course.lessons} lessons</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 mb-6">
                <img 
                  src={course.instructor.avatar} 
                  alt={course.instructor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{course.instructor.name}</p>
                  <p className="text-sm text-muted-foreground">{course.instructor.title}</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-brand-yellow text-brand-dark hover:bg-yellow-500"
                >
                  Enroll Now - {course.price}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-brand-dark"
                  asChild
                >
                  <Link to={`/courses/${course.id}/curriculum`}>View Curriculum</Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden shadow-xl"
            >
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {/* Course Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold mb-6 font-playfair">Course Overview</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {course.longDescription}
                </p>
              </motion.div>
              
              {/* Learning Objectives */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold mb-6 font-playfair">What You'll Learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.learningObjectives.map((objective, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-1 bg-brand-yellow/20 p-1 rounded">
                        <Check className="h-4 w-4 text-brand-yellow" />
                      </div>
                      <p>{objective}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* Prerequisites */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold mb-6 font-playfair">Prerequisites</h2>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  {course.prerequisites.map((prerequisite, index) => (
                    <li key={index}>{prerequisite}</li>
                  ))}
                </ul>
              </motion.div>
              
              {/* Instructor */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6 font-playfair">Your Instructor</h2>
                <div className="card p-6 border-brand-yellow/20">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={course.instructor.avatar} 
                      alt={course.instructor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-lg">{course.instructor.name}</h3>
                      <p className="text-brand-yellow">{course.instructor.title}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{course.instructor.bio}</p>
                </div>
              </motion.div>
            </div>
            
            <div className="space-y-8">
              {/* Course Details Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="card p-6 sticky top-24"
              >
                <h3 className="text-xl font-bold mb-6 font-playfair">Course Details</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>Instructor</span>
                    </div>
                    <span className="font-medium">{course.instructor.name}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <BookOpen className="h-4 w-4" />
                      <span>Lessons</span>
                    </div>
                    <span className="font-medium">{course.lessons} lessons</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Duration</span>
                    </div>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Schedule</span>
                    </div>
                    <span className="font-medium">{course.schedule}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Star className="h-4 w-4" />
                      <span>Rating</span>
                    </div>
                    <span className="font-medium">{course.rating} ({course.reviews} reviews)</span>
                  </div>
                </div>
                
                <Button
                  className="w-full bg-brand-yellow text-brand-dark hover:bg-yellow-500 mt-6"
                  size="lg"
                >
                  Enroll Now - {course.price}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Courses */}
      {course.relatedCourses.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container-custom">
            <h2 className="text-2xl font-bold mb-8 font-playfair">Related Courses</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {course.relatedCourses.map((relatedCourse) => (
                <motion.div
                  key={relatedCourse.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -10 }}
                  className="card overflow-hidden"
                >
                  <Link to={`/courses/${relatedCourse.id}`} className="block">
                    <div className="h-48 relative overflow-hidden">
                      <img 
                        src={relatedCourse.image} 
                        alt={relatedCourse.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <div className="flex items-center gap-1">
                          {renderStarRating(relatedCourse.rating)}
                          <span className="text-white text-sm ml-1">({relatedCourse.rating})</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 font-playfair">{relatedCourse.title}</h3>
                      <p className="text-muted-foreground text-sm">with {relatedCourse.instructor}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </motion.div>
  );
};

export default CourseDetailPage;
