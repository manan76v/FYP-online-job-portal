import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe,
  Building,
  Briefcase,
  Pen,
  User
} from 'lucide-react';
import { useSelector } from 'react-redux';

const RecruiterProfile = () => {
  const { user } = useSelector(store => store.auth);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user?.avatar || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"} alt={user?.fullname} />
              </Avatar>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user?.fullname}</h1>
              <p className="text-gray-600">{user?.position} at {user?.company}</p>
            </div>
          </div>
          <Link to="/recruiter/profile/edit">
            <Button variant="outline">
              <Pen className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-500" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-500" />
              <span>{user?.phoneNumber || 'Not specified'}</span>
            </div>
            <div className="flex items-center gap-3">
              <Building className="w-5 h-5 text-gray-500" />
              <span>{user?.company || 'Not specified'}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-gray-500" />
              <span>{user?.position || 'Not specified'}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-500" />
              <span>{user?.location || 'Not specified'}</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-gray-500" />
              <span>{user?.website || 'Not specified'}</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">About</h2>
          <p className="text-gray-600">{user?.bio || 'No bio provided'}</p>
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfile;
