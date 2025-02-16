import React from 'react';
import { Card } from "../ui/card.jsx";
import { Avatar } from "../ui/avatar.jsx";
import { Button } from "../ui/button.jsx";
import { MapPinIcon, UsersIcon, GlobeIcon, BriefcaseIcon } from 'lucide-react';

const CompanyProfile = () => {
  const companyData = {
    name: 'Tech Solutions Inc.',
    logo: '/company-logo.png',
    description: 'Leading technology solutions provider with over 10 years of experience in delivering innovative software solutions.',
    industry: 'Information Technology',
    size: '500-1000 employees',
    location: 'San Francisco, CA',
    website: 'www.techsolutions.com',
    openPositions: 12
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="p-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0">
            <Avatar className="w-32 h-32">
              <img src={companyData.logo} alt={companyData.name} />
            </Avatar>
          </div>
          
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold">{companyData.name}</h1>
                <div className="flex gap-4 mt-2 text-gray-600">
                  <span className="flex items-center gap-1">
                    <MapPinIcon className="w-4 h-4" />
                    {companyData.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <UsersIcon className="w-4 h-4" />
                    {companyData.size}
                  </span>
                  <span className="flex items-center gap-1">
                    <BriefcaseIcon className="w-4 h-4" />
                    {companyData.openPositions} open positions
                  </span>
                </div>
              </div>
              
              <Button className="hidden md:block">
                Follow Company
              </Button>
            </div>

            <p className="mt-6 text-gray-700">
              {companyData.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <a 
                href={`https://${companyData.website}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <GlobeIcon className="w-4 h-4" />
                {companyData.website}
              </a>
            </div>
          </div>
        </div>
      </Card>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Us</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Tech Solutions Inc. is at the forefront of technological innovation, 
              specializing in cloud computing, artificial intelligence, and enterprise 
              software development.
            </p>
            <p>
              Our mission is to empower businesses through cutting-edge technology 
              solutions that drive growth and efficiency.
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Latest Job Openings</h2>
          <div className="space-y-4">
            {[
              { title: 'Senior Frontend Developer', location: 'Remote', type: 'Full-time' },
              { title: 'DevOps Engineer', location: 'San Francisco', type: 'Full-time' },
              { title: 'Product Manager', location: 'New York', type: 'Full-time' },
            ].map((job, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium">{job.title}</p>
                  <p className="text-sm text-gray-500">{job.location} • {job.type}</p>
                </div>
                <Button variant="outline">Apply Now</Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CompanyProfile;
