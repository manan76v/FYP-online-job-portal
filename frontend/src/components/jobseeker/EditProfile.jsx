import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { setUser } from '../../redux/authSlice';

const EditProfile = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
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
        resume: null
    });
    const [skillInput, setSkillInput] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                if (key === 'skills') {
                    formDataToSend.append(key, JSON.stringify(formData[key]));
                } else {
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
            onClose();
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
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

                    <div className="space-y-2">
                        <Label>Resume</Label>
                        <Input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleResumeChange}
                        />
                        <p className="text-sm text-gray-500">Upload PDF or Word document (max 5MB)</p>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditProfile;
