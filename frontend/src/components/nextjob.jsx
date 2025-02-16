import React from 'react';

const JobSteps = () => {
    const steps = [
        {
            id: 1,
            title: 'Register an account',
            description: 'Due to its widespread use as filler text for layouts, non-readability is of great importance.',
        },
        {
            id: 2,
            title: 'Find your job',
            description: 'Immediately find verified jobs based on job categories and locations that are most relevant to you.',
        },
        {
            id: 3,
            title: 'Apply for job',
            description: 'Immediately find verified jobs based on job categories and locations that are most relevant to you.',
        },
    ];

    return (
        <div className="max-w-7xl mx-auto py-16 px-6 lg:px-8 flex flex-col lg:flex-row items-center lg:items-start gap-10">
            {/* Text Section */}
            <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Find your next job in 3 easy steps</h2>
                <p className="text-gray-600 mb-8">
                    Post a job to tell us about your project. We’ll quickly match you with the right freelancers.
                </p>
                <div className="space-y-6">
                    {steps.map(step => (
                        <div key={step.id} className="flex items-start gap-4">
                            <div className="text-blue-500 text-lg font-bold">{step.id}</div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Illustration Section */}
            <div className="lg:w-1/2 flex justify-center">
                <img src="./nextjob.PNG" alt="Illustration" className="w-full max-w-xs lg:max-w-md" />
            </div>
        </div>
    );
};

export default JobSteps;
