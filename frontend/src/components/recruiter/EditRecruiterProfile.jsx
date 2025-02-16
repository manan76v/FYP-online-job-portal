import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { Mail, Phone, Building2, Globe, MapPin, User } from 'lucide-react';

const EditRecruiterProfile = () => {
  const navigate = useNavigate();
  const { user } = useSelector(store => store.auth);
  const [selectedImage, setSelectedImage] = useState(null);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || 'Manan176v@gmail.com',
    phone: user?.phone || '3038276402',
    company: user?.company || '',
    location: user?.location || '',
    website: user?.website || '',
    experience: user?.experience || '',
    about: user?.about || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Here you would typically send both formData and selectedImage to your backend
      // const formDataToSend = new FormData();
      // Object.keys(formData).forEach(key => formDataToSend.append(key, formData[key]));
      // if (selectedImage) {
      //   formDataToSend.append('profileImage', selectedImage);
      // }
      
      // Simulating API call success
      toast.success('Profile updated successfully');
      navigate('/recruiter/profile');
    } catch (error) {
      toast.error('Error updating profile');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Edit Profile</h1>
          <p className="text-gray-600">Update your profile information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="profileImage">Profile Picture</Label>
            <Input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full"
            />
            {selectedImage && (
              <p className="text-sm text-green-600">Image selected: {selectedImage.name}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your full name"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your email"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </Label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Your phone number"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Company
              </Label>
              <Input
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Your company"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location
              </Label>
              <Input
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Your location"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Website
              </Label>
              <Input
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="Your website"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Experience</Label>
              <Input
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="Your experience"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>About</Label>
              <Textarea
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                placeholder="Tell us about yourself"
                rows={4}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/recruiter/profile')}
            >
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EditRecruiterProfile;
