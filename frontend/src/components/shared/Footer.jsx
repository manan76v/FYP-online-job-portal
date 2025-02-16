import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white p-6">
      <div className="flex justify-around">
        <div className="w-1/4">
          <h4 className="font-bold mb-2">Job Categories</h4>
          <ul>
            <li>Development & IT</li>
            <li>Sales & Marketing</li>
            <li>Accounting & Finance</li>
            <li>Others</li>
          </ul>
        </div>
        <div className="w-1/4">
          <h4 className="font-bold mb-2">Job Type</h4>
          <ul>
            <li>Work from home</li>
            <li>Internship</li>
            <li>Part time</li>
            <li>Full time</li>
          </ul>
        </div>
        <div className="w-1/4">
          <h4 className="font-bold mb-2">Resources</h4>
          <ul>
            <li>Support</li>
            <li>FAQ</li>
            <li>Terms of Service</li>
            <li>Contact Details</li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-6">
        <p></p>
      </div>
    </footer>
  );
};

export default Footer;
