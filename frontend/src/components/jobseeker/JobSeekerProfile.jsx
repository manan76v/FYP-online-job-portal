import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Award, FileText, Download } from 'lucide-react';
import AppliedJobTable from '../AppliedJobTable';

const JobSeekerProfile = () => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    const handleDownloadResume = () => {
        if (user?.resume) {
            window.open(user.resume, '_blank');
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-8 px-4">
            {/* Header Section */}
            <Card className="p-6 mb-6">
                <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user?.avatar || "/default-avatar.png"} />
                        </Avatar>
                        <div>
                            <h1 className="text-2xl font-bold">{user?.name || 'Job Seeker'}</h1>
                            <p className="text-gray-600">{user?.title || 'Professional Title'}</p>
                            <div className="flex gap-4 mt-2">
                                <div className="flex items-center gap-1">
                                    <Mail className="h-4 w-4" />
                                    <span>{user?.email}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Phone className="h-4 w-4" />
                                    <span>{user?.phone || "Not provided"}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    <span>{user?.location || "Not provided"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {user?.resume && (
                            <Button variant="outline" onClick={handleDownloadResume}>
                                <Download className="h-4 w-4 mr-2" />
                                Resume
                            </Button>
                        )}
                        <Button onClick={() => navigate('/profile/edit')}>
                            Edit Profile
                        </Button>
                    </div>
                </div>
                {user?.about && (
                    <div className="mt-4">
                        <p className="text-gray-600">{user.about}</p>
                    </div>
                )}
            </Card>

            {/* Skills Section */}
            <Card className="p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Skills</h2>
                <div className="flex flex-wrap gap-2">
                    {user?.skills?.map((skill, index) => (
                        <Badge key={index} variant="secondary">{skill}</Badge>
                    )) || <p className="text-gray-500">No skills added yet</p>}
                </div>
            </Card>

            {/* Education Section */}
            <Card className="p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Education</h2>
                <div className="space-y-4">
                    {user?.education?.map((edu, index) => (
                        <div key={index} className="flex items-start gap-4">
                            <GraduationCap className="h-5 w-5 mt-1" />
                            <div>
                                <h3 className="font-semibold">{edu.degree} in {edu.field}</h3>
                                <p className="text-gray-600">{edu.school}</p>
                                <p className="text-sm text-gray-500">{edu.year}</p>
                            </div>
                        </div>
                    )) || (
                        <div className="text-gray-500">No education details added yet</div>
                    )}
                </div>
            </Card>

            {/* Experience Section */}
            <Card className="p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Experience</h2>
                <div className="space-y-4">
                    {user?.experience?.map((exp, index) => (
                        <div key={index} className="flex items-start gap-4">
                            <Briefcase className="h-5 w-5 mt-1" />
                            <div>
                                <h3 className="font-semibold">{exp.title}</h3>
                                <p className="text-gray-600">{exp.company}</p>
                                <p className="text-sm text-gray-500">{exp.duration} • {exp.year}</p>
                            </div>
                        </div>
                    )) || (
                        <div className="text-gray-500">No experience added yet</div>
                    )}
                </div>
            </Card>

            {/* Applied Jobs Section */}
            <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Applied Jobs</h2>
                <AppliedJobTable />
            </Card>
        </div>
    );
};

export default JobSeekerProfile;
