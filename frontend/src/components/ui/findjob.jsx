import React from 'react';

const FindJobOrCandidate = () => {
    return (
        <div className="py-16 bg-blue-50"> {/* Changed from bg-gray-50 to bg-blue-50 */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 justify-center items-center">
                {/* Find a Job Section */}
                <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center text-center w-full md:w-1/2">
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                        <img src="./findpic.PNG" alt="Find Job" className="w-full h-full object-contain" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">DO YOU WANT TO FIND A JOB?</h3>
                    <p className="text-gray-500 mb-6">
                    Discover opportunities that match your skills and career goals with ease.
                    </p>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
                        Find Job
                    </button>
                </div>

                {/* Find a Candidate Section */}
                <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center text-center w-full md:w-1/2">
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                        <img src="./recu.PNG" alt="Find Candidate" className="w-full h-full object-contain" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">ARE YOU LOOKING FOR A CANDIDATE?</h3>
                    <p className="text-gray-500 mb-6">
                    Find the perfect candidate to meet your hiring needs quickly and efficiently.
                    </p>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
                        Find Candidate
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FindJobOrCandidate;
