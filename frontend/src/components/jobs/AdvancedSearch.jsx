import React, { useState } from 'react';
import { Card } from "../ui/card.jsx";
import { Input } from "../ui/input.jsx";
import { Button } from "../ui/button.jsx";
import { Select } from "../ui/select.jsx";
import { Slider } from "../ui/slider.jsx";
import {
  SearchIcon,
  MapPinIcon,
  BriefcaseIcon,
  DollarSignIcon,
} from 'lucide-react';

const AdvancedSearch = () => {
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    jobType: '',
    experienceLevel: '',
    salary: [0, 200000],
    remote: false,
  });

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];
  const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Executive'];

  const handleSearch = () => {
    console.log('Search with filters:', filters);
    // Implement search logic
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Advanced Job Search</h1>

        <Card className="p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Keywords</label>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Job title, skills, or company"
                  className="pl-10"
                  value={filters.keyword}
                  onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <div className="relative">
                <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="City, state, or remote"
                  className="pl-10"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Job Type</label>
              <Select
                value={filters.jobType}
                onValueChange={(value) => setFilters({ ...filters, jobType: value })}
              >
                <option value="">All Types</option>
                {jobTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Experience Level</label>
              <Select
                value={filters.experienceLevel}
                onValueChange={(value) => setFilters({ ...filters, experienceLevel: value })}
              >
                <option value="">All Levels</option>
                {experienceLevels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </Select>
            </div>

            <div className="space-y-2 col-span-2">
              <label className="text-sm font-medium">Salary Range</label>
              <div className="px-3">
                <Slider
                  value={filters.salary}
                  onValueChange={(value) => setFilters({ ...filters, salary: value })}
                  min={0}
                  max={200000}
                  step={10000}
                  className="mt-2"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>${filters.salary[0].toLocaleString()}</span>
                  <span>${filters.salary[1].toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={handleSearch} className="w-full md:w-auto">
              Search Jobs
            </Button>
          </div>
        </Card>

        {/* Search Results Section */}
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">Senior Frontend Developer</h3>
                  <p className="text-primary">Tech Solutions Inc.</p>
                  <div className="flex gap-4 mt-2 text-gray-600 text-sm">
                    <span className="flex items-center gap-1">
                      <MapPinIcon className="w-4 h-4" />
                      San Francisco, CA
                    </span>
                    <span className="flex items-center gap-1">
                      <BriefcaseIcon className="w-4 h-4" />
                      Full-time
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSignIcon className="w-4 h-4" />
                      $120k - $150k
                    </span>
                  </div>
                </div>
                <Button variant="outline">Apply Now</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearch;
