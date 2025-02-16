import React from 'react';
import { FaHome, FaCalendarAlt, FaHourglassHalf, FaBriefcase } from 'react-icons/fa';

const JobType = () => {
    const jobTypes = [
        { icon: <FaHome />, label: "Work From Home" },
        { icon: <FaCalendarAlt />, label: "Internship" },
        { icon: <FaHourglassHalf />, label: "Part Time" },
        { icon: <FaBriefcase />, label: "Full Time" }
    ];

    return (
        <div className="py-16 bg-gray-50 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">JOB TYPE</h2>
            <p className="text-gray-500 mb-10">Find roles that align with your skills and career aspirations effortlessly.</p>
            <div className="flex justify-center gap-8">
                {jobTypes.map((job, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center w-48 transition-transform transform hover:scale-105"
                    >
                        <div className="bg-gradient-to-r from-blue-500 to-pink-500 p-6 rounded-full mb-4">
                            <div className="text-white text-2xl">{job.icon}</div>
                        </div>
                        <p className="text-gray-700 font-medium">{job.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobType;
