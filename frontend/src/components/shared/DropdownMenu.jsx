import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleDown } from 'react-icons/fa';

const DropdownMenu = ({ children, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {children}
        <FaAngleDown className={`ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            {items.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  {item.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
