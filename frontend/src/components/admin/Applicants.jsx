import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import { useDispatch } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';

const Applicants = () => {
    const dispatch = useDispatch();
    
    // Temporary applicants data
    const temporaryData = {
        applications: [
            {
                _id: "1",
                applicant: {
                    fullname: "John Smith",
                    email: "john.smith@gmail.com",
                    phoneNumber: "+1 234-567-8901",
                    profile: {
                        resume: "https://example.com/resume1.pdf",
                        resumeOriginalName: "JohnSmith_Resume.pdf"
                    },
                    createdAt: "2024-01-15T10:30:00.000Z"
                }
            },
            {
                _id: "2",
                applicant: {
                    fullname: "Sarah Wilson",
                    email: "sarah.wilson@gmail.com",
                    phoneNumber: "+1 234-567-8902",
                    profile: {
                        resume: "https://example.com/resume2.pdf",
                        resumeOriginalName: "SarahWilson_Resume.pdf"
                    },
                    createdAt: "2024-01-14T09:15:00.000Z"
                }
            },
            {
                _id: "3",
                applicant: {
                    fullname: "Michael Brown",
                    email: "michael.brown@gmail.com",
                    phoneNumber: "+1 234-567-8903",
                    profile: {
                        resume: "https://example.com/resume3.pdf",
                        resumeOriginalName: "MichaelBrown_Resume.pdf"
                    },
                    createdAt: "2024-01-13T14:20:00.000Z"
                }
            },
            {
                _id: "4",
                applicant: {
                    fullname: "Emily Davis",
                    email: "emily.davis@gmail.com",
                    phoneNumber: "+1 234-567-8904",
                    profile: {
                        resume: "https://example.com/resume4.pdf",
                        resumeOriginalName: "EmilyDavis_Resume.pdf"
                    },
                    createdAt: "2024-01-12T11:45:00.000Z"
                }
            }
        ]
    };

    useEffect(() => {
        // Set temporary data instead of fetching
        dispatch(setAllApplicants(temporaryData));
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-50 via-gray-100 to-gray-200">
            <Navbar />
            <div className='max-w-7xl mx-auto p-6'>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Applicants ({temporaryData.applications.length})
                    </h1>
                </div>
                <div className="bg-white rounded-xl shadow-sm">
                    <ApplicantsTable />
                </div>
            </div>
        </div>
    )
}

export default Applicants