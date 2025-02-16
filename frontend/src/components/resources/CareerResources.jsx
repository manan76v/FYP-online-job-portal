import React from 'react';
import { Card } from "../ui/card.jsx";
import { Button } from "../ui/button.jsx";
import { 
  BookOpenIcon, 
  VideoIcon, 
  FileTextIcon, 
  TrendingUpIcon 
} from 'lucide-react';

const CareerResources = () => {
  const resources = [
    {
      category: 'Resume Writing',
      items: [
        {
          title: 'Resume Writing Guide',
          description: 'Learn how to create a professional resume that stands out',
          type: 'guide',
          icon: FileTextIcon,
        },
        {
          title: 'Resume Templates',
          description: 'Professional templates for different industries',
          type: 'templates',
          icon: FileTextIcon,
        },
      ]
    },
    {
      category: 'Interview Preparation',
      items: [
        {
          title: 'Common Interview Questions',
          description: 'Prepare for your interviews with practice questions',
          type: 'guide',
          icon: BookOpenIcon,
        },
        {
          title: 'Mock Interview Videos',
          description: 'Watch and learn from mock interview sessions',
          type: 'video',
          icon: VideoIcon,
        },
      ]
    },
    {
      category: 'Career Development',
      items: [
        {
          title: 'Skill Assessment Tools',
          description: 'Evaluate and improve your professional skills',
          type: 'tool',
          icon: TrendingUpIcon,
        },
        {
          title: 'Industry Insights',
          description: 'Stay updated with the latest industry trends',
          type: 'article',
          icon: BookOpenIcon,
        },
      ]
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Career Resources</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((category, index) => (
          <Card key={index} className="p-6">
            <h2 className="text-xl font-semibold mb-4">{category.category}</h2>
            <div className="space-y-4">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="group">
                  <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.description}
                      </p>
                      <Button 
                        variant="link" 
                        className="mt-2 p-0 h-auto text-primary"
                      >
                        Learn more →
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Featured Content Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Featured Content</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <VideoIcon className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Job Search Strategies Webinar
            </h3>
            <p className="text-gray-600 mb-4">
              Learn effective strategies to find and land your dream job.
            </p>
            <Button variant="outline" className="w-full">
              Watch Now
            </Button>
          </Card>

          <Card className="p-6">
            <FileTextIcon className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Cover Letter Templates
            </h3>
            <p className="text-gray-600 mb-4">
              Download professional cover letter templates for various industries.
            </p>
            <Button variant="outline" className="w-full">
              Download Templates
            </Button>
          </Card>

          <Card className="p-6">
            <TrendingUpIcon className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Career Growth Guide
            </h3>
            <p className="text-gray-600 mb-4">
              Expert advice on advancing your career and achieving your goals.
            </p>
            <Button variant="outline" className="w-full">
              Read Guide
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CareerResources;
