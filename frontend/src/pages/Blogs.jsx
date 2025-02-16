import React from 'react';

const Blogs = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'How to Prepare for Your Job Interview',
      excerpt: 'Essential tips and tricks to help you ace your next job interview...',
      date: 'Jan 10, 2024',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Top Skills Employers Look for in 2024',
      excerpt: 'Discover the most in-demand skills that employers are seeking...',
      date: 'Jan 8, 2024',
      readTime: '4 min read'
    },
    {
      id: 3,
      title: 'Writing an Effective Resume',
      excerpt: 'Learn how to create a resume that stands out from the crowd...',
      date: 'Jan 5, 2024',
      readTime: '6 min read'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Career Insights Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
              <button className="mt-4 text-purple-600 hover:text-purple-700 font-medium">
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
