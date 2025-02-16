import React from 'react';
import { FaCalendar, FaUser } from 'react-icons/fa';

const Blogs = () => {
  // Sample blog posts - in a real application, these would come from an API
  const blogs = [
    {
      id: 1,
      title: 'How to Ace Your Job Interview',
      excerpt: 'Learn the top strategies to help you succeed in your next job interview...',
      author: 'Career Expert',
      date: 'January 10, 2024',
      category: 'Career Tips',
      image: 'https://via.placeholder.com/400x250'
    },
    {
      id: 2,
      title: 'Writing a Resume That Stands Out',
      excerpt: 'Tips and tricks to create a compelling resume that gets you noticed...',
      author: 'HR Professional',
      date: 'January 8, 2024',
      category: 'Resume Tips',
      image: 'https://via.placeholder.com/400x250'
    },
    {
      id: 3,
      title: 'The Future of Remote Work',
      excerpt: 'Exploring the trends and challenges of remote work in 2024...',
      author: 'Workplace Analyst',
      date: 'January 5, 2024',
      category: 'Workplace Trends',
      image: 'https://via.placeholder.com/400x250'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Career Insights & Tips</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={blog.image} 
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="text-sm text-purple-600 mb-2">{blog.category}</div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {blog.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {blog.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <FaUser className="mr-2" />
                    {blog.author}
                  </div>
                  <div className="flex items-center">
                    <FaCalendar className="mr-2" />
                    {blog.date}
                  </div>
                </div>
                <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition duration-300">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
