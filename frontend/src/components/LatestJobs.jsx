import React, { useEffect } from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setAllJobs } from '../redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`${JOB_API_END_POINT}/all`, { withCredentials: true });
                if (response.data.success) {
                    dispatch(setAllJobs(response.data.jobs));
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        if (!allJobs || allJobs.length === 0) {
            fetchJobs();
        }
    }, [dispatch, allJobs]);

    if (!allJobs) {
        return (
            <div className='max-w-7xl mx-auto my-20'>
                <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top </span> Job Openings</h1>
                <div className='text-center py-10'>
                    <p>Loading jobs...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top </span> Job Openings</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5'>
                {allJobs.length === 0 ? (
                    <div className='col-span-full text-center py-10'>
                        <p>No jobs available at the moment</p>
                    </div>
                ) : (
                    allJobs.slice(0, 6).map((job) => (
                        <LatestJobCards key={job._id} job={job} />
                    ))
                )}
            </div>
        </div>
    )
}

export default LatestJobs