import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table';
import { Badge } from '../ui/badge';

// Temporary data for development
const tempAppliedJobs = [
    {
        _id: '1',
        appliedDate: '2025-01-10T10:00:00Z',
        jobTitle: 'Senior React Developer',
        company: {
            name: 'Tech Corp',
            logo: 'https://ui-avatars.com/api/?name=TC&background=0D8ABC&color=fff'
        },
        location: 'New York, NY',
        salaryMin: 120000,
        salaryMax: 160000,
        status: 'pending',
        updatedAt: '2025-01-11T15:30:00Z'
    },
    {
        _id: '2',
        appliedDate: '2025-01-08T09:00:00Z',
        jobTitle: 'Full Stack Developer',
        company: {
            name: 'Innovation Labs',
            logo: 'https://ui-avatars.com/api/?name=IL&background=FF4154&color=fff'
        },
        location: 'Remote',
        salaryMin: 100000,
        salaryMax: 140000,
        status: 'interviewing',
        updatedAt: '2025-01-12T11:00:00Z'
    },
    {
        _id: '3',
        appliedDate: '2025-01-05T14:00:00Z',
        jobTitle: 'Frontend Engineer',
        company: {
            name: 'Digital Solutions',
            logo: 'https://ui-avatars.com/api/?name=DS&background=22C55E&color=fff'
        },
        location: 'San Francisco, CA',
        salaryMin: 110000,
        salaryMax: 150000,
        status: 'accepted',
        updatedAt: '2025-01-09T16:45:00Z'
    },
    {
        _id: '4',
        appliedDate: '2025-01-03T11:30:00Z',
        jobTitle: 'Backend Developer',
        company: {
            name: 'Cloud Systems',
            logo: 'https://ui-avatars.com/api/?name=CS&background=6366F1&color=fff'
        },
        location: 'Austin, TX',
        salaryMin: 95000,
        salaryMax: 135000,
        status: 'rejected',
        updatedAt: '2025-01-07T09:15:00Z'
    }
];

const AppliedJobs = () => {
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        // Simulate API call with temporary data
        const loadTempData = () => {
            setTimeout(() => {
                setAppliedJobs(tempAppliedJobs);
                setLoading(false);
            }, 1000); // Simulate network delay
        };

        loadTempData();
    }, []);

    const getStatusBadge = (status) => {
        if (!status) return null;
        
        const statusStyles = {
            'pending': 'bg-yellow-100 text-yellow-800',
            'accepted': 'bg-green-100 text-green-800',
            'rejected': 'bg-red-100 text-red-800',
            'interviewing': 'bg-blue-100 text-blue-800'
        };

        return (
            <Badge className={statusStyles[status.toLowerCase()] || 'bg-gray-100 text-gray-800'}>
                {status.toUpperCase()}
            </Badge>
        );
    };

    const formatDate = (date) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getTimeSince = (date) => {
        if (!date) return 'N/A';
        
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60
        };

        for (const [unit, secondsInUnit] of Object.entries(intervals)) {
            const interval = Math.floor(seconds / secondsInUnit);
            if (interval >= 1) {
                return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
            }
        }
        return 'just now';
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
                        <h1 className="text-2xl font-bold">Applied Jobs</h1>
                        <Badge variant="outline">
                            Total Applications: {appliedJobs?.length || 0}
                        </Badge>
                    </div>

                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date Applied</TableHead>
                                    <TableHead>Job Title</TableHead>
                                    <TableHead>Company</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Salary Range</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Last Updated</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {!appliedJobs?.length ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-8">
                                            <div className="flex flex-col items-center gap-2">
                                                <p className="text-gray-500">No job applications yet</p>
                                                <p className="text-sm text-gray-400">
                                                    Start applying to jobs to see them listed here
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    appliedJobs.map((job) => (
                                        <TableRow key={job._id} className="hover:bg-gray-50">
                                            <TableCell>
                                                {formatDate(job.appliedDate)}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {job.jobTitle}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    {job.company?.logo && (
                                                        <img
                                                            src={job.company.logo}
                                                            alt={job.company.name}
                                                            className="w-6 h-6 rounded-full"
                                                        />
                                                    )}
                                                    {job.company?.name}
                                                </div>
                                            </TableCell>
                                            <TableCell>{job.location}</TableCell>
                                            <TableCell>
                                                ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(job.status)}
                                            </TableCell>
                                            <TableCell className="text-gray-500">
                                                {getTimeSince(job.updatedAt)}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {appliedJobs?.length > 0 && (
                        <div className="mt-4 text-sm text-gray-500 text-right">
                            Showing {appliedJobs.length} application{appliedJobs.length !== 1 ? 's' : ''}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AppliedJobs;
