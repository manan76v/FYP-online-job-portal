import React, { useEffect } from 'react'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import JobType from './ui/jobtype'
import TopCompanies from './ui/topcompany'
import JobBanner from './picpart'
import JobSteps from './nextjob'
import JobHelpSection from './jobhelp'
import { Import } from 'lucide-react'
import CategoryCard from './category'


const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div>
      <JobBanner/>
    {/* <HeroSection />
      <CategoryCarousel />*/}
      <CategoryCard/>
      <LatestJobs />
      <JobSteps/>
      <JobType/>
      <JobHelpSection/>
      <TopCompanies/>
      <Footer />
    </div>
  )
}

export default Home