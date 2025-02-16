import React from 'react';
import { Card } from "../ui/card.jsx";
import { Button } from "../ui/button.jsx";
import { 
  MapPinIcon, 
  BriefcaseIcon, 
  ClockIcon, 
  TrashIcon,
  ExternalLinkIcon 
} from 'lucide-react';

const SavedJobs = () => {
  const savedJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'Tech Solutions Inc.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120k - $150k',
      savedDate: '2024-12-30',
      logo: '/company-logo.png'
    },
    // Add more saved jobs here
  ];

  const handleRemove = (jobId) => {
    console.log('Remove job:', jobId);
    // Implement remove logic
  };

  const handleApply = (jobId) => {
    console.log('Apply to job:', jobId);
    // Implement apply logic
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Saved Jobs</h1>
          <p className="text-gray-500">{savedJobs.length} jobs saved</p>
        </div>

        <div className="space-y-4">
          {savedJobs.map((job) => (
            <Card key={job.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                  <img src={job.logo} alt={job.company} className="w-8 h-8" />
                </div>

                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <p className="text-primary">{job.company}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleRemove(job.id)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => window.open(`/jobs/${job.id}`, '_blank')}
                      >
                        <ExternalLinkIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-2 text-gray-600 text-sm">
                    <span className="flex items-center gap-1">
                      <MapPinIcon className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <BriefcaseIcon className="w-4 h-4" />
                      {job.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <ClockIcon className="w-4 h-4" />
                      Saved {new Date(job.savedDate).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-gray-600">{job.salary}</p>
                    <Button onClick={() => handleApply(job.id)}>
                      Apply Now
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {savedJobs.length === 0 && (
          <Card className="p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">No Saved Jobs</h3>
            <p className="text-gray-500 mb-4">
              Start saving jobs you're interested in to keep track of them here.
            </p>
            <Button onClick={() => window.location.href = '/jobs'}>
              Browse Jobs
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
