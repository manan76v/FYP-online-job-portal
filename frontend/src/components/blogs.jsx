import React from "react";
import { Link } from "react-router-dom";
import "./BlogsPage.css";

const blogs = [
  {
    id: 1,
    title: "How to Build an Impressive Resume",
    description: "Tips and tricks to create a resume that stands out to employers.",
    date: "December 15, 2024",
    author: "Manan",
    image: "resume.jpg",
  },
  {
    id: 2,
    title: "Mastering Job Interviews: A Complete Guide",
    description: "Prepare and ace your next job interview with these key strategies.",
    date: "December 10, 2024",
    author: "Manan",
    image: "masterjob.jpg",
  },
  {
    id: 3,
    title: "Top 10 In-Demand Skills for 2024",
    description: "Explore the most sought-after skills to boost your career opportunities.",
    date: "December 5, 2024",
    author: "Manan",
    image: "futureskill.jpg",
  },
  {
    id: 4,
    title: "How to Find Remote Work Opportunities",
    description: "A guide to finding and succeeding in remote job roles.",
    date: "November 30, 2024",
    author: "Manan",
    image: "remote.jpg",
  },
  {
    id: 5,
    title: "The Importance of Networking in Your Career",
    description: "Learn how to expand your professional network effectively.",
    date: "November 25, 2024",
    author: "Manan",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 6,
    title: "Navigating Career Changes Successfully",
    description: "Steps to smoothly transition into a new career path.",
    date: "November 20, 2024",
    author: "Manan",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 7,
    title: "How to Negotiate a Better Salary",
    description: "Strategies to confidently negotiate your salary and benefits.",
    date: "November 15, 2024",
    author: "Manan",
    image: "salary.jpg",
  },
  {
    id: 8,
    title: "Best Job Boards to Explore in 2024",
    description: "A list of the top job boards to find your dream job.",
    date: "November 10, 2024",
    author: "Manan",
    image: "jobboard.jpg",
  },
  {
    id: 9,
    title: "Work-Life Balance: Tips for Modern Professionals",
    description: "How to maintain a healthy balance between work and personal life.",
    date: "November 5, 2024",
    author: "Manan",
    image: "life.jpg",
  },
  {
    id: 10,
    title: "The Benefits of Freelancing",
    description: "Explore the advantages and challenges of working as a freelancer.",
    date: "November 1, 2024",
    author: "Manan",
    image: "freelance.jpg",
  },
];

const BlogsPage = () => {
  return (
    <>
      <div className="blogs-page">
        <header className="blogs-header">
          <h1>Welcome to the Job Portal Blog</h1>
          <p>Discover career advice, tips, and opportunities to boost your career.</p>
        </header>

        <main className="blogs-content">
          <section className="featured-blog">
            <h2>Featured Career Articles</h2>
            <div className="featured-posts">
              {blogs.slice(0, 4).map((blog) => (
                <div key={blog.id} className="featured-post">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="featured-image"
                  />
                  <div className="featured-details">
                    <h3>
                      <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                    </h3>
                    <p>{blog.description}</p>
                    <p className="blog-meta">
                      By {blog.author} on {blog.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="blog-list">
            <h2>Latest Career Advice</h2>
            <div className="blogs">
              {blogs.slice(6).map((blog) => (
                <div key={blog.id} className="blog-card">
                  <img src={blog.image} alt={blog.title} className="blog-image" />
                  <h3>
                    <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                  </h3>
                  <p>{blog.description}</p>
                  <p className="blog-meta">
                    By {blog.author} on {blog.date}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default BlogsPage;
