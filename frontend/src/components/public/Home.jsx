import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBriefcase, FaBuilding } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Dream Job Today
          </h1>
          <p className="text-xl mb-8">
            Connect with top employers and opportunities across industries
          </p>
          <Link
            to="/find-jobs"
            className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition duration-300"
          >
            Start Your Search
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaSearch className="text-4xl text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Search Jobs</h3>
              <p className="text-gray-600">
                Browse through thousands of job listings from top companies
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaBriefcase className="text-4xl text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Apply</h3>
              <p className="text-gray-600">
                Apply to multiple jobs with just a few clicks
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaBuilding className="text-4xl text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Top Companies</h3>
              <p className="text-gray-600">
                Connect with leading companies in your industry
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
