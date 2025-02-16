import React, { useState, useEffect } from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, MapPin, Calendar, Briefcase, GraduationCap } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const isResume = true;

const ProfileSeeker = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow-sm'>
                {/* Header Section */}
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24 ring-2 ring-purple-500 ring-offset-2">
                            <AvatarImage src={user?.profile?.avatar || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-2xl text-gray-900'>{user?.fullname}</h1>
                            <p className="text-gray-600 mt-1">{user?.profile?.title || 'Professional Title'}</p>
                            <p className="text-gray-500 mt-1">{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button 
                        onClick={() => setOpen(true)} 
                        className="text-right hover:bg-purple-50" 
                        variant="outline"
                    >
                        <Pen className="mr-2 h-4 w-4" />
                        Edit Profile
                    </Button>
                </div>

                {/* Contact Information */}
                <div className='my-8 grid grid-cols-2 gap-4'>
                    <div className='flex items-center gap-3'>
                        <Mail className="text-purple-500" />
                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <span className="text-gray-900">{user?.email}</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-3'>
                        <Contact className="text-purple-500" />
                        <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <span className="text-gray-900">{user?.phoneNumber}</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-3'>
                        <MapPin className="text-purple-500" />
                        <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <span className="text-gray-900">{user?.profile?.location || 'Not specified'}</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-3'>
                        <Calendar className="text-purple-500" />
                        <div>
                            <p className="text-sm text-gray-500">Available From</p>
                            <span className="text-gray-900">{user?.profile?.availableFrom || 'Immediately'}</span>
                        </div>
                    </div>
                </div>

                {/* Experience & Education */}
                <div className="grid grid-cols-2 gap-8 my-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Briefcase className="text-purple-500" />
                            <h2 className="text-lg font-semibold">Experience</h2>
                        </div>
                        {user?.profile?.experience ? (
                            <div className="space-y-4">
                                {user.profile.experience.map((exp, index) => (
                                    <div key={index} className="border-l-2 border-purple-200 pl-4">
                                        <h3 className="font-medium">{exp.title}</h3>
                                        <p className="text-sm text-gray-600">{exp.company}</p>
                                        <p className="text-sm text-gray-500">{exp.duration}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No experience added</p>
                        )}
                    </div>
                    
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <GraduationCap className="text-purple-500" />
                            <h2 className="text-lg font-semibold">Education</h2>
                        </div>
                        {user?.profile?.education ? (
                            <div className="space-y-4">
                                {user.profile.education.map((edu, index) => (
                                    <div key={index} className="border-l-2 border-purple-200 pl-4">
                                        <h3 className="font-medium">{edu.degree}</h3>
                                        <p className="text-sm text-gray-600">{edu.institution}</p>
                                        <p className="text-sm text-gray-500">{edu.year}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No education added</p>
                        )}
                    </div>
                </div>

                {/* Skills Section */}
                <div className='my-8'>
                    <h2 className="text-lg font-semibold mb-4">Skills</h2>
                    <div className='flex flex-wrap gap-2'>
                        {user?.profile?.skills && user.profile.skills.length > 0 ? (
                            user.profile.skills.map((skill, index) => (
                                <Badge 
                                    key={index}
                                    className="bg-purple-50 text-purple-700 hover:bg-purple-100"
                                >
                                    {skill}
                                </Badge>
                            ))
                        ) : (
                            <span className="text-gray-500">No skills added</span>
                        )}
                    </div>
                </div>

                {/* Resume Section */}
                <div className='grid w-full max-w-sm items-center gap-1.5 my-8'>
                    <Label className="text-lg font-semibold">Resume</Label>
                    {isResume ? (
                        <div className="flex items-center gap-4">
                            <a 
                                target='blank' 
                                href={user?.profile?.resume} 
                                className='text-purple-600 hover:text-purple-700 hover:underline cursor-pointer flex items-center'
                            >
                                <Briefcase className="mr-2 h-4 w-4" />
                                {user?.profile?.resumeOriginalName || 'View Resume'}
                            </a>
                            <Badge variant="outline" className="text-gray-500">
                                PDF
                            </Badge>
                        </div>
                    ) : (
                        <span className="text-gray-500">No resume uploaded</span>
                    )}
                </div>
            </div>

            {/* Applied Jobs Section */}
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl p-8 shadow-sm'>
                <h2 className='font-semibold text-xl mb-6'>Applied Jobs</h2>
                <AppliedJobTable />
            </div>

            {/* Profile Update Dialog */}
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default ProfileSeeker