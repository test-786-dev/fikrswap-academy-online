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
