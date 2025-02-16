import React from 'react';

const JobHelpSection = () => {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-center bg-white py-16 px-6 lg:px-20">
            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4 lg:mb-0 lg:mr-5">
                <img src="./about-1.jpg" alt="Team" className="w-100px h-full object-cover rounded-md" />
                <img src="./about-2.jpg" alt="Meeting" className="w-full h-full object-cover rounded-md" />
                <img src="./about-3.jpg" alt="Workspace" className="w-full h-full object-cover rounded-md" />
                <img src="./about-4.jpg" alt="Team Discussion" className="w-full h-full object-cover rounded-md" />
            </div>
            
            {/* Text Content */}
            <div className="text-center lg:text-left max-w-md">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">We Help To Get The Best Job And Find A Talent</h2>
                <p className="text-gray-600 mb-6 text-justify">
                We are dedicated to helping you secure the best job opportunities and connect with skilled talent. Our platform is designed to match candidates with roles that suit their expertise and employers with candidates who can help drive success. Whether you're seeking a new career path or looking for talent to join your team, we're here to support you. </p>
                
                {/* Bullet Points */}
                <ul className="text-gray-600 mb-6 space-y-2">
                    <li className="flex items-center">
                        <span className="text-green-500 mr-2">✔</span> Dedicated support to help you achieve your career goals
                    </li>
                    <li className="flex items-center">
                        <span className="text-green-500 mr-2">✔</span> Match with talent that aligns with your company’s vision
                    </li>
                    <li className="flex items-center">
                        <span className="text-green-500 mr-2">✔</span> Find roles and candidates that meet your specific needs
                    </li>
                    <li className="flex items-center">
                        <span className="text-green-500 mr-2">✔</span>Access a wide range of opportunities across various industries
                    </li>
                </ul>

                {/* Button */}
                <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">
                    Read More
                </button>
            </div>
        </div>
    );
};

export default JobHelpSection;
