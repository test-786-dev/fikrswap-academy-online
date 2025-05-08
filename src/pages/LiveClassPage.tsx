
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FloralPattern } from "@/components/FloralPattern";
import { Calendar, Clock, Play, MessageSquare, Mic, MicOff, Video, VideoOff, Users, Share, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LiveClass {
  id: string;
  title: string;
  instructor: {
    name: string;
    avatar: string;
  };
  date: string;
  time: string;
  duration: string;
  attendees: number;
  description: string;
  topics: string[];
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

interface ChatMessage {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  message: string;
  timestamp: string;
  isCurrentUser: boolean;
}

const LiveClassPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isInClass, setIsInClass] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isAudioOn, setIsMicOn] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [chatMessage, setChatMessage] = useState("");

  const [currentClass, setCurrentClass] = useState<LiveClass>({
    id: "1",
    title: "Understanding Legal Maxims in Islamic Jurisprudence",
    instructor: {
      name: "Dr. Omar Farooq",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250"
    },
    date: "May 10, 2025",
    time: "10:00 AM",
    duration: "1 hour",
    attendees: 24,
    description: "In this live session, we'll explore the key legal maxims that guide Islamic jurisprudence. We'll discuss their historical development, practical applications, and relevance in contemporary contexts.",
    topics: [
      "Five Major Legal Maxims",
      "Historical Development of Legal Maxims",
      "Application in Contemporary Issues",
      "Q&A Session"
    ]
  });

  const upcomingClasses: UpcomingClass[] = [
    {
      id: "1",
      title: "Understanding Legal Maxims in Islamic Jurisprudence",
      instructor: "Dr. Omar Farooq",
      date: "May 10, 2025",
      time: "10:00 AM",
      duration: "1 hour",
      coverImage: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&q=80&w=500"
    },
    {
      id: "2",
      title: "Pen Techniques for Arabic Calligraphy",
      instructor: "Fatima Zahra",
      date: "May 12, 2025",
      time: "2:00 PM",
      duration: "1.5 hours",
      coverImage: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&q=80&w=500"
    },
    {
      id: "3",
      title: "Introduction to Tajweed Rules",
      instructor: "Aisha Rahman",
      date: "May 15, 2025",
      time: "9:00 AM",
      duration: "1.5 hours",
      coverImage: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&q=80&w=500"
    }
  ];

  const chatMessages: ChatMessage[] = [
    {
      id: "1",
      user: {
        name: "Ahmad Khalid",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=250"
      },
      message: "Can you explain the first legal maxim in more detail?",
      timestamp: "10:15 AM",
      isCurrentUser: false
    },
    {
      id: "2",
      user: {
        name: "Sarah Ahmed",
        avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=250"
      },
      message: "Are these maxims applied the same way across different schools of thought?",
      timestamp: "10:18 AM",
      isCurrentUser: false
    },
    {
      id: "3",
      user: {
        name: "You",
      },
      message: "Thank you for clarifying that point, Dr. Omar. Very insightful!",
      timestamp: "10:22 AM",
      isCurrentUser: true
    }
  ];

  const handleJoinClass = (classId: string) => {
    const classToJoin = upcomingClasses.find(c => c.id === classId);
    if (classToJoin) {
      setIsInClass(true);
      toast({
        title: "Joined class",
        description: `You have joined ${classToJoin.title}`,
      });
    }
  };

  const handleLeaveClass = () => {
    setIsInClass(false);
    setIsVideoOn(false);
    setIsMicOn(false);
    setIsScreenSharing(false);
    toast({
      title: "Left class",
      description: "You have successfully left the class",
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      // In a real app, this would send the message to a server
      toast({
        title: "Message sent",
        description: "Your message has been sent to the class",
      });
      setChatMessage("");
    }
  };

  const handleHostClass = () => {
    toast({
      title: "Host a class",
      description: "The host class feature will be available soon",
    });
  };

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
      {/* Live Class Header */}
      <section className="relative py-12 overflow-hidden bg-muted/30">
        <FloralPattern className="opacity-20" />
        
        <div className="container-custom relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-4xl font-bold mb-4 font-playfair"
          >
            <span className="text-gradient">Live Classes</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-lg text-muted-foreground mb-6"
          >
            Join interactive sessions with expert instructors and fellow students
          </motion.p>

          {/* Main Tabs */}
          <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="upcoming">Upcoming Classes</TabsTrigger>
              <TabsTrigger value="my-classes">My Classes</TabsTrigger>
              <TabsTrigger value="host">Host a Class</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Live Class Content */}
      {isInClass ? (
        <section className="py-12 bg-muted/10">
          <div className="container-custom">
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold font-playfair">{currentClass.title}</h2>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>with {currentClass.instructor.name}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{currentClass.attendees} participants</span>
                  </div>
                </div>
              </div>
              <Button 
                onClick={handleLeaveClass} 
                variant="destructive" 
                size="sm"
                className="flex items-center gap-1"
              >
                <X className="h-4 w-4" />
                <span>Leave</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Video Area */}
              <div className="lg:col-span-2">
                <Card className="overflow-hidden">
                  <div className="aspect-video bg-black/90 relative flex items-center justify-center">
                    <img 
                      src={currentClass.instructor.avatar} 
                      alt={currentClass.instructor.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-brand-yellow/50"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 flex justify-between">
                      <div className="flex items-center gap-3">
                        <Button 
                          size="sm" 
                          variant={isAudioOn ? "default" : "outline"}
                          className={isAudioOn ? "bg-brand-yellow text-brand-dark hover:bg-yellow-500" : ""}
                          onClick={() => setIsMicOn(!isAudioOn)}
                        >
                          {isAudioOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                        </Button>
                        <Button 
                          size="sm" 
                          variant={isVideoOn ? "default" : "outline"}
                          className={isVideoOn ? "bg-brand-yellow text-brand-dark hover:bg-yellow-500" : ""}
                          onClick={() => setIsVideoOn(!isVideoOn)}
                        >
                          {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                        </Button>
                        <Button 
                          size="sm" 
                          variant={isScreenSharing ? "default" : "outline"}
                          className={isScreenSharing ? "bg-brand-yellow text-brand-dark hover:bg-yellow-500" : ""}
                          onClick={() => setIsScreenSharing(!isScreenSharing)}
                        >
                          <Share className="h-4 w-4" />
                          <span className="ml-1 hidden sm:inline">{isScreenSharing ? "Stop Sharing" : "Share Screen"}</span>
                        </Button>
                      </div>
                      <div className="flex items-center">
                        <span className="text-white text-sm bg-red-500/80 px-2 py-1 rounded-md">Live</span>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="font-medium mb-2">About This Class</h3>
                    <p className="text-sm text-muted-foreground mb-4">{currentClass.description}</p>
                    <h4 className="font-medium mb-2">Topics</h4>
                    <ul className="list-disc pl-5 text-sm text-muted-foreground">
                      {currentClass.topics.map((topic, index) => (
                        <li key={index}>{topic}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Chat Area */}
              <div>
                <Card className="h-[600px] flex flex-col">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Class Chat</CardTitle>
                    <CardDescription>Interact with the instructor and other students</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow overflow-y-auto space-y-4 mb-4">
                    {chatMessages.map((message) => (
                      <div 
                        key={message.id}
                        className={`flex gap-3 ${message.isCurrentUser ? 'justify-end' : ''}`}
                      >
                        {!message.isCurrentUser && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={message.user.avatar} alt={message.user.name} />
                            <AvatarFallback className="bg-brand-yellow/20 text-brand-yellow">
                              {message.user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className={`max-w-[75%] ${message.isCurrentUser ? 'bg-brand-yellow/20 text-foreground' : 'bg-muted'} rounded-lg p-3`}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-xs">
                              {message.isCurrentUser ? 'You' : message.user.name}
                            </span>
                            <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                          </div>
                          <p className="text-sm">{message.message}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter className="pt-0">
                    <form onSubmit={handleSendMessage} className="w-full flex gap-2">
                      <Input 
                        placeholder="Type a message..."
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        className="flex-grow"
                      />
                      <Button 
                        type="submit" 
                        size="sm"
                        className="bg-brand-yellow text-brand-dark hover:bg-yellow-500"
                      >
                        Send
                      </Button>
                    </form>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-12">
          <div className="container-custom">
            <TabsContent value="upcoming" className="mt-0">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <h2 className="text-2xl font-bold mb-6 font-playfair">Upcoming Classes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingClasses.map((cls) => (
                    <motion.div key={cls.id} variants={itemVariants}>
                      <Card className="overflow-hidden h-full flex flex-col">
                        <div className="h-40 relative overflow-hidden">
                          <img 
                            src={cls.coverImage} 
                            alt={cls.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                          <div className="absolute bottom-4 left-4">
                            <Badge className="bg-brand-yellow text-brand-dark hover:bg-yellow-500">
                              Live Class
                            </Badge>
                          </div>
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{cls.title}</CardTitle>
                          <CardDescription>with {cls.instructor}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <div className="grid grid-cols-2 gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-brand-yellow" />
                              <span className="text-sm">{cls.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-brand-yellow" />
                              <span className="text-sm">{cls.time}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-brand-yellow" />
                            <span className="text-sm">Duration: {cls.duration}</span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            onClick={() => handleJoinClass(cls.id)} 
                            className="w-full bg-brand-yellow text-brand-dark hover:bg-yellow-500"
                          >
                            <Play className="h-4 w-4 mr-2" /> Join Class
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="my-classes" className="mt-0">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <h2 className="text-2xl font-bold mb-6 font-playfair">My Classes</h2>
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">You haven't enrolled in any live classes yet.</p>
                  <Button 
                    asChild
                    className="bg-brand-yellow text-brand-dark hover:bg-yellow-500"
                  >
                    <Link to="/courses">Browse Courses</Link>
                  </Button>
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="host" className="mt-0">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <h2 className="text-2xl font-bold mb-6 font-playfair">Host a Class</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>Create a New Live Class</CardTitle>
                    <CardDescription>Share your knowledge with our community</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium">Class Title</label>
                        <Input id="title" placeholder="Enter a clear title for your class" />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium">Description</label>
                        <Textarea 
                          id="description" 
                          placeholder="Provide a detailed description of what your class will cover"
                          className="min-h-[100px]"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="date" className="text-sm font-medium">Date</label>
                          <Input id="date" type="date" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="time" className="text-sm font-medium">Time</label>
                          <Input id="time" type="time" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="duration" className="text-sm font-medium">Duration (hours)</label>
                          <Input id="duration" type="number" min="0.5" step="0.5" placeholder="1.5" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="category" className="text-sm font-medium">Category</label>
                          <Input id="category" placeholder="e.g., Islamic Studies" />
                        </div>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={handleHostClass}
                      className="w-full bg-brand-yellow text-brand-dark hover:bg-yellow-500"
                    >
                      Schedule Class
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </TabsContent>
          </div>
        </section>
      )}

      {/* Call-to-Action */}
      {!isInClass && (
        <section className="py-12 bg-muted/30">
          <div className="container-custom">
            <div className="bg-card border border-border rounded-xl p-8 relative overflow-hidden">
              <FloralPattern className="opacity-10" />
              
              <div className="relative z-10 max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6 font-playfair">
                  Want to <span className="text-gradient">Share Your Knowledge</span>?
                </h2>
                
                <p className="text-lg text-muted-foreground mb-8">
                  If you're an expert in your field and would like to teach on our platform,
                  we'd love to hear from you. Apply to become an instructor today!
                </p>
                
                <Button 
                  asChild
                  size="lg"
                  className="bg-brand-yellow text-brand-dark hover:bg-yellow-500"
                >
                  <Link to="/become-instructor">Apply to Teach</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </motion.div>
  );
};

export default LiveClassPage;
