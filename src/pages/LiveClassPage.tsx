
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FloralPattern } from "@/components/FloralPattern";
import { 
  Calendar, 
  Clock, 
  Play, 
  MessageSquare, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Users, 
  Share, 
  X,
  InfoIcon,
  Settings,
  FileText,
  HandRaised
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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
  category?: string;
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

interface Participant {
  id: string;
  name: string;
  avatar?: string;
  isAudioOn: boolean;
  isVideoOn: boolean;
  isScreenSharing: boolean;
  isHandRaised: boolean;
}

const LiveClassPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isInClass, setIsInClass] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isAudioOn, setIsMicOn] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");

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
      coverImage: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&q=80&w=500",
      category: "Islamic Law"
    },
    {
      id: "2",
      title: "Pen Techniques for Arabic Calligraphy",
      instructor: "Fatima Zahra",
      date: "May 12, 2025",
      time: "2:00 PM",
      duration: "1.5 hours",
      coverImage: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&q=80&w=500",
      category: "Arts"
    },
    {
      id: "3",
      title: "Introduction to Tajweed Rules",
      instructor: "Aisha Rahman",
      date: "May 15, 2025",
      time: "9:00 AM",
      duration: "1.5 hours",
      coverImage: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&q=80&w=500",
      category: "Quran Studies"
    },
    {
      id: "4",
      title: "Contemporary Fiqh Issues",
      instructor: "Dr. Ahmad Hassan",
      date: "May 18, 2025",
      time: "11:00 AM",
      duration: "2 hours",
      coverImage: "https://images.unsplash.com/photo-1519818187420-8e49de7adeef?auto=format&fit=crop&q=80&w=500",
      category: "Islamic Law"
    },
    {
      id: "5",
      title: "Introduction to Islamic Finance",
      instructor: "Yusuf Khan",
      date: "May 20, 2025",
      time: "3:00 PM",
      duration: "1.5 hours",
      coverImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=500",
      category: "Finance"
    }
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Islamic Law", label: "Islamic Law" },
    { value: "Arts", label: "Arts" },
    { value: "Quran Studies", label: "Quran Studies" },
    { value: "Finance", label: "Finance" }
  ];

  const filteredClasses = filterCategory === "all" 
    ? upcomingClasses 
    : upcomingClasses.filter(cls => cls.category === filterCategory);

  const myClasses = [
    {
      id: "2",
      title: "Pen Techniques for Arabic Calligraphy",
      instructor: "Fatima Zahra",
      date: "May 12, 2025",
      time: "2:00 PM",
      duration: "1.5 hours",
      coverImage: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&q=80&w=500",
      category: "Arts"
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
    },
    {
      id: "4",
      user: {
        name: "Amina Mirza",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"
      },
      message: "Could you provide some examples of how these maxims are applied in modern context?",
      timestamp: "10:24 AM",
      isCurrentUser: false
    }
  ];

  const participants: Participant[] = [
    {
      id: "1",
      name: "Dr. Omar Farooq",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250",
      isAudioOn: true,
      isVideoOn: true,
      isScreenSharing: false,
      isHandRaised: false
    },
    {
      id: "2",
      name: "You",
      isAudioOn: isAudioOn,
      isVideoOn: isVideoOn,
      isScreenSharing: isScreenSharing,
      isHandRaised: isHandRaised
    },
    {
      id: "3",
      name: "Ahmad Khalid",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=250",
      isAudioOn: true,
      isVideoOn: false,
      isScreenSharing: false,
      isHandRaised: false
    },
    {
      id: "4",
      name: "Sarah Ahmed",
      avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=250",
      isAudioOn: true,
      isVideoOn: false,
      isScreenSharing: false,
      isHandRaised: true
    },
    {
      id: "5",
      name: "Amina Mirza",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
      isAudioOn: false,
      isVideoOn: false,
      isScreenSharing: false,
      isHandRaised: false
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
    setIsHandRaised(false);
    toast({
      title: "Left class",
      description: "You have successfully left the class",
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      const newMessage: ChatMessage = {
        id: `${chatMessages.length + 1}`,
        user: {
          name: "You"
        },
        message: chatMessage,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        isCurrentUser: true
      };

      // In a real app, this would send the message to a server
      toast({
        title: "Message sent",
        description: "Your message has been sent to the class",
      });
      setChatMessage("");
    }
  };

  const handleRaiseHand = () => {
    setIsHandRaised(!isHandRaised);
    toast({
      title: isHandRaised ? "Hand lowered" : "Hand raised",
      description: isHandRaised ? "You've lowered your hand" : "The instructor has been notified",
    });
  };

  const handleHostClass = () => {
    toast({
      title: "Host a class",
      description: "Your class has been scheduled successfully",
    });
    setActiveTab("upcoming");
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        toast({
          title: "Fullscreen error",
          description: `Error attempting to enable fullscreen: ${err.message}`,
          variant: "destructive",
        });
      });
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Setup keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only apply shortcuts when in class
      if (!isInClass) return;
      
      // Prevent shortcuts when typing in an input or textarea
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") return;
      
      if (e.key === "m") {
        setIsMicOn(prev => !prev);
      } else if (e.key === "v") {
        setIsVideoOn(prev => !prev);
      } else if (e.key === "h") {
        handleRaiseHand();
      } else if (e.ctrlKey && e.key === "f") {
        e.preventDefault();
        toggleFullscreen();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isInClass, isHandRaised]);

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
  
  const slideVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } }
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
              
              <div className="flex gap-2">
                {/* Class Controls */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={toggleFullscreen}
                      >
                        {isFullscreen ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minimize">
                            <path d="M8 3v4a1 1 0 0 1-1 1H3" />
                            <path d="M16 3v4a1 1 0 0 0 1 1h4" />
                            <path d="M8 21v-4a1 1 0 0 0-1-1H3" />
                            <path d="M16 21v-4a1 1 0 0 1 1-1h4" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-maximize">
                            <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                            <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                            <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                            <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                          </svg>
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {isFullscreen ? "Exit fullscreen (Ctrl+F)" : "Enter fullscreen (Ctrl+F)"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button size="sm" variant="outline">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-60">
                    <div className="space-y-3">
                      <h4 className="font-medium">Class Settings</h4>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="auto-mute">Auto mute new participants</Label>
                        <Switch id="auto-mute" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="hand-raising">Allow hand raising</Label>
                        <Switch id="hand-raising" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="chat">Enable chat</Label>
                        <Switch id="chat" defaultChecked />
                      </div>
                      <div className="pt-2">
                        <Select defaultValue="high">
                          <SelectTrigger>
                            <SelectValue placeholder="Video quality" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low quality</SelectItem>
                            <SelectItem value="medium">Medium quality</SelectItem>
                            <SelectItem value="high">High quality</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

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
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Video Area */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="overflow-hidden">
                  <div className="aspect-video bg-black/90 relative">
                    {/* Main video content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {isScreenSharing ? (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <div className="text-center">
                            <FileText className="h-16 w-16 mx-auto mb-4 text-brand-yellow" />
                            <h3 className="text-lg font-medium text-black">Screen sharing: {currentClass.title} presentation</h3>
                          </div>
                        </div>
                      ) : (
                        <img 
                          src={currentClass.instructor.avatar} 
                          alt={currentClass.instructor.name}
                          className="w-24 h-24 rounded-full object-cover border-4 border-brand-yellow/50"
                        />
                      )}
                    </div>
                    
                    {/* Participants video grid */}
                    <div className="absolute bottom-16 right-4 flex gap-2">
                      {participants.slice(0, 4).filter(p => p.id !== "1").map(participant => (
                        <div key={participant.id} className="w-32 h-24 bg-gray-800 rounded-md overflow-hidden relative">
                          {participant.isVideoOn ? (
                            <img 
                              src={participant.avatar} 
                              alt={participant.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-700">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={participant.avatar} alt={participant.name} />
                                <AvatarFallback className="bg-brand-yellow/20 text-brand-yellow">
                                  {participant.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                            </div>
                          )}
                          {participant.isHandRaised && (
                            <div className="absolute top-1 right-1 bg-brand-yellow rounded-full p-0.5">
                              <HandRaised className="h-3 w-3 text-brand-dark" />
                            </div>
                          )}
                          <div className="absolute bottom-1 left-1 right-1 flex justify-between items-center">
                            <span className="text-xs text-white truncate">{participant.name}</span>
                            <div className="flex gap-0.5">
                              {!participant.isAudioOn && <MicOff className="h-3 w-3 text-white" />}
                              {!participant.isVideoOn && <VideoOff className="h-3 w-3 text-white" />}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Control bar */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 flex justify-between">
                      <div className="flex items-center gap-3">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                size="sm" 
                                variant={isAudioOn ? "default" : "outline"}
                                className={isAudioOn ? "bg-brand-yellow text-brand-dark hover:bg-yellow-500" : ""}
                                onClick={() => setIsMicOn(!isAudioOn)}
                              >
                                {isAudioOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {isAudioOn ? "Turn off microphone (M)" : "Turn on microphone (M)"}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                size="sm" 
                                variant={isVideoOn ? "default" : "outline"}
                                className={isVideoOn ? "bg-brand-yellow text-brand-dark hover:bg-yellow-500" : ""}
                                onClick={() => setIsVideoOn(!isVideoOn)}
                              >
                                {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {isVideoOn ? "Turn off camera (V)" : "Turn on camera (V)"}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                size="sm" 
                                variant={isScreenSharing ? "default" : "outline"}
                                className={isScreenSharing ? "bg-brand-yellow text-brand-dark hover:bg-yellow-500" : ""}
                                onClick={() => setIsScreenSharing(!isScreenSharing)}
                              >
                                <Share className="h-4 w-4" />
                                <span className="ml-1 hidden sm:inline">{isScreenSharing ? "Stop" : "Share"}</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {isScreenSharing ? "Stop sharing screen" : "Share your screen"}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                size="sm" 
                                variant={isHandRaised ? "default" : "outline"}
                                className={isHandRaised ? "bg-brand-yellow text-brand-dark hover:bg-yellow-500" : ""}
                                onClick={handleRaiseHand}
                              >
                                <HandRaised className="h-4 w-4" />
                                <span className="ml-1 hidden md:inline">{isHandRaised ? "Lower" : "Raise"}</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {isHandRaised ? "Lower your hand (H)" : "Raise your hand (H)"}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => setIsParticipantsOpen(!isParticipantsOpen)}
                              >
                                <Users className="h-4 w-4" />
                                <span className="ml-1 hidden md:inline">Participants</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {isParticipantsOpen ? "Hide participants" : "Show participants"}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => setIsChatOpen(!isChatOpen)}
                              >
                                <MessageSquare className="h-4 w-4" />
                                <span className="ml-1 hidden md:inline">Chat</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {isChatOpen ? "Hide chat" : "Show chat"}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <span className="text-white text-sm bg-red-500/80 px-2 py-1 rounded-md">Live</span>
                      </div>
                    </div>
                  </div>
                </Card>
                
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Class Info */}
                  <Card className="flex-1">
                    <CardHeader>
                      <CardTitle>About This Class</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{currentClass.description}</p>
                      <h4 className="font-medium mb-2">Topics</h4>
                      <ul className="list-disc pl-5 text-sm text-muted-foreground">
                        {currentClass.topics.map((topic, index) => (
                          <li key={index}>{topic}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  
                  {/* Participants List (Shown when isParticipantsOpen is true) */}
                  {isParticipantsOpen && (
                    <Card className="flex-1">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>Participants ({participants.length})</span>
                          <Button variant="ghost" size="sm" onClick={() => setIsParticipantsOpen(false)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-[220px] pr-4">
                          <div className="space-y-2">
                            {participants.map(participant => (
                              <div key={participant.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={participant.avatar} alt={participant.name} />
                                    <AvatarFallback className="bg-brand-yellow/20 text-brand-yellow">
                                      {participant.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium">
                                    {participant.name}
                                    {participant.id === "1" && <span className="ml-2 text-xs bg-brand-yellow/20 text-brand-yellow px-1.5 py-0.5 rounded-full">Host</span>}
                                  </span>
                                </div>
                                <div className="flex gap-1.5">
                                  {!participant.isAudioOn && <MicOff className="h-4 w-4 text-muted-foreground" />}
                                  {!participant.isVideoOn && <VideoOff className="h-4 w-4 text-muted-foreground" />}
                                  {participant.isHandRaised && <HandRaised className="h-4 w-4 text-brand-yellow" />}
                                  {participant.isScreenSharing && <Share className="h-4 w-4 text-brand-yellow" />}
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              {/* Chat Area */}
              {isChatOpen && (
                <div>
                  <Card className="h-[600px] flex flex-col">
                    <CardHeader className="pb-3 flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">Class Chat</CardTitle>
                        <CardDescription>Interact with the instructor and other students</CardDescription>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsChatOpen(false)}>
                        <X className="h-4 w-4" />
                      </Button>
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
              )}
            </div>

            {/* Keyboard shortcuts card */}
            <div className="mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Keyboard Shortcuts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <kbd className="px-2 py-1 bg-muted rounded-md">M</kbd>
                      <span>Toggle microphone</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <kbd className="px-2 py-1 bg-muted rounded-md">V</kbd>
                      <span>Toggle video</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <kbd className="px-2 py-1 bg-muted rounded-md">H</kbd>
                      <span>Raise/lower hand</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <kbd className="px-2 py-1 bg-muted rounded-md">Ctrl+F</kbd>
                      <span>Toggle fullscreen</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
                <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
                  <h2 className="text-2xl font-bold font-playfair">Upcoming Classes</h2>
                  
                  <div className="flex gap-4 items-center">
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          Sort By <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 h-4 w-4"><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="M11 4h10"/><path d="M11 8h7"/><path d="M11 12h4"/></svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Date (Newest)</DropdownMenuItem>
                        <DropdownMenuItem>Date (Oldest)</DropdownMenuItem>
                        <DropdownMenuItem>Name (A-Z)</DropdownMenuItem>
                        <DropdownMenuItem>Duration (Shortest)</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredClasses.map((cls) => (
                    <motion.div key={cls.id} variants={itemVariants}>
                      <Card className="overflow-hidden h-full flex flex-col group">
                        <div className="h-40 relative overflow-hidden">
                          <img 
                            src={cls.coverImage} 
                            alt={cls.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                          <div className="absolute bottom-4 left-4 flex gap-2">
                            <Badge className="bg-brand-yellow text-brand-dark hover:bg-yellow-500">
                              Live Class
                            </Badge>
                            {cls.category && (
                              <Badge variant="outline" className="bg-black/30 text-white border-white/20">
                                {cls.category}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg group-hover:text-brand-yellow transition-colors">{cls.title}</CardTitle>
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hourglass text-brand-yellow"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></svg>
                            <span className="text-sm">Duration: {cls.duration}</span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            onClick={() => handleJoinClass(cls.id)} 
                            className="w-full bg-brand-yellow text-brand-dark hover:bg-yellow-500 transition-transform duration-200 hover:scale-105"
                          >
                            <Play className="h-4 w-4 mr-2" /> Join Class
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                
                {filteredClasses.length === 0 && (
                  <div className="text-center py-12">
                    <InfoIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">No classes found</h3>
                    <p className="text-muted-foreground mb-6">
                      We couldn't find any classes matching your criteria.
                    </p>
                    <Button
                      onClick={() => setFilterCategory("all")}
                      variant="outline"
                    >
                      View all classes
                    </Button>
                  </div>
                )}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="my-classes" className="mt-0">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <h2 className="text-2xl font-bold mb-6 font-playfair">My Classes</h2>
                
                {myClasses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myClasses.map((cls) => (
                      <motion.div key={cls.id} variants={itemVariants}>
                        <Card className="overflow-hidden h-full flex flex-col group">
                          <div className="h-40 relative overflow-hidden">
                            <img 
                              src={cls.coverImage} 
                              alt={cls.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                            <div className="absolute bottom-4 left-4">
                              <Badge className="bg-brand-yellow text-brand-dark hover:bg-yellow-500">
                                Enrolled
                              </Badge>
                            </div>
                          </div>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg group-hover:text-brand-yellow transition-colors">{cls.title}</CardTitle>
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
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hourglass text-brand-yellow"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></svg>
                              <span className="text-sm">Duration: {cls.duration}</span>
                            </div>
                          </CardContent>
                          <CardFooter className="flex gap-2">
                            <Button 
                              onClick={() => handleJoinClass(cls.id)} 
                              className="flex-1 bg-brand-yellow text-brand-dark hover:bg-yellow-500"
                            >
                              <Play className="h-4 w-4 mr-2" /> Join
                            </Button>
                            
                            <Button 
                              variant="outline"
                              className="flex-1"
                              asChild
                            >
                              <Link to="#" className="flex items-center gap-2">
                                <FileText className="h-4 w-4" /> Materials
                              </Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-muted-foreground"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    
                    <p className="text-muted-foreground mb-4">You haven't enrolled in any live classes yet.</p>
                    <Button 
                      asChild
                      className="bg-brand-yellow text-brand-dark hover:bg-yellow-500"
                    >
                      <Link to="/courses">Browse Courses</Link>
                    </Button>
                  </div>
                )}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="host" className="mt-0">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-3xl mx-auto"
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
                        <Label htmlFor="title">Class Title</Label>
                        <Input id="title" placeholder="Enter a clear title for your class" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea 
                          id="description" 
                          placeholder="Provide a detailed description of what your class will cover"
                          className="min-h-[100px]"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="date">Date</Label>
                          <Input id="date" type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="time">Time</Label>
                          <Input id="time" type="time" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="duration">Duration (hours)</Label>
                          <Input id="duration" type="number" min="0.5" step="0.5" placeholder="1.5" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select>
                            <SelectTrigger id="category">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.filter(c => c.value !== "all").map(category => (
                                <SelectItem key={category.value} value={category.value}>
                                  {category.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="topics">Topics (comma separated)</Label>
                        <Input id="topics" placeholder="Topic 1, Topic 2, Topic 3" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <span>Class Cover Image</span>
                          <span className="text-xs text-muted-foreground">(Optional)</span>
                        </Label>
                        <div className="flex items-center justify-center w-full">
                          <label htmlFor="cover-image" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg className="w-8 h-8 mb-3 text-muted-foreground" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                              </svg>
                              <p className="text-sm text-muted-foreground">
                                <span className="font-medium">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">PNG, JPG or WEBP (max. 2MB)</p>
                            </div>
                            <input id="cover-image" type="file" className="hidden" accept="image/*" />
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch id="advanced-options" />
                        <Label htmlFor="advanced-options">Show advanced options</Label>
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
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold mb-6 font-playfair"
                >
                  Want to <span className="text-gradient">Share Your Knowledge</span>?
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-lg text-muted-foreground mb-8"
                >
                  If you're an expert in your field and would like to teach on our platform,
                  we'd love to hear from you. Apply to become an instructor today!
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Button 
                    asChild
                    size="lg"
                    className="bg-brand-yellow text-brand-dark hover:bg-yellow-500"
                  >
                    <Link to="/become-instructor">Apply to Teach</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      )}
    </motion.div>
  );
};

export default LiveClassPage;
