import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Contact Us</h1>
          
          {/* Contact Information */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaPhone className="text-3xl text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaEnvelope className="text-3xl text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-600">support@jobportal.com</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaMapMarkerAlt className="text-3xl text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Address</h3>
              <p className="text-gray-600">123 Job Street, Career City, 12345</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="name">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="email">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="subject">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
