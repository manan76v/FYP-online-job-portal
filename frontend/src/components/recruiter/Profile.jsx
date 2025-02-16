import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Mail, Phone, Building2, Globe, MapPin, CalendarDays, Pencil } from 'lucide-react';

const Profile = () => {
  // Temporary profile data
  const profile = {
    name: 'Abdul Manan',
    role: 'Senior Technical Recruiter',
    email: 'Manan176v@gmail.com',
    phone: '3038276402',
    experience: '5+ years in Tech Recruitment',
    location: 'Lahore, Pakistan',
    website: 'www.techhire-solutions.com',
    company: 'TechHire Solutions',
    about: 'Passionate technical recruiter with expertise in identifying and placing top tech talent. Specialized in software development, AI/ML, and full-stack positions.'
  };

  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
              <img 
                src="/default-avatar.png" 
                alt="Profile" 
                className="w-20 h-20 rounded-full"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://ui-avatars.com/api/?name=${profile.name}&background=random`;
                }}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <p className="text-gray-600">{profile.role}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => navigate('/recruiter/profile/edit')}
          >
            <Pencil className="w-4 h-4" />
            Edit Profile
          </Button>
        </div>

        <div className="grid gap-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-3 text-gray-400" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-3 text-gray-400" />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Building2 className="w-4 h-4 mr-3 text-gray-400" />
                <span>{profile.company}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Globe className="w-4 h-4 mr-3 text-gray-400" />
                <span>{profile.website}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-3 text-gray-400" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <CalendarDays className="w-4 h-4 mr-3 text-gray-400" />
                <span>{profile.experience}</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold mb-2">About</h2>
            <p className="text-gray-600">
              {profile.about}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">120+</div>
              <div className="text-sm text-gray-600">Placements Made</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">95%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">30+</div>
              <div className="text-sm text-gray-600">Active Positions</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
