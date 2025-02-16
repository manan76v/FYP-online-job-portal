import React, { useState } from 'react';

const JobSearchBar = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    console.log("Searching for jobs with:", jobTitle, location);
    // Implement search functionality here
  };

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const voiceInput = event.results[0][0].transcript;
        setJobTitle(voiceInput); // Set the jobTitle based on voice input
      };

      recognition.start();
    } else {
      alert("Voice search is not supported in this browser.");
    }
  };

  return (
    <div className="flex items-center border rounded-full shadow-lg overflow-hidden max-w-3xl mx-auto p-1 bg-white" style={{ height: '45px', marginTop: '8px' }}>
      {/* Job Title Input */}
      <div className="flex items-center px-4 flex-grow">
        
        <input
          type="text"
          placeholder="Job title, keywords, or company"
          className="p-2 w-full focus:outline-none"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
        {/* Voice Search Button */}
        <button
          onClick={handleVoiceSearch}
          className="ml-2 p-1 focus:outline-none"
        >
          <span className="material-icons text-gray-400">mic</span>
        </button>
      </div>

      {/* Divider */}
      <div className="border-l h-6 mx-2" />

      {/* Location Input */}
      <div className="flex items-center px-4 flex-grow">
        
        <input
          type="text"
          placeholder='City, state, zip code, or "remote"'
          className="p-2 w-full focus:outline-none"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white rounded-full px-10 py-2 ml-2 hover:bg-blue-700" // Increased button width by changing px-6 to px-8
      >
        Find_Jobs
      </button>
    </div>
  );
};

export default JobSearchBar;
