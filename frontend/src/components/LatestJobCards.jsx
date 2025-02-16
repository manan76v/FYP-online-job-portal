import React, { useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { FaMapMarkerAlt, FaRegBookmark, FaBookmark } from 'react-icons/fa'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    const [isSaved, setIsSaved] = useState(false);
    
    if (!job) {
        return null;
    }

    const previewDescription = job.description?.length > 150 
        ? job.description.substring(0, 150) + '...' 
        : job.description || 'No description available';

    const handleSaveJob = (e) => {
        e.stopPropagation(); // Prevent card click event
        setIsSaved(!isSaved);
        // TODO: Implement save job functionality with backend
    };

    const handleViewDetails = (e) => {
        e.stopPropagation();
        navigate(`/description/${job._id}`);
    };

    return (
        <div className='relative flex flex-col h-full p-6 bg-white border border-gray-100 rounded-lg shadow-md hover:shadow-lg transition-all duration-300'>
            {/* Save Job Button */}
            <button
                onClick={handleSaveJob}
                className="absolute top-4 right-4 text-xl text-[#6A38C2] hover:scale-110 transition-transform"
                aria-label={isSaved ? 'Unsave job' : 'Save job'}
            >
                {isSaved ? <FaBookmark /> : <FaRegBookmark />}
            </button>

            {/* Main Content */}
            <div className="flex-grow">
                {/* Company Info */}
                <div className="mb-4">
                    <h2 className='text-xl font-semibold text-gray-800 mb-1'>
                        {job.company?.name || 'Company Name Not Available'}
                    </h2>
                    <div className="flex items-center text-gray-600">
                        <FaMapMarkerAlt className="mr-1" />
                        <span>{job.location || 'Location not specified'}</span>
                    </div>
                </div>

                {/* Job Title */}
                <h3 className='text-2xl font-bold text-[#6A38C2] mb-3'>
                    {job.title || 'Job Title Not Available'}
                </h3>

                {/* Description */}
                <p className='text-gray-600 mb-4 line-clamp-2'>
                    {previewDescription}
                </p>

                {/* Job Details */}
                <div className='flex flex-wrap items-center gap-2'>
                    {job.position && (
                        <Badge className='bg-[#EEF2FF] text-[#4F46E5] hover:bg-blue-100 px-3 py-1 rounded-full text-sm'>
                            {job.position} Positions
                        </Badge>
                    )}
                    {job.jobType && (
                        <Badge className='bg-[#FFF1F2] text-[#F43F5E] hover:bg-red-100 px-3 py-1 rounded-full text-sm'>
                            {job.jobType}
                        </Badge>
                    )}
                    {job.salary && (
                        <Badge className='bg-[#F3E8FF] text-[#6A38C2] hover:bg-purple-100 px-3 py-1 rounded-full text-sm'>
                            {job.salary}k
                        </Badge>
                    )}
                </div>
            </div>

            {/* View Details Button - Fixed at bottom */}
            <div className="mt-6">
                <Button
                    onClick={handleViewDetails}
                    className="w-full bg-[#6A38C2] hover:bg-[#5b2eb0] text-white font-medium py-2 rounded-lg transition duration-300"
                >
                    View Details
                </Button>
            </div>
        </div>
    );
};

export default LatestJobCards;
