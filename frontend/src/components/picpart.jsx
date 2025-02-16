import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const JobBanner = () => {
    const navigate = useNavigate();
    const images = [
        { id: 1, src: './carousel-1.jpg', alt: 'Job Image 1' },
        { id: 2, src: './carousel-2.jpg', alt: 'Job Image 2' },
        { id: 3, src: 'office-620817.jpg', alt: 'Job Image 3' },
        { id: 4, src: 'job-5382501.jpg', alt: 'Job Image 4' },
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div 
            className="relative bg-cover bg-center bg-no-repeat h-[660px] text-white flex items-center justify-center"
            style={{ backgroundImage: `url(${images[currentImageIndex].src})` }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            
            {/* Main Content */}
            <div className="relative z-10 text-center px-6 lg:px-4 mt-5 space-y-6">
                <h1 className="text-5xl font-bold leading-snug">
                    Search, Apply & <br />
                    Get Your <span className="text-[#6A38C2]">Dream Jobs</span>
                </h1>
                <p className="text-lg leading-relaxed">
                    Thousands of jobs in the computer, engineering, and technology sectors are waiting for you.
                </p>
                {/* Buttons */}
                <div className="flex justify-center gap-4 mt-4">
                    <button 
                        onClick={() => navigate('/find-jobs')}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md transition-colors duration-200"
                    >
                        Search a Job
                    </button>
                    <button 
                        onClick={() => navigate('/signup')}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors duration-200"
                    >
                        Find A Talent
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobBanner;
