import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { 
  Briefcase, 
  Users, 
  Calendar,
  TrendingUp,
  Building,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { useNavigate } from 'react-router-dom';

const RecruiterDashboard = () => {
  const [stats, setStats] = useState({
    totalJobs: 4,
    totalCompanies: 5,
    totalApplications: 0,
    totalInterviews: 0,
    recentApplications: [
      {
        _id: '1',
        candidate: {
          name: 'John Doe',
        },
        job: {
          title: 'Senior Frontend Developer'
        },
        createdAt: '2025-01-10T10:00:00'
      },
      {
        _id: '2',
        candidate: {
          name: 'Jane Smith',
        },
        job: {
          title: 'UI/UX Designer'
        },
        createdAt: '2025-01-09T15:30:00'
      },
      {
        _id: '3',
        candidate: {
          name: 'Mike Johnson',
        },
        job: {
          title: 'Backend Developer'
        },
        createdAt: '2025-01-08T09:15:00'
      }
    ],
    upcomingInterviews: [
      {
        _id: '1',
        candidate: {
          name: 'Sarah Wilson',
        },
        job: {
          title: 'Senior Frontend Developer'
        },
        scheduledAt: '2025-01-12T14:00:00'
      },
      {
        _id: '2',
        candidate: {
          name: 'David Brown',
        },
        job: {
          title: 'UI/UX Designer'
        },
        scheduledAt: '2025-01-13T11:30:00'
      },
      {
        _id: '3',
        candidate: {
          name: 'Emily Davis',
        },
        job: {
          title: 'Backend Developer'
        },
        scheduledAt: '2025-01-14T15:45:00'
      }
    ]
  });

  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // Mock data update without API call for now
    setStats(prevStats => ({
      ...prevStats,
      totalJobs: 4,
      totalCompanies: 5,
      totalApplications: prevStats.recentApplications.length,
      totalInterviews: prevStats.upcomingInterviews.length
    }));
  }, []);

  const statCards = [
    {
      title: 'Total Jobs Posted',
      value: stats.totalJobs,
      icon: Briefcase,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Companies Created',
      value: stats.totalCompanies,
      icon: Building,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Total Applications',
      value: stats.totalApplications,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Scheduled Interviews',
      value: stats.totalInterviews,
      icon: Calendar,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Recruiter Dashboard</h1>
        <div className="flex gap-4">
          <Button 
            onClick={() => navigate('/admin/create-company')}
            className="flex items-center gap-2"
          >
            <Building className="w-4 h-4" />
            Add Company
          </Button>
          <Button 
            onClick={() => navigate('/admin/post-job')}
            className="flex items-center gap-2"
          >
            <Briefcase className="w-4 h-4" />
            Post New Job
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className={`rounded-full w-12 h-12 ${stat.bgColor} ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <h3 className="text-gray-600 text-sm">{stat.title}</h3>
            <p className="text-2xl font-bold mt-2">{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Recent Applications
          </h2>
          <div className="space-y-4">
            {stats.recentApplications.length > 0 ? (
              stats.recentApplications.map((application) => (
                <div key={application._id} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-medium">{application.candidate.name}</h3>
                    <p className="text-sm text-gray-600">{application.job.title}</p>
                    <p className="text-xs text-gray-500">Applied: {new Date(application.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Accept
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600">
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No recent applications</p>
            )}
          </div>
        </Card>

        {/* Upcoming Interviews */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Upcoming Interviews
          </h2>
          <div className="space-y-4">
            {stats.upcomingInterviews.length > 0 ? (
              stats.upcomingInterviews.map((interview) => (
                <div key={interview._id} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-medium">{interview.candidate.name}</h3>
                    <p className="text-sm text-gray-600">{interview.job.title}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(interview.scheduledAt).toLocaleString()}
                    </div>
                  </div>
                  <Button size="sm">
                    Join Meeting
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No upcoming interviews</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
