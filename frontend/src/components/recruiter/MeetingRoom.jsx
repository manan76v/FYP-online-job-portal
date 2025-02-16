import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Mic, MicOff, Video, VideoOff, MonitorPlay,
  MessageSquare, Settings, Users, X, User,
  Hand, Share2, MoreVertical, Phone, Shield,
  Clock, ChevronRight, Send, Smile
} from 'lucide-react';

const MeetingRoom = ({ isOpen, onClose, interview }) => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [isRaisingHand, setIsRaisingHand] = useState(false);
  const [participantCount, setParticipantCount] = useState(2);
  const [chatMessage, setChatMessage] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleVideo = () => setIsVideoOn(!isVideoOn);
  const toggleAudio = () => setIsAudioOn(!isAudioOn);
  const toggleScreenShare = () => setIsScreenSharing(!isScreenSharing);
  const toggleChat = () => setShowChat(!showChat);
  const toggleRaiseHand = () => setIsRaisingHand(!isRaisingHand);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] h-[95vh] p-0 bg-[#0A0F1E] text-white border-none">
        <div className="flex flex-col h-full relative">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-[#1A1F2E]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <h2 className="text-lg font-semibold">Interview with {interview?.candidate?.name}</h2>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{formatTime(elapsedTime)}</span>
                <Badge variant="outline" className="bg-[#2A2F3E] border-none">
                  {interview?.type}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-[#2A2F3E] px-3 py-1.5 rounded-full">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-sm">Secure Meeting</span>
              </div>
              <div className="flex items-center gap-2 bg-[#2A2F3E] px-3 py-1.5 rounded-full">
                <Users className="w-4 h-4" />
                <span className="text-sm">{participantCount} Participants</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-gray-400 hover:text-white"
                onClick={onClose}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Video Grid */}
          <div className="flex-1 grid grid-cols-2 gap-4 p-4">
            {/* Candidate Video */}
            <div className="relative rounded-xl overflow-hidden bg-[#2A2F3E] aspect-video">
              <img
                src={interview?.candidate?.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                alt={interview?.candidate?.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-lg">
                <span className="text-sm">{interview?.candidate?.name}</span>
              </div>
            </div>

            {/* Your Video */}
            <div className="relative rounded-xl overflow-hidden bg-[#2A2F3E] aspect-video flex items-center justify-center">
              {isVideoOn ? (
                <div className="w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
              ) : (
                <div className="text-center">
                  <VideoOff className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <span className="text-sm text-gray-400">Camera is off</span>
                </div>
              )}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-lg">
                <span className="text-sm">You</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="p-4 bg-[#1A1F2E] flex items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="lg"
              className={cn(
                "rounded-full p-4 hover:bg-[#2A2F3E]",
                !isAudioOn && "bg-red-500/20 text-red-500"
              )}
              onClick={toggleAudio}
            >
              {isAudioOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className={cn(
                "rounded-full p-4 hover:bg-[#2A2F3E]",
                !isVideoOn && "bg-red-500/20 text-red-500"
              )}
              onClick={toggleVideo}
            >
              {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="rounded-full p-4 hover:bg-[#2A2F3E]"
              onClick={toggleScreenShare}
            >
              <MonitorPlay className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className={cn(
                "rounded-full p-4 hover:bg-[#2A2F3E]",
                showChat && "bg-blue-500/20 text-blue-500"
              )}
              onClick={toggleChat}
            >
              <MessageSquare className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className={cn(
                "rounded-full p-4 hover:bg-[#2A2F3E]",
                isRaisingHand && "bg-yellow-500/20 text-yellow-500"
              )}
              onClick={toggleRaiseHand}
            >
              <Hand className="w-6 h-6" />
            </Button>
            <Button
              variant="destructive"
              size="lg"
              className="rounded-full px-6 bg-red-500 hover:bg-red-600"
              onClick={onClose}
            >
              <Phone className="w-6 h-6 rotate-[135deg]" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingRoom;
