import React from 'react';

const TopCompanies = () => {
    const companies = [
        { id: 1, name: 'Emergin Professionals', logo:'./mar.jpg' },
        { id: 2, name: 'Cvent', logo: './Cvent.jpg' },
        { id: 3, name: 'Procore', logo: './Procore.jpg' },
        { id: 4, name: 'Applied Systems', logo: './Applied_horizontal_fullcolor.png' },
        { id: 5, name: 'LexisNexis', logo: './LexisNexis.jpeg' },
        { id: 6, name: 'Diligent', logo: './Diligent.png' },
    ];

    return (
        <div className="py-16 bg-blue-50">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800">TOP COMPANIES</h2>
                <p className="text-gray-500 mt-2">

"Stay on track with your goals. Build connections and navigate your career with confidence."</p>
            </div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {companies.map(company => (
                    <div 
                        key={company.id} 
                        className="flex flex-col items-center bg-white p-6 shadow-lg rounded-md transition-transform transform hover:scale-105"
                    >
                        <div className="w-20 h-20 flex items-center justify-center mb-4">
                            <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
                        </div>
                        <p className="text-gray-600 font-medium text-center">{company.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopCompanies;
