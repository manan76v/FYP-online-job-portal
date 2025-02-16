import React from 'react';

const categories = [
    { title: 'Development & IT' },
    { title: 'Design & Creative' },
    { title: 'Sales & Marketing' },
    { title: 'Accounting & Finance' },
    { title: 'Admin & Customer Support' },
    { title: 'Engineering & Architecture' },
    { title: 'Writing & Translation' },
    { title: 'Human Resource' },
];

const CategoryCard = () => {
    return (
        <div className="max-w-5xl mx-auto my-10">
            <h2 className="text-2xl font-bold text-center">Browse talent by category</h2>
            <p className="text-center text-gray-500 mb-6">Looking for work? Browse jobs</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {categories.map((category, index) => (
                    <div 
                        key={index}
                        className={`p-6 rounded-lg shadow-md border border-gray-200 text-center bg-blue-50 cursor-pointer hover:bg-blue-500 hover:text-white transition duration-200`}
                    >
                        <h3 className="text-lg font-semibold">{category.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryCard;
