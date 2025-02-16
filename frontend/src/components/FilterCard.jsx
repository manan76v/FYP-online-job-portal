// JobFilter.js
import React, { useState } from 'react';

const JobFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    datePosted: '',
    salary: '',
    jobType: '',
    location: '',
  });

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Filter Jobs</h2>

      {/* Date Posted Filter */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Date Posted</label>
        <select
          className="w-full p-2 border rounded-md"
          value={filters.datePosted}
          onChange={(e) => handleFilterChange('datePosted', e.target.value)}
        >
          <option value="">Any</option>
          <option value="today">Today</option>
          <option value="last3days">Last 3 Days</option>
          <option value="last7days">Last 7 Days</option>
          <option value="last30days">Last 30 Days</option>
        </select>
      </div>

      {/* Salary Filter */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Salary Range</label>
        <select
          className="w-full p-2 border rounded-md"
          value={filters.salary}
          onChange={(e) => handleFilterChange('salary', e.target.value)}
        >
          <option value="">Any</option>
          <option value="0-40k">10 - 40k</option>
          <option value="40k-80k">40k - 80k</option>
          <option value="80k-120k">80k - 120k</option>
          <option value="120k+">120k+</option>
        </select>
      </div>

      {/* Job Type Filter */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Job Type</label>
        <select
          className="w-full p-2 border rounded-md"
          value={filters.jobType}
          onChange={(e) => handleFilterChange('jobType', e.target.value)}
        >
          <option value="">Any</option>
          <option value="fullTime">Full-Time</option>
          <option value="partTime">Part-Time</option>
          <option value="internship">Internship</option>
          <option value="freelance">Remote</option>
        </select>
      </div>

      {/* Location Filter */}
      <div>
        <label className="block font-medium mb-2">Location</label>
        <select
          className="w-full p-2 border rounded-md"
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
        >
          <option value="">Any</option>
          <option value="Vehari">Vehari</option>
          <option value="Lahore">Lahore</option>
          <option value="Multan">Multan</option>
          <option value="Islamabad">Islamabad</option>
          <option value="Karachi">Karachi</option>
        </select>
      </div>
    </div>
  );
};

export default JobFilter;
