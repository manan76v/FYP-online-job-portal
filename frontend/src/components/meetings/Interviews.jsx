import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Calendar, Clock, Link, MapPin, Video } from 'lucide-react';

// Temporary data for development
const tempInterviews = [
    {
        _id: '1',
        company: {
            name: 'Tech Corp',
            logo: 'https://ui-avatars.com/api/?name=TC&background=0D8ABC&color=fff'
        },
        jobTitle: 'Senior React Developer',
        interviewDate: '2025-01-15T14:00:00Z',
        duration: 60,
        type: 'Technical Interview',
        location: 'Google Meet',
        meetingLink: 'https://meet.google.com/abc-defg-hij',
        status: 'upcoming',
        interviewer: {
            name: 'John Smith',
            position: 'Tech Lead'
        },
        notes: 'Please prepare for system design and coding questions. Have your development environment ready.'
    },
    {
        _id: '2',
        company: {
            name: 'Innovation Labs',
            logo: 'https://ui-avatars.com/api/?name=IL&background=FF4154&color=fff'
        },
        jobTitle: 'Full Stack Developer',
        interviewDate: '2025-01-13T11:00:00Z',
        duration: 45,
        type: 'Initial Screening',
        location: 'Zoom',
        meetingLink: 'https://zoom.us/j/123456789',
        status: 'upcoming',
        interviewer: {
            name: 'Sarah Johnson',
            position: 'HR Manager'
        },
        notes: 'General discussion about your experience and career goals.'
    },
    {
        _id: '3',
        company: {
            name: 'Digital Solutions',
            logo: 'https://ui-avatars.com/api/?name=DS&background=22C55E&color=fff'
        },
        jobTitle: 'Frontend Engineer',
        interviewDate: '2025-01-11T15:30:00Z',
        duration: 90,
        type: 'Final Round',
        location: 'Microsoft Teams',
        meetingLink: 'https://teams.microsoft.com/meet/123',
        status: 'completed',
        interviewer: {
            name: 'Michael Chen',
            position: 'Engineering Manager'
        },
        notes: 'Final interview with the team lead and engineering manager.'
    },
    {
        _id: '4',
        company: {
            name: 'Cloud Systems',
            logo: 'https://ui-avatars.com/api/?name=CS&background=6366F1&color=fff'
        },
        jobTitle: 'Backend Developer',
        interviewDate: '2025-01-09T10:00:00Z',
        duration: 60,
        type: 'Technical Round',
        location: 'Skype',
        meetingLink: 'https://skype.com/123456',
        status: 'completed',
        interviewer: {
            name: 'Emily Wilson',
            position: 'Senior Developer'
        },
        notes: 'Focus on backend architecture and database design.'
    }
];

const Interviews = () => {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call with temporary data
        const loadTempData = () => {
            setTimeout(() => {
                setInterviews(tempInterviews);
                setLoading(false);
            }, 1000); // Simulate network delay
        };

        loadTempData();
    }, []);

    const getStatusBadge = (status) => {
        const statusStyles = {
            'upcoming': 'bg-blue-100 text-blue-800',
            'completed': 'bg-green-100 text-green-800',
            'cancelled': 'bg-red-100 text-red-800'
        };

        return (
            <Badge className={statusStyles[status] || 'bg-gray-100 text-gray-800'}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
        );
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto py-8 px-4">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-8 px-4">
            <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Interviews</h1>
                        <Badge variant="outline">
                            Total: {interviews.length}
                        </Badge>
                    </div>

                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Company</TableHead>
                                    <TableHead>Position</TableHead>
                                    <TableHead>Date & Time</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Interviewer</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {!interviews.length ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-8">
                                            <div className="flex flex-col items-center gap-2">
                                                <p className="text-gray-500">No interviews scheduled</p>
                                                <p className="text-sm text-gray-400">
                                                    Your upcoming interviews will appear here
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    interviews.map((interview) => (
                                        <TableRow key={interview._id} className="hover:bg-gray-50">
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src={interview.company.logo}
                                                        alt={interview.company.name}
                                                        className="w-8 h-8 rounded-full"
                                                    />
                                                    <span className="font-medium">{interview.company.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{interview.jobTitle}</TableCell>
                                            <TableCell>
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-1 text-sm">
                                                        <Calendar className="w-4 h-4" />
                                                        {formatDate(interview.interviewDate)}
                                                    </div>
                                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                                        <Clock className="w-4 h-4" />
                                                        {formatTime(interview.interviewDate)} ({interview.duration} mins)
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Video className="w-4 h-4" />
                                                    <span>{interview.type}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span>{interview.interviewer.name}</span>
                                                    <span className="text-sm text-gray-500">{interview.interviewer.position}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(interview.status)}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    {interview.status === 'upcoming' && (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => window.open(interview.meetingLink, '_blank')}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <Link className="w-4 h-4" />
                                                            Join
                                                        </Button>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {interviews.length > 0 && (
                        <div className="mt-4 text-sm text-gray-500 text-right">
                            Showing {interviews.length} interview{interviews.length !== 1 ? 's' : ''}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Interviews;
