import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaMicrophone, FaMapMarkerAlt, FaSearch, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import './Jobs.css';

const Jobs = () => {
  const { allJobs } = useSelector(store => store.job);
  const { searchedQuery } = useSelector(store => store.job);
  const [searchTerm, setSearchTerm] = useState(searchedQuery || '');
  const [locationTerm, setLocationTerm] = useState('');
  const [filterJobs, setFilterJobs] = useState([]);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    datePosted: 'any',
    salaryRange: 'any',
    jobType: 'any',
  });
  const [savedJobs, setSavedJobs] = useState({});

  useEffect(() => {
    if (allJobs) {
      setFilterJobs(allJobs);
      if (searchedQuery) {
        handleSearch();
      }
    }
  }, [allJobs, searchedQuery]);

  const handleSearch = () => {
    let filtered = [...allJobs];

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (locationTerm) {
      filtered = filtered.filter(job =>
        job.location?.toLowerCase().includes(locationTerm.toLowerCase())
      );
    }

    setFilterJobs(filtered);
  };

  const handleSaveJob = (jobId, e) => {
    e.stopPropagation();
    setSavedJobs(prev => ({
      ...prev,
      [jobId]: !prev[jobId]
    }));
    // TODO: Implement save job functionality with backend
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search Section */}
      <div className="bg-[#6A38C2] rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-5">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="w-full pl-10 pr-12 py-3 rounded-lg border-0 focus:ring-2 focus:ring-purple-300"
                placeholder="Job title, keywords, or company"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaMicrophone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-500 cursor-pointer" />
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-purple-300"
                placeholder="City, state, or 'remote'"
                value={locationTerm}
                onChange={(e) => setLocationTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <button
              onClick={handleSearch}
              className="w-full bg-[#F7B928] hover:bg-[#f0b01f] text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              Find Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Filter Jobs</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-transparent"
            value={filters.datePosted}
            onChange={(e) => setFilters(prev => ({ ...prev, datePosted: e.target.value }))}
          >
            <option value="any">Date Posted (Any)</option>
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>

          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-transparent"
            value={filters.jobType}
            onChange={(e) => setFilters(prev => ({ ...prev, jobType: e.target.value }))}
          >
            <option value="any">Job Type (Any)</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="remote">Remote</option>
          </select>

          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-transparent"
            value={filters.salaryRange}
            onChange={(e) => setFilters(prev => ({ ...prev, salaryRange: e.target.value }))}
          >
            <option value="any">Salary Range (Any)</option>
            <option value="0-30k">₹0 - ₹30,000</option>
            <option value="30k-60k">₹30,000 - ₹60,000</option>
            <option value="60k-90k">₹60,000 - ₹90,000</option>
            <option value="90k+">₹90,000+</option>
          </select>
        </div>
      </div>

      {/* Job Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filterJobs && filterJobs.length > 0 ? (
          filterJobs.map(job => (
            <div
              key={job._id}
              className="relative flex flex-col h-full p-6 bg-white border border-gray-100 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              {/* Save Job Button */}
              <button
                onClick={(e) => handleSaveJob(job._id, e)}
                className="absolute top-4 right-4 text-xl text-[#6A38C2] hover:scale-110 transition-transform"
                aria-label={savedJobs[job._id] ? 'Unsave job' : 'Save job'}
              >
                {savedJobs[job._id] ? <FaBookmark /> : <FaRegBookmark />}
              </button>

              {/* Main Content */}
              <div className="flex-grow">
                {/* Company Info */}
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">
                    {job.company?.name || 'Company Name Not Available'}
                  </h2>
                  <div className="flex items-center text-gray-600">
                    <FaMapMarkerAlt className="mr-1" />
                    <span>{job.location || 'Location not specified'}</span>
                  </div>
                </div>

                {/* Job Title */}
                <h3 className="text-2xl font-bold text-[#6A38C2] mb-3">
                  {job.title || 'Job Title Not Available'}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {job.description?.length > 150
                    ? `${job.description.substring(0, 150)}...`
                    : job.description || 'No description available'}
                </p>

                {/* Job Details */}
                <div className="flex flex-wrap gap-2">
                  {job.position && (
                    <Badge className="bg-[#EEF2FF] text-[#4F46E5] hover:bg-blue-100 px-3 py-1 rounded-full text-sm">
                      {job.position} Positions
                    </Badge>
                  )}
                  {job.jobType && (
                    <Badge className="bg-[#FFF1F2] text-[#F43F5E] hover:bg-red-100 px-3 py-1 rounded-full text-sm">
                      {job.jobType}
                    </Badge>
                  )}
                  {job.salary && (
                    <Badge className="bg-[#F3E8FF] text-[#6A38C2] hover:bg-purple-100 px-3 py-1 rounded-full text-sm">
                      {job.salary}k
                    </Badge>
                  )}
                </div>
              </div>

              {/* View Details Button */}
              <div className="mt-6">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/job/${job._id}`);
                  }}
                  className="w-full bg-[#6A38C2] hover:bg-[#5b2eb0] text-white font-medium py-2 rounded-lg transition duration-300"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No jobs found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;