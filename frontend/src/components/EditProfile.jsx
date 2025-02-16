import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Avatar, AvatarImage } from './ui/avatar';
import { X, Upload, ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { setUser } from '../redux/authSlice';

const EditProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(store => store.auth.user);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        location: user?.location || '',
        title: user?.title || '',
        skills: user?.skills || [],
        about: user?.about || '',
        resume: null,
        avatar: null
    });
    const [skillInput, setSkillInput] = useState('');
    const [previewImage, setPreviewImage] = useState(user?.avatar || null);

    const handleSkillAdd = () => {
        if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
            setFormData({
                ...formData,
                skills: [...formData.skills, skillInput.trim()]
            });
            setSkillInput('');
        }
    };

    const handleSkillRemove = (skillToRemove) => {
        setFormData({
            ...formData,
            skills: formData.skills.filter(skill => skill !== skillToRemove)
        });
    };

    const handleResumeChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                toast.error('Resume file size should be less than 5MB');
                return;
            }
            if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
                .includes(file.type)) {
                toast.error('Please upload PDF or Word document');
                return;
            }
            setFormData({ ...formData, resume: file });
            toast.success('Resume uploaded successfully');
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                toast.error('Image size should be less than 2MB');
                return;
            }
            if (!file.type.startsWith('image/')) {
                toast.error('Please upload an image file');
                return;
            }
            setFormData({ ...formData, avatar: file });
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                if (key === 'skills') {
                    formDataToSend.append(key, JSON.stringify(formData[key]));
                } else if (formData[key] !== null) {
                    formDataToSend.append(key, formData[key]);
                }
            });

            const { data } = await axios.put('/api/v1/jobseeker/profile', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            dispatch(setUser(data.user));
            toast.success('Profile updated successfully');
            navigate('/profile');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <Button 
                variant="ghost" 
                className="mb-4"
                onClick={() => navigate('/profile')}
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Profile
            </Button>

            <Card className="p-6">
                <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Avatar Upload */}
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={previewImage || "/default-avatar.png"} />
                        </Avatar>
                        <div>
                            <Label htmlFor="avatar">Profile Picture</Label>
                            <Input
                                id="avatar"
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="mt-2"
                            />
                            <p className="text-sm text-gray-500 mt-1">Max file size: 2MB</p>
                        </div>
                    </div>

                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Full Name</Label>
                            <Input
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Enter your full name"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Phone</Label>
                            <Input
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="Enter your phone number"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Location</Label>
                            <Input
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                placeholder="Enter your location"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Professional Title</Label>
                        <Input
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g. Full Stack Developer"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>About</Label>
                        <Textarea
                            value={formData.about}
                            onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                            placeholder="Write something about yourself"
                            rows={4}
                        />
                    </div>

                    {/* Skills Section */}
                    <div className="space-y-2">
                        <Label>Skills</Label>
                        <div className="flex gap-2">
                            <Input
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                placeholder="Add a skill"
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleSkillAdd())}
                            />
                            <Button type="button" onClick={handleSkillAdd}>Add</Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {formData.skills.map((skill, index) => (
                                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                    {skill}
                                    <X
                                        className="h-3 w-3 cursor-pointer"
                                        onClick={() => handleSkillRemove(skill)}
                                    />
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Resume Upload */}
                    <div className="space-y-2">
                        <Label>Resume</Label>
                        <Input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleResumeChange}
                        />
                        <p className="text-sm text-gray-500">Upload PDF or Word document (max 5MB)</p>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-2">
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => navigate('/profile')}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default EditProfile;
