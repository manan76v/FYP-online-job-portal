import React from 'react';
import { Card } from "../ui/card.jsx"; 
import { useSelector } from 'react-redux';
import { 
  BarChart,
  BriefcaseIcon, 
  BookmarkIcon, 
  BellIcon, 
  FileTextIcon 
} from 'lucide-react';

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);
  const isEmployer = user?.role === 'employer';

  const stats = isEmployer ? [
    { label: 'Posted Jobs', value: '12', icon: BriefcaseIcon },
    { label: 'Total Applications', value: '48', icon: FileTextIcon },
    { label: 'Active Listings', value: '8', icon: BarChart },
    { label: 'Messages', value: '5', icon: BellIcon },
  ] : [
    { label: 'Applied Jobs', value: '8', icon: BriefcaseIcon },
    { label: 'Saved Jobs', value: '15', icon: BookmarkIcon },
    { label: 'Profile Views', value: '24', icon: BarChart },
    { label: 'Notifications', value: '3', icon: BellIcon },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            {isEmployer ? 'Recent Applications' : 'Recent Job Activity'}
          </h2>
          {/* Activity list will be implemented here */}
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium">
                    {isEmployer ? 'Application from John Doe' : 'Frontend Developer at Tech Co'}
                  </p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
                <button className="text-primary hover:underline">
                  {isEmployer ? 'Review' : 'View'}
                </button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            {isEmployer ? 'Job Listings Overview' : 'Recommended Jobs'}
          </h2>
          {/* Overview content will be implemented here */}
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium">Senior Software Engineer</p>
                  <p className="text-sm text-gray-500">
                    {isEmployer ? '5 applications' : 'Google • Remote'}
                  </p>
                </div>
                <button className="text-primary hover:underline">
                  {isEmployer ? 'Manage' : 'Apply'}
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
