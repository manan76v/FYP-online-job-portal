import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        description: ""
    });

    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });

        if (name === 'description') {
            const wordCount = value.trim().split(/\s+/).length;
            if (wordCount < 50) {
                setErrors({
                    ...errors,
                    description: 'Description must be at least 50 words.'
                });
            } else {
                setErrors({
                    ...errors,
                    description: ""
                });
            }
        }
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (Object.values(errors).some((err) => err)) {
            toast.error("Please fix the errors before submitting.");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen bg-gray-50 py-8'>
            <div className='max-w-4xl mx-auto'>
                <div className='bg-white rounded-xl shadow-md p-8'>
                    <h2 className='text-2xl font-semibold mb-6 text-center'>Create New Job Posting</h2>
                    <form onSubmit={submitHandler} className='space-y-6'>
                        {/* Title and Company Selection */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div className='space-y-2'>
                                <Label className='text-sm font-medium'>Job Title</Label>
                                <Input
                                    name="title"
                                    value={input.title}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. Senior Software Engineer"
                                    className='w-full'
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label className='text-sm font-medium'>Select Company</Label>
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem key={company._id} value={company.name.toLowerCase()}>
                                                    {company.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Description */}
                        <div className='space-y-2'>
                            <Label className='text-sm font-medium'>Job Description</Label>
                            <textarea
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                placeholder="Detailed job description including requirements, responsibilities, and qualifications..."
                                className='min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                            />
                            {errors.description && <p className='text-sm text-red-500'>{errors.description}</p>}
                        </div>

                        {/* Job Details */}
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                            <div className='space-y-2'>
                                <Label className='text-sm font-medium'>Salary Range</Label>
                                <Input
                                    name="salary"
                                    value={input.salary}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. $80,000 - $100,000"
                                    className='w-full'
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label className='text-sm font-medium'>Location</Label>
                                <Input
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. New York, NY"
                                    className='w-full'
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label className='text-sm font-medium'>Experience Level</Label>
                                <Input
                                    name="experience"
                                    value={input.experience}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. 3-5 years"
                                    className='w-full'
                                />
                            </div>
                        </div>

                        {/* Job Type and Positions */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div className='space-y-2'>
                                <Label className='text-sm font-medium'>Job Type</Label>
                                <Input
                                    name="jobType"
                                    value={input.jobType}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. Full-time, Part-time"
                                    className='w-full'
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label className='text-sm font-medium'>Number of Positions</Label>
                                <Input
                                    name="position"
                                    type="number"
                                    value={input.position}
                                    onChange={changeEventHandler}
                                    min="1"
                                    className='w-full'
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className='flex justify-end'>
                            <Button 
                                type="submit" 
                                disabled={loading}
                                className='w-full md:w-auto'
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Posting Job...
                                    </>
                                ) : (
                                    'Post New Job'
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostJob;
