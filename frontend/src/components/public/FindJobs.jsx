import React, { useState } from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

const FindJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  // This is a placeholder jobs array - in a real application, this would come from an API
  const jobs = [
    {
      id: 1,
      title: 'Software Engineer',
      company: 'Tech Corp',
      location: 'New York, NY',
      type: 'Full-time',
      posted: '2 days ago',
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'Innovation Inc',
      location: 'San Francisco, CA',
      type: 'Full-time',
      posted: '1 day ago',
    },
    // Add more sample jobs as needed
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Search Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Job title or keyword"
                className="w-full pl-10 pr-4 py-2 border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                className="w-full pl-10 pr-4 py-2 border rounded-md"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                  <p className="text-gray-600 mt-1">{job.company}</p>
                  <div className="flex items-center gap-4 mt-2 text-gray-500">
                    <span className="flex items-center">
                      <FaMapMarkerAlt className="mr-1" />
                      {job.location}
                    </span>
                    <span>{job.type}</span>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{job.posted}</span>
              </div>
              <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-300">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindJobs;
