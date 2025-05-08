
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FloralPattern } from "@/components/FloralPattern";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, MessageSquare, Star, Bell, Book, Users } from "lucide-react";

interface User {
  fullName?: string;
  email: string;
  isLoggedIn: boolean;
  avatar?: string;
}

interface CourseProgress {
  id: string;
  title: string;
  progress: number;
  nextLesson: string;
  image: string;
}

interface Notification {
  id: string;
  type: "message" | "course" | "announcement";
  content: string;
  timestamp: string;
  read: boolean;
}

interface UpcomingClass {
  id: string;
  title: string;
  instructor: string;
  date: string;
  time: string;
  duration: string;
  coverImage: string;
}

interface RecommendedCourse {
  id: string;
  title: string;
  instructor: string;
  level: string;
  rating: number;
  students: number;
  image: string;
}

const DashboardPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [upcomingClasses, setUpcomingClasses] = useState<UpcomingClass[]>([]);
  const [recommendedCourses, setRecommendedCourses] = useState<RecommendedCourse[]>([]);

  useEffect(() => {
    // Load user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Mock data for dashboard
    setCourseProgress([
      {
        id: "1",
        title: "Foundations of Islamic Jurisprudence",
        progress: 35,
        nextLesson: "The Quran as a Source of Law",
        image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&q=80&w=500"
      },
      {
        id: "2",
        title: "Arabic Calligraphy for Beginners",
        progress: 20,
        nextLesson: "Holding the Pen Correctly",
        image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&q=80&w=500"
      }
    ]);

    setNotifications([
      {
        id: "1",
        type: "message",
        content: "Fatima Zahra commented on your calligraphy submission",
        timestamp: "2 hours ago",
        read: false
      },
      {
        id: "2",
        type: "course",
        content: "New lesson available in Arabic Calligraphy course",
        timestamp: "1 day ago",
        read: true
      },
      {
        id: "3",
        type: "announcement",
        content: "Live Q&A session with Dr. Omar scheduled for next week",
        timestamp: "2 days ago",
        read: false
      }
    ]);

    setUpcomingClasses([
      {
        id: "1",
        title: "Understanding Legal Maxims in Islamic Jurisprudence",
        instructor: "Dr. Omar Farooq",
        date: "Tomorrow",
        time: "10:00 AM",
        duration: "1 hour",
        coverImage: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&q=80&w=500"
      },
      {
        id: "2",
        title: "Pen Techniques for Arabic Calligraphy",
        instructor: "Fatima Zahra",
        date: "Thursday",
        time: "2:00 PM",
        duration: "1.5 hours",
        coverImage: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&q=80&w=500"
      }
    ]);

    setRecommendedCourses([
      {
        id: "3",
        title: "Tajweed: The Art of Quranic Recitation",
        instructor: "Aisha Rahman",
        level: "Intermediate",
        rating: 4.9,
        students: 1578,
        image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&q=80&w=500"
      },
      {
        id: "4",
        title: "Islamic Geometric Patterns",
        instructor: "Yusuf Ali",
        level: "Intermediate",
        rating: 4.7,
        students: 842,
        image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&q=80&w=500"
      }
    ]);
  }, []);

  if (!user) {
    return (
      <div className="container-custom py-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">You are not signed in</h1>
          <p className="mb-6">Please sign in to access your dashboard</p>
          <Button asChild className="bg-brand-yellow text-brand-dark hover:bg-yellow-500">
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-16"
    >
      {/* Dashboard Header */}
      <section className="relative py-12 overflow-hidden bg-muted/30">
        <FloralPattern className="opacity-20" />
        
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 font-playfair">Welcome, {user.fullName || user.email.split('@')[0]}</h1>
              <p className="text-muted-foreground">
                Track your progress, join upcoming classes, and discover new courses
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-1">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
                {notifications.filter(n => !n.read).length > 0 && (
                  <Badge className="bg-brand-yellow text-brand-dark ml-1">{notifications.filter(n => !n.read).length}</Badge>
                )}
              </Button>
              <Avatar>
                <AvatarImage src={user.avatar} alt={user.fullName || user.email} />
                <AvatarFallback className="bg-brand-yellow text-brand-dark">
                  {(user.fullName?.charAt(0) || user.email.charAt(0)).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Course Progress */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="mb-10"
              >
                <h2 className="text-2xl font-bold mb-6 font-playfair">Your Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {courseProgress.map((course) => (
                    <motion.div key={course.id} variants={itemVariants}>
                      <Card>
                        <div className="h-40 relative overflow-hidden">
                          <img 
                            src={course.image} 
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-white font-bold">{course.title}</h3>
                          </div>
                        </div>
                        <CardContent className="pt-6">
                          <div className="mb-4">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Progress</span>
                              <span className="text-sm font-medium">{course.progress}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className="bg-brand-yellow h-2 rounded-full" 
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Book className="h-4 w-4 mt-1 text-brand-yellow" />
                            <div>
                              <span className="text-sm text-muted-foreground">Next Lesson:</span>
                              <p className="text-sm font-medium">{course.nextLesson}</p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button asChild className="w-full bg-brand-yellow text-brand-dark hover:bg-yellow-500">
                            <Link to={`/courses/${course.id}`}>Continue Learning</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button asChild variant="outline" className="border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-brand-dark mt-2">
                    <Link to="/courses">Browse More Courses</Link>
                  </Button>
                </div>
              </motion.div>

              {/* Upcoming Classes */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="mb-10"
              >
                <h2 className="text-2xl font-bold mb-6 font-playfair">Upcoming Classes</h2>
                <div className="space-y-4">
                  {upcomingClasses.map((cls) => (
                    <motion.div key={cls.id} variants={itemVariants}>
                      <Card>
                        <div className="md:flex">
                          <div className="h-40 md:w-48 md:h-auto relative overflow-hidden">
                            <img 
                              src={cls.coverImage} 
                              alt={cls.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 p-6">
                            <h3 className="font-bold mb-2">{cls.title}</h3>
                            <p className="text-sm text-muted-foreground mb-4">with {cls.instructor}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-brand-yellow" />
                                <span className="text-sm">{cls.date}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-brand-yellow" />
                                <span className="text-sm">{cls.time}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-brand-yellow" />
                                <span className="text-sm">{cls.duration}</span>
                              </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                              <Button className="bg-brand-yellow text-brand-dark hover:bg-yellow-500">
                                Join Class
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button asChild variant="outline" className="border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-brand-dark mt-2">
                    <Link to="/live-classes">View All Classes</Link>
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Notifications */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl">Notifications</CardTitle>
                      <Badge className="bg-brand-yellow text-brand-dark">
                        {notifications.filter(n => !n.read).length} new
                      </Badge>
                    </div>
                    <CardDescription>Stay updated on your courses and community</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {notifications.map((notification) => (
                      <motion.div 
                        key={notification.id}
                        variants={itemVariants}
                        className={`flex gap-3 p-3 rounded-lg ${notification.read ? 'bg-transparent' : 'bg-muted/50'}`}
                      >
                        <div className="mt-1">
                          {notification.type === 'message' ? (
                            <MessageSquare className="h-5 w-5 text-brand-yellow" />
                          ) : notification.type === 'course' ? (
                            <Book className="h-5 w-5 text-brand-yellow" />
                          ) : (
                            <Bell className="h-5 w-5 text-brand-yellow" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm">{notification.content}</p>
                          <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="ghost" className="w-full text-sm">View All Notifications</Button>
                  </CardFooter>
                </Card>
              </motion.div>

              {/* Recommended Courses */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl">Recommended For You</CardTitle>
                    <CardDescription>Based on your interests and activity</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recommendedCourses.map((course) => (
                      <motion.div 
                        key={course.id} 
                        variants={itemVariants}
                        className="group"
                      >
                        <Link to={`/courses/${course.id}`} className="flex gap-4">
                          <div className="w-20 h-20 rounded overflow-hidden">
                            <img 
                              src={course.image} 
                              alt={course.title}
                              className="w-full h-full object-cover transition-transform group-hover:scale-110"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium group-hover:text-brand-yellow transition-colors">{course.title}</h4>
                            <p className="text-xs text-muted-foreground mb-1">by {course.instructor}</p>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-brand-yellow text-brand-yellow" />
                              <span className="text-xs">{course.rating}</span>
                              <span className="text-xs text-muted-foreground">({course.students} students)</span>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button asChild variant="ghost" className="w-full text-sm">
                      <Link to="/courses">Explore All Courses</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              {/* Community Stats */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl">Community</CardTitle>
                    <CardDescription>Engage with fellow learners</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-brand-yellow" />
                        <span className="font-medium">Active Students</span>
                      </div>
                      <span className="text-brand-yellow font-bold">5,280+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-brand-yellow" />
                        <span className="font-medium">Discussion Posts</span>
                      </div>
                      <span className="text-brand-yellow font-bold">12,450+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Book className="h-5 w-5 text-brand-yellow" />
                        <span className="font-medium">Available Courses</span>
                      </div>
                      <span className="text-brand-yellow font-bold">85+</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button asChild variant="ghost" className="w-full text-sm">
                      <Link to="/community">Join Discussions</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default DashboardPage;
