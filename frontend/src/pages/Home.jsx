import React from 'react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-purple-600 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Search, Apply &
              <span className="block text-yellow-400">Get Your Dream Jobs</span>
            </h1>
            <p className="mt-6 text-xl max-w-3xl mx-auto">
              Thousands of jobs in the computer, engineering, and technology sectors are waiting for you.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link to="/find-jobs">
                <Button className="bg-yellow-400 text-purple-700 hover:bg-yellow-300">
                  Search a Job
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-purple-700">
                  Find A Talent
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-purple-600 mb-3">Easy Job Search</h3>
            <p className="text-gray-600">Find the perfect job that matches your skills and experience.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-purple-600 mb-3">Top Companies</h3>
            <p className="text-gray-600">Connect with leading companies in the tech industry.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-purple-600 mb-3">Career Growth</h3>
            <p className="text-gray-600">Take your career to the next level with great opportunities.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
