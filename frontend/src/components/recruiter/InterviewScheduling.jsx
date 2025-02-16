import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Clock, 
  Plus, 
  ChevronRight,
  Search,
  Briefcase,
  CheckCircle2,
  Clock4,
  XCircle,
  Calendar,
  ArrowRight,
  Building2,
  CalendarDays,
  Code,
  Layout,
  Mail,
  Video,
  VideoOff,
  Mic,
  MicOff,
  Settings,
  Users,
  MonitorPlay,
  MessageSquare,
  MoreVertical,
  MapPin,
  Minimize2,
  Maximize2,
  ClipboardCheck,
  Star,
  Filter
} from 'lucide-react';
import MeetingRoom from './MeetingRoom';

const InterviewScheduling = ({ currentView: initialView }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("upcoming");
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [participantCount, setParticipantCount] = useState(2);
  const [screenSize, setScreenSize] = useState("full"); // full, compact
  const [showMarksSheet, setShowMarksSheet] = useState(false);
  const [marks, setMarks] = useState({
    communication: 0,
    technicalSkills: 0,
    problemSolving: 0,
    teamwork: 0,
    overall: 0
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState(initialView || 'schedule'); // 'schedule' or 'evaluations'
  const [evaluations, setEvaluations] = useState([
    {
      id: 1,
      candidate: {
        name: "Zain Ahmed",
        position: "Full Stack Developer",
        email: "zain.ahmed@gmail.com",
        image: "https://i.pravatar.cc/150?img=11"
      },
      date: "2024-01-15",
      ratings: {
        communication: 4,
        technicalSkills: 5,
        problemSolving: 4,
        teamwork: 5,
        overall: 4.5
      },
      status: "Passed"
    },
    {
      id: 2,
      candidate: {
        name: "Sarah Wilson",
        position: "UI/UX Designer",
        email: "sarah.w@gmail.com",
        image: "https://i.pravatar.cc/150?img=4"
      },
      date: "2024-01-14",
      ratings: {
        communication: 5,
        technicalSkills: 4,
        problemSolving: 4,
        teamwork: 5,
        overall: 4.5
      },
      status: "Passed"
    }
  ]);

  const stats = [
    { label: "Today's Interviews", value: "8", icon: <CalendarDays /> },
    { label: "Total Candidates", value: "45", icon: <Users /> },
    { label: "Completed", value: "32", icon: <CheckCircle2 /> },
  ];

  const [interviews, setInterviews] = useState({
    upcoming: [
      {
        id: 1,
        candidate: {
          name: "John Doe",
          role: "Senior Frontend Developer",
          email: "john.doe@example.com",
          location: "New York, USA",
          image: "https://i.pravatar.cc/150?img=1"
        },
        time: "10:00 AM",
        date: "Today",
        type: "Technical Interview",
        status: "upcoming"
      },
      {
        id: 2,
        candidate: {
          name: "Jane Smith",
          role: "Full Stack Developer",
          email: "jane.smith@example.com",
          location: "London, UK",
          image: "https://i.pravatar.cc/150?img=2"
        },
        time: "2:30 PM",
        date: "Tomorrow",
        type: "HR Interview",
        status: "upcoming"
      },
      {
        id: 3,
        candidate: {
          name: "Alex Johnson",
          role: "UI/UX Designer",
          email: "alex.j@example.com",
          location: "San Francisco, USA",
          image: "https://i.pravatar.cc/150?img=3"
        },
        time: "11:30 AM",
        date: "Tomorrow",
        type: "Design Interview",
        status: "upcoming"
      },
      {
        id: 4,
        candidate: {
          name: "Sarah Wilson",
          role: "Backend Developer",
          email: "sarah.w@example.com",
          location: "Toronto, Canada",
          image: "https://i.pravatar.cc/150?img=4"
        },
        time: "3:00 PM",
        date: "Jan 18, 2025",
        type: "Technical Interview",
        status: "upcoming"
      }
    ],
    completed: [
      {
        id: 5,
        candidate: {
          name: "Mike Brown",
          role: "DevOps Engineer",
          email: "mike.b@example.com",
          location: "Berlin, Germany",
          image: "https://i.pravatar.cc/150?img=5"
        },
        time: "2:00 PM",
        date: "Jan 15, 2025",
        type: "Technical Interview",
        status: "completed"
      }
    ],
    cancelled: []
  });

  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [newInterview, setNewInterview] = useState({
    candidateName: '',
    position: '',
    date: '',
    time: '',
    email: '',
    location: ''
  });

  const getStatusConfig = (status) => {
    const configs = {
      upcoming: {
        icon: <Clock4 className="w-4 h-4 text-blue-600" />,
        gradient: 'from-blue-500/20 via-indigo-500/20 to-purple-500/20',
        text: 'text-blue-600',
        border: 'border-blue-100'
      },
      completed: {
        icon: <CheckCircle2 className="w-4 h-4 text-green-600" />,
        gradient: 'from-green-500/20 via-emerald-500/20 to-teal-500/20',
        text: 'text-green-600',
        border: 'border-green-100'
      },
      cancelled: {
        icon: <XCircle className="w-4 h-4 text-red-600" />,
        gradient: 'from-red-500/20 via-rose-500/20 to-pink-500/20',
        text: 'text-red-600',
        border: 'border-red-100'
      }
    };
    return configs[status] || configs.upcoming;
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const joinMeeting = (interview) => {
    setSelectedInterview(interview);
  };

  const handleCloseMeeting = () => {
    setSelectedInterview(null);
  };

  const handleScreenSize = () => {
    setScreenSize(screenSize === "full" ? "compact" : "full");
  };

  const closeMeeting = () => {
    setSelectedInterview(null);
    setTimeout(() => {
      setShowMarksSheet(true);
    }, 2000);
  };

  const updateMarks = (category, value) => {
    setMarks(prev => {
      const newMarks = { ...prev, [category]: value };
      // Calculate overall score (average of all categories)
      const categories = ['communication', 'technicalSkills', 'problemSolving', 'teamwork'];
      const overall = Math.round(
        categories.reduce((sum, cat) => sum + (cat === category ? value : newMarks[cat]), 0) / categories.length
      );
      return { ...newMarks, overall };
    });
  };

  const StarRating = ({ value, onChange }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onChange(star)}
            className={`p-1 rounded-full hover:bg-purple-100 transition-colors ${
              star <= value ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            <Star className={`w-6 h-6 ${star <= value ? 'fill-current' : ''}`} />
          </button>
        ))}
      </div>
    );
  };

  const EvaluationsView = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Interview Evaluations</h1>
          <p className="text-gray-500 mt-1">Track and manage candidate evaluations</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          New Evaluation
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Evaluations",
            value: "128",
            change: "+12",
            changeText: "from last month",
            color: "bg-blue-500"
          },
          {
            title: "Pass Rate",
            value: "75%",
            change: "+5%",
            changeText: "from last month",
            color: "bg-green-500"
          },
          {
            title: "Average Score",
            value: "4.2",
            change: "+0.3",
            changeText: "from last month",
            color: "bg-purple-500"
          },
          {
            title: "Pending Reviews",
            value: "12",
            change: "-3",
            changeText: "from last week",
            color: "bg-yellow-500"
          }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg ${stat.color} bg-opacity-10 flex items-center justify-center`}>
                <span className={`text-lg ${stat.color} text-opacity-100`}>{stat.change}</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">{stat.changeText}</p>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search candidates..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      {/* Evaluations Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Communication</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Technical</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Problem Solving</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overall</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {evaluations.map((evaluation) => (
                <tr 
                  key={evaluation.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={evaluation.candidate.image}
                        alt={evaluation.candidate.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{evaluation.candidate.name}</p>
                        <p className="text-sm text-gray-500">{evaluation.candidate.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{evaluation.candidate.position}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{evaluation.date}</td>
                  <td className="px-6 py-4">{evaluation.ratings.communication}</td>
                  <td className="px-6 py-4">{evaluation.ratings.technicalSkills}</td>
                  <td className="px-6 py-4">{evaluation.ratings.problemSolving}</td>
                  <td className="px-6 py-4">{evaluation.ratings.overall.toFixed(1)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      evaluation.status === "Passed"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {evaluation.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/admin/evaluations') {
      setCurrentView('evaluations');
    } else {
      setCurrentView('schedule');
    }
  }, []);

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    // Add video toggle logic here
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
    // Add audio toggle logic here
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    // Add screen sharing logic here
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const leaveMeeting = () => {
    setSelectedInterview(null);
    // Add any cleanup logic here
  };

  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleEndInterview = () => {
    setIsEvaluating(true);
  };

  const handleScheduleInterview = () => {
    setShowScheduleForm(true);
  };

  const handleSubmitSchedule = () => {
    const newId = interviews.upcoming.length + 1;
    const newInterviewData = {
      id: newId,
      candidate: {
        name: newInterview.candidateName,
        role: newInterview.position,
        email: newInterview.email,
        location: newInterview.location,
        image: `https://i.pravatar.cc/150?img=${newId + 5}`
      },
      time: newInterview.time,
      date: newInterview.date,
      type: "Technical Interview",
      status: "upcoming"
    };

    setInterviews(prev => ({
      ...prev,
      upcoming: [...prev.upcoming, newInterviewData]
    }));
    setShowScheduleForm(false);
    setNewInterview({
      candidateName: '',
      position: '',
      date: '',
      time: '',
      email: '',
      location: ''
    });
  };

  const handleEvaluationSubmit = () => {
    const overall = (marks.communication + marks.technicalSkills + marks.problemSolving + marks.teamwork) / 4;
    
    // Create new evaluation object
    const newEvaluation = {
      id: Date.now(),
      candidate: {
        name: selectedInterview?.candidate?.name || "John Doe",
        position: selectedInterview?.candidate?.role || "Technical Interview",
        email: selectedInterview?.candidate?.email || "john@example.com",
        image: selectedInterview?.candidate?.image || "https://i.pravatar.cc/150"
      },
      date: new Date().toISOString().split('T')[0],
      ratings: {
        communication: marks.communication,
        technicalSkills: marks.technicalSkills,
        problemSolving: marks.problemSolving,
        teamwork: marks.teamwork,
        overall: overall
      },
      status: overall >= 3.5 ? "Passed" : "Failed"
    };

    // Add to evaluations list
    setEvaluations(prev => [newEvaluation, ...prev]);
    
    // Reset form and close
    setMarks({
      communication: 0,
      technicalSkills: 0,
      problemSolving: 0,
      teamwork: 0,
      overall: 0
    });
    setIsEvaluating(false);
    setSelectedInterview(null);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-50 via-gray-100 to-gray-200">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {currentView === 'evaluations' ? (
          <EvaluationsView />
        ) : (
          <div>
            {/* Header Section */}
            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8"
              >
                <div>
                  <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                    Interview Schedule
                  </h1>
                  <p className="text-gray-500 mt-2">Streamline your interview process</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-30 group-hover:opacity-40 transition duration-300"></div>
                    <Input
                      placeholder="Search interviews..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>

                  <Button
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                    onClick={handleScheduleInterview}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Schedule Interview
                  </Button>
                </div>
              </motion.div>

              {/* Stats Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/30 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">{stat.label}</p>
                        <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mt-1">
                          {stat.value}
                        </p>
                      </div>
                      <div className={`w-12 h-12 rounded-lg ${stat.color} bg-opacity-10 flex items-center justify-center`}>
                        <span className={`text-lg ${stat.color} text-opacity-100`}>{stat.change}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Main Content */}
            <div className="bg-white/40 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl overflow-hidden">
              <Tabs 
                defaultValue="upcoming" 
                className="w-full"
                onValueChange={setSelectedTab}
              >
                <div className="border-b border-gray-200/50">
                  <TabsList className="w-full justify-start p-2 bg-transparent">
                    {Object.keys(interviews).map((status) => (
                      <TabsTrigger
                        key={status}
                        value={status}
                        className={`
                          px-6 py-2 rounded-lg transition-all duration-300
                          data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/10 data-[state=active]:to-blue-600/10
                          data-[state=active]:text-purple-700 data-[state=active]:shadow-sm
                        `}
                      >
                        <span className="capitalize">{status}</span>
                        <span className="ml-2 bg-gray-100 px-2 py-0.5 rounded-full text-xs">
                          {interviews[status].length}
                        </span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                <AnimatePresence mode="sync">
                  {Object.entries(interviews).map(([status, items]) => (
                    <TabsContent key={status} value={status} className="p-6">
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={{
                          hidden: { opacity: 0 },
                          visible: {
                            opacity: 1,
                            transition: {
                              staggerChildren: 0.1
                            }
                          }
                        }}
                        className="space-y-4"
                      >
                        {items.map((interview, index) => (
                          <motion.div
                            key={interview.id}
                            variants={cardVariants}
                            transition={{ duration: 0.3 }}
                          >
                            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-white/20 bg-white/50 backdrop-blur-sm group">
                              <CardContent className="p-6">
                                <div className="flex items-start justify-between gap-6">
                                  <div className="flex items-start space-x-4">
                                    <motion.div whileHover={{ scale: 1.05 }}>
                                      <Avatar className="h-14 w-14 ring-2 ring-white/50 shadow-lg">
                                        <AvatarImage src={interview.candidate.image} />
                                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                                          {interview.candidate.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                      </Avatar>
                                    </motion.div>
                                    <div>
                                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                                        {interview.candidate.name}
                                      </h3>
                                      <p className="text-sm text-gray-500">{interview.candidate.role}</p>
                                      <div className="flex items-center gap-4 mt-3">
                                        <div className="flex items-center text-xs text-gray-500">
                                          <Mail className="w-3 h-3 mr-1" />
                                          {interview.candidate.email}
                                        </div>
                                        <div className="flex items-center text-xs text-gray-500">
                                          <MapPin className="w-3 h-3 mr-1" />
                                          {interview.candidate.location}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-4">
                                    <div className="text-right">
                                      <div className="text-sm font-medium text-gray-900">{interview.time}</div>
                                      <div className="text-xs text-gray-500">{interview.date}</div>
                                      <div className="flex items-center justify-end mt-2 text-xs text-gray-500">
                                        <Briefcase className="w-3 h-3 mr-1" />
                                        {interview.type}
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                      <Badge 
                                        className={`
                                          px-3 py-1 rounded-full flex items-center gap-1.5 whitespace-nowrap
                                          ${interview.status === 'upcoming' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                                            interview.status === 'completed' ? 'bg-green-50 text-green-600 border-green-100' :
                                            'bg-red-50 text-red-600 border-red-100'}
                                        `}
                                      >
                                        {getStatusConfig(interview.status).icon}
                                        <span className="capitalize">{interview.status}</span>
                                      </Badge>

                                      {interview.status === 'upcoming' && (
                                        <motion.button
                                          whileHover={{ scale: 1.05 }}
                                          whileTap={{ scale: 0.95 }}
                                          onClick={() => joinMeeting(interview)}
                                          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors whitespace-nowrap"
                                        >
                                          Join
                                          <ArrowRight className="w-4 h-4" />
                                        </motion.button>
                                      )}

                                      <Button 
                                        variant="ghost" 
                                        size="icon"
                                        className="text-gray-400 hover:text-gray-600"
                                      >
                                        <MoreVertical className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}

                        {items.length === 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-12"
                          >
                            <Calendar className="w-12 h-12 mx-auto text-gray-400" />
                            <h3 className="mt-4 text-lg font-medium text-gray-900">No {status} interviews</h3>
                            <p className="mt-2 text-gray-500">
                              {status === 'upcoming' ? 'Schedule a new interview to get started' : 'Check back later'}
                            </p>
                          </motion.div>
                        )}
                      </motion.div>
                    </TabsContent>
                  ))}
                </AnimatePresence>
              </Tabs>
            </div>
          </div>
        )}
      </div>

      {selectedInterview && !isEvaluating && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-4xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Interview Room</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsVideoOn(!isVideoOn)}
                >
                  {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsAudioOn(!isAudioOn)}
                >
                  {isAudioOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                </Button>
                <Button
                  className="bg-red-500 hover:bg-red-600 text-white"
                  onClick={handleEndInterview}
                >
                  End Interview
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 rounded-lg aspect-video"></div>
              <div className="bg-gray-800 rounded-lg aspect-video"></div>
            </div>
          </div>
        </div>
      )}

      {isEvaluating && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-[600px]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Interview Evaluation
              </h2>
            </div>
            
            <div className="space-y-6">
              {/* Communication Skills */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <label className="block mb-3 font-medium text-gray-700">Communication Skills</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <Button
                      key={num}
                      variant={marks.communication === num ? "default" : "outline"}
                      className={`flex-1 h-12 ${
                        marks.communication === num 
                          ? "bg-purple-600 hover:bg-purple-700" 
                          : "hover:border-purple-300"
                      }`}
                      onClick={() => setMarks(prev => ({...prev, communication: num}))}
                    >
                      {num}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Technical Skills */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <label className="block mb-3 font-medium text-gray-700">Technical Skills</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <Button
                      key={num}
                      variant={marks.technicalSkills === num ? "default" : "outline"}
                      className={`flex-1 h-12 ${
                        marks.technicalSkills === num 
                          ? "bg-purple-600 hover:bg-purple-700" 
                          : "hover:border-purple-300"
                      }`}
                      onClick={() => setMarks(prev => ({...prev, technicalSkills: num}))}
                    >
                      {num}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Problem Solving */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <label className="block mb-3 font-medium text-gray-700">Problem Solving</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <Button
                      key={num}
                      variant={marks.problemSolving === num ? "default" : "outline"}
                      className={`flex-1 h-12 ${
                        marks.problemSolving === num 
                          ? "bg-purple-600 hover:bg-purple-700" 
                          : "hover:border-purple-300"
                      }`}
                      onClick={() => setMarks(prev => ({...prev, problemSolving: num}))}
                    >
                      {num}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Teamwork */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <label className="block mb-3 font-medium text-gray-700">Teamwork</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <Button
                      key={num}
                      variant={marks.teamwork === num ? "default" : "outline"}
                      className={`flex-1 h-12 ${
                        marks.teamwork === num 
                          ? "bg-purple-600 hover:bg-purple-700" 
                          : "hover:border-purple-300"
                      }`}
                      onClick={() => setMarks(prev => ({...prev, teamwork: num}))}
                    >
                      {num}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Overall Score Preview */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Overall Score</h3>
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {((marks.communication + marks.technicalSkills + marks.problemSolving + marks.teamwork) / 4).toFixed(1)}/5
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleEvaluationSubmit}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 h-12 text-lg font-medium"
                >
                  Submit Evaluation
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setIsEvaluating(false);
                    setSelectedInterview(null);
                  }}
                  className="flex-1 h-12 text-lg font-medium"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Interview Form */}
      {showScheduleForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-full max-w-[500px] shadow-xl">
            <div className="mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Schedule New Interview
              </h2>
              <p className="text-gray-500 mt-1">Fill in the candidate details</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Candidate Name</label>
                <Input
                  value={newInterview.candidateName}
                  onChange={(e) => setNewInterview(prev => ({ ...prev, candidateName: e.target.value }))}
                  className="w-full"
                  placeholder="Enter candidate name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <Input
                  value={newInterview.position}
                  onChange={(e) => setNewInterview(prev => ({ ...prev, position: e.target.value }))}
                  className="w-full"
                  placeholder="Enter position"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input
                  value={newInterview.email}
                  onChange={(e) => setNewInterview(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full"
                  type="email"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <Input
                  value={newInterview.location}
                  onChange={(e) => setNewInterview(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full"
                  placeholder="Enter location"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <Input
                    value={newInterview.date}
                    onChange={(e) => setNewInterview(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full"
                    type="date"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <Input
                    value={newInterview.time}
                    onChange={(e) => setNewInterview(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full"
                    type="time"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  onClick={handleSubmitSchedule}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                >
                  Schedule Interview
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowScheduleForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewScheduling;
