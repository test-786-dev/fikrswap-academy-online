
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FloralPattern } from "@/components/FloralPattern";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ChevronDown,
  ChevronRight,
  Clock,
  Play,
  FileText,
  CheckCircle,
  Lock,
} from "lucide-react";
import { useState } from "react";

interface CourseModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  type: "video" | "text" | "quiz";
  duration: string;
  isCompleted?: boolean;
  isLocked: boolean;
}

interface CurriculumData {
  id: string;
  title: string;
  description: string;
  instructor: string;
  level: string;
  category: string;
  totalDuration: string;
  totalLessons: number;
  completedLessons: number;
  progress: number;
  modules: CourseModule[];
}

const mockCurriculumData: Record<string, CurriculumData> = {
  "1": {
    id: "1",
    title: "Foundations of Islamic Jurisprudence",
    description: "Comprehensive introduction to Islamic legal theory and methodology",
    instructor: "Dr. Omar Farooq",
    level: "Beginner",
    category: "Islamic Studies",
    totalDuration: "24 hours",
    totalLessons: 24,
    completedLessons: 0,
    progress: 0,
    modules: [
      {
        id: "m1",
        title: "Introduction to Islamic Jurisprudence",
        description: "Learn about the fundamental concepts and history of Fiqh",
        duration: "3 hours",
        lessons: [
          {
            id: "l1",
            title: "What is Islamic Jurisprudence?",
            type: "video",
            duration: "45 min",
            isLocked: false
          },
          {
            id: "l2",
            title: "Historical Development of Fiqh",
            type: "video",
            duration: "50 min",
            isLocked: false
          },
          {
            id: "l3",
            title: "Major Schools of Thought",
            type: "video",
            duration: "55 min",
            isLocked: false
          },
          {
            id: "l4",
            title: "Module 1 Reading Materials",
            type: "text",
            duration: "30 min",
            isLocked: false
          },
        ]
      },
      {
        id: "m2",
        title: "Sources of Islamic Law",
        description: "Explore the primary and secondary sources of Islamic legal rulings",
        duration: "4 hours",
        lessons: [
          {
            id: "l5",
            title: "The Quran as a Source of Law",
            type: "video",
            duration: "60 min",
            isLocked: true
          },
          {
            id: "l6",
            title: "The Sunnah as a Source of Law",
            type: "video",
            duration: "50 min",
            isLocked: true
          },
          {
            id: "l7",
            title: "Ijma (Consensus) and its Authority",
            type: "video",
            duration: "45 min",
            isLocked: true
          },
          {
            id: "l8",
            title: "Qiyas (Analogical Reasoning)",
            type: "video",
            duration: "50 min",
            isLocked: true
          },
          {
            id: "l9",
            title: "Module 2 Assessment",
            type: "quiz",
            duration: "35 min",
            isLocked: true
          },
        ]
      },
      {
        id: "m3",
        title: "Legal Maxims in Islamic Jurisprudence",
        description: "Study the key principles that guide legal interpretation and application",
        duration: "3.5 hours",
        lessons: [
          {
            id: "l10",
            title: "Introduction to Legal Maxims",
            type: "video",
            duration: "40 min",
            isLocked: true
          },
          {
            id: "l11",
            title: "The Five Major Legal Maxims",
            type: "video",
            duration: "55 min",
            isLocked: true
          },
          {
            id: "l12",
            title: "Application of Legal Maxims",
            type: "video",
            duration: "50 min",
            isLocked: true
          },
          {
            id: "l13",
            title: "Case Studies in Legal Maxims",
            type: "video",
            duration: "45 min",
            isLocked: true
          },
          {
            id: "l14",
            title: "Module 3 Reading Materials",
            type: "text",
            duration: "30 min",
            isLocked: true
          },
        ]
      },
      {
        id: "m4",
        title: "Contemporary Applications of Islamic Law",
        description: "Discover how classical principles address modern challenges",
        duration: "4.5 hours",
        lessons: [
          {
            id: "l15",
            title: "Islamic Finance Principles",
            type: "video",
            duration: "60 min",
            isLocked: true
          },
          {
            id: "l16",
            title: "Family Law in Modern Contexts",
            type: "video",
            duration: "55 min",
            isLocked: true
          },
          {
            id: "l17",
            title: "Bioethics and Medical Issues",
            type: "video",
            duration: "60 min",
            isLocked: true
          },
          {
            id: "l18",
            title: "Environmental Ethics in Islamic Law",
            type: "video",
            duration: "45 min",
            isLocked: true
          },
          {
            id: "l19",
            title: "Module 4 Assessment",
            type: "quiz",
            duration: "30 min",
            isLocked: true
          },
        ]
      },
      {
        id: "m5",
        title: "Final Project & Conclusion",
        description: "Apply your knowledge through a guided research project",
        duration: "9 hours",
        lessons: [
          {
            id: "l20",
            title: "Research Methodology",
            type: "video",
            duration: "45 min",
            isLocked: true
          },
          {
            id: "l21",
            title: "Project Guidelines",
            type: "text",
            duration: "30 min",
            isLocked: true
          },
          {
            id: "l22",
            title: "Independent Research Time",
            type: "text",
            duration: "6 hours",
            isLocked: true
          },
          {
            id: "l23",
            title: "Course Review",
            type: "video",
            duration: "60 min",
            isLocked: true
          },
          {
            id: "l24",
            title: "Final Assessment",
            type: "quiz",
            duration: "45 min",
            isLocked: true
          },
        ]
      }
    ]
  },
  "2": {
    id: "2",
    title: "Arabic Calligraphy for Beginners",
    description: "Learn the beautiful art of Arabic calligraphy from master practitioners",
    instructor: "Fatima Zahra",
    level: "Beginner",
    category: "Arabic Calligraphy",
    totalDuration: "18 hours",
    totalLessons: 18,
    completedLessons: 0,
    progress: 0,
    modules: [
      {
        id: "m1",
        title: "Introduction to Arabic Calligraphy",
        description: "Learn about the history and significance of Arabic calligraphy",
        duration: "3 hours",
        lessons: [
          {
            id: "l1",
            title: "History of Arabic Calligraphy",
            type: "video",
            duration: "45 min",
            isLocked: false
          },
          {
            id: "l2",
            title: "Calligraphy Styles Overview",
            type: "video",
            duration: "50 min",
            isLocked: false
          },
          {
            id: "l3",
            title: "Tools and Materials",
            type: "video",
            duration: "55 min",
            isLocked: false
          },
          {
            id: "l4",
            title: "Setting Up Your Workspace",
            type: "text",
            duration: "30 min",
            isLocked: false
          },
        ]
      },
      {
        id: "m2",
        title: "Basic Techniques",
        description: "Master fundamental strokes and letter formations",
        duration: "4 hours",
        lessons: [
          {
            id: "l5",
            title: "Holding the Pen Correctly",
            type: "video",
            duration: "40 min",
            isLocked: true
          },
          {
            id: "l6",
            title: "Basic Strokes Practice",
            type: "video",
            duration: "60 min",
            isLocked: true
          },
          {
            id: "l7",
            title: "Introduction to Dots and Proportions",
            type: "video",
            duration: "50 min",
            isLocked: true
          },
          {
            id: "l8",
            title: "Practice Session 1",
            type: "video",
            duration: "50 min",
            isLocked: true
          }
        ]
      }
    ]
  },
  "3": {
    id: "3",
    title: "Tajweed: The Art of Quranic Recitation",
    description: "Master the rules and techniques of proper Quranic recitation",
    instructor: "Aisha Rahman",
    level: "Intermediate",
    category: "Quranic Sciences",
    totalDuration: "36 hours",
    totalLessons: 36,
    completedLessons: 0,
    progress: 0,
    modules: [
      {
        id: "m1",
        title: "Introduction to Tajweed",
        description: "Learn the fundamental concepts and importance of Tajweed",
        duration: "4 hours",
        lessons: [
          {
            id: "l1",
            title: "What is Tajweed?",
            type: "video",
            duration: "45 min",
            isLocked: false
          },
          {
            id: "l2",
            title: "Importance of Proper Recitation",
            type: "video",
            duration: "50 min",
            isLocked: false
          },
          {
            id: "l3",
            title: "History of Tajweed Science",
            type: "video",
            duration: "55 min",
            isLocked: false
          },
          {
            id: "l4",
            title: "Recitation Etiquette",
            type: "video",
            duration: "50 min",
            isLocked: false
          }
        ]
      },
      {
        id: "m2",
        title: "Articulation Points",
        description: "Master the proper pronunciation of Arabic letters",
        duration: "5 hours",
        lessons: [
          {
            id: "l5",
            title: "Introduction to Makharij",
            type: "video",
            duration: "40 min",
            isLocked: true
          },
          {
            id: "l6",
            title: "Throat Letters",
            type: "video",
            duration: "55 min",
            isLocked: true
          },
          {
            id: "l7",
            title: "Tongue Letters",
            type: "video",
            duration: "60 min",
            isLocked: true
          },
          {
            id: "l8",
            title: "Lip Letters",
            type: "video",
            duration: "45 min",
            isLocked: true
          },
          {
            id: "l9",
            title: "Nasal Cavity Letters",
            type: "video",
            duration: "50 min",
            isLocked: true
          },
          {
            id: "l10",
            title: "Practice Session 1",
            type: "video",
            duration: "50 min",
            isLocked: true
          }
        ]
      }
    ]
  }
};

const CourseViewCurriculumPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});
  
  const curriculum = mockCurriculumData[courseId || "1"];

  if (!curriculum) {
    return <div className="container-custom py-20">Curriculum not found</div>;
  }

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const renderLessonIcon = (type: string, isCompleted: boolean | undefined, isLocked: boolean) => {
    if (isLocked) {
      return <Lock className="h-5 w-5 text-muted-foreground" />;
    }
    
    if (isCompleted) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
    
    switch (type) {
      case "video":
        return <Play className="h-5 w-5 text-brand-yellow" />;
      case "text":
        return <FileText className="h-5 w-5 text-brand-yellow" />;
      case "quiz":
        return <FileText className="h-5 w-5 text-brand-yellow" />;
      default:
        return <FileText className="h-5 w-5 text-brand-yellow" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-16"
    >
      {/* Curriculum Header */}
      <section className="relative py-16 overflow-hidden bg-muted/30">
        <FloralPattern className="opacity-20" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-brand-yellow text-brand-dark hover:bg-yellow-500">
                {curriculum.category}
              </Badge>
              <Badge variant="outline">{curriculum.level}</Badge>
            </div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-3xl sm:text-4xl font-bold mb-4 font-playfair"
            >
              {curriculum.title}: Curriculum
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-lg text-muted-foreground mb-6"
            >
              {curriculum.description}
            </motion.p>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-5 w-5" />
                <span>Total Duration: {curriculum.totalDuration}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <FileText className="h-5 w-5" />
                <span>Total Lessons: {curriculum.totalLessons}</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                className="bg-brand-yellow text-brand-dark hover:bg-yellow-500"
              >
                <Link to={`/courses/${curriculum.id}`}>Back to Course</Link>
              </Button>
              
              <Button 
                variant="outline" 
                className="border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-brand-dark"
              >
                Download Curriculum
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Content */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Progress Tracker */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-4 font-playfair">Your Progress</h2>
              <div className="bg-muted h-4 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${curriculum.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-brand-yellow"
                ></motion.div>
              </div>
              <p className="mt-2 text-muted-foreground">
                {curriculum.completedLessons} of {curriculum.totalLessons} lessons completed ({curriculum.progress}%)
              </p>
            </motion.div>

            {/* Module List */}
            <h2 className="text-2xl font-bold mb-6 font-playfair">Curriculum Modules</h2>
            
            <div className="space-y-4">
              {curriculum.modules.map((module, moduleIndex) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: moduleIndex * 0.1 }}
                  className="border border-border rounded-lg overflow-hidden"
                >
                  {/* Module Header */}
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full flex justify-between items-center p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-medium">
                        {moduleIndex + 1}
                      </div>
                      <div className="text-left">
                        <h3 className="font-bold">{module.title}</h3>
                        <p className="text-sm text-muted-foreground">{module.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground hidden sm:block">{module.duration}</span>
                      {expandedModules[module.id] ? (
                        <ChevronDown className="h-5 w-5" />
                      ) : (
                        <ChevronRight className="h-5 w-5" />
                      )}
                    </div>
                  </button>
                  
                  {/* Module Lessons */}
                  {expandedModules[module.id] && (
                    <div className="bg-muted/20">
                      <Separator />
                      <div className="p-4">
                        {module.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className={`flex items-center justify-between p-3 rounded-md ${
                              !lesson.isLocked ? "hover:bg-muted transition-colors cursor-pointer" : "opacity-70"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-muted/60 flex items-center justify-center">
                                {renderLessonIcon(lesson.type, lesson.isCompleted, lesson.isLocked)}
                              </div>
                              <div>
                                <h4 className={lesson.isLocked ? "text-muted-foreground" : ""}>{lesson.title}</h4>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span>{lesson.type === 'video' ? 'Video' : lesson.type === 'quiz' ? 'Quiz' : 'Reading'}</span>
                                  <span>·</span>
                                  <span>{lesson.duration}</span>
                                </div>
                              </div>
                            </div>
                            {lesson.isLocked && (
                              <Badge variant="outline" className="text-xs">Locked</Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-muted/30">
        <div className="container-custom">
          <div className="bg-card border border-border rounded-xl p-8 relative overflow-hidden">
            <FloralPattern className="opacity-10" />
            
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 font-playfair">
                Ready to Start <span className="text-gradient">Learning</span>?
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8">
                Enroll now to unlock all lessons and begin your educational journey with us.
              </p>
              
              <Button 
                size="lg"
                className="bg-brand-yellow text-brand-dark hover:bg-yellow-500"
              >
                Enroll in This Course
              </Button>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default CourseViewCurriculumPage;
