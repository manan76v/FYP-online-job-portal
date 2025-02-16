import { Routes, Route, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setUser } from './redux/authSlice';
import axios from 'axios';
import Navbar from './components/shared/Navbar';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import Jobs from './components/Jobs';
import BlogsPage from './components/blogs';
import ContactForm from './components/ContactForm';
import FindJobs from './components/public/FindJobs';
import Blogs from './components/public/Blogs';
import Contact from './components/public/Contact';
import AppliedJobs from './components/jobseeker/AppliedJobs';
import Interviews from './components/meetings/Interviews';
import JobSeekerProfile from './components/jobseeker/JobSeekerProfile';
import Profile from './components/recruiter/Profile';
import JobDescription from './components/JobDescription';
import Companies from './components/admin/Companies';
import CompanyCreate from './components/admin/CompanyCreate';
import CompanySetup from './components/admin/CompanySetup';
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from './components/admin/PostJob';
import Applicants from './components/admin/Applicants';
import RecruiterDashboard from './components/recruiter/RecruiterDashboard';
import InterviewScheduling from './components/recruiter/InterviewScheduling';
import ProtectedRoute from './components/admin/ProtectedRoute';
import DashboardPage from './components/dashboard/DashboardPage';
import CompanyProfile from './components/company/CompanyProfile';
import AdvancedSearch from './components/jobs/AdvancedSearch';
import SavedJobs from './components/jobs/SavedJobs';
import CareerResources from './components/resources/CareerResources';
import RecruiterProfile from './components/recruiter/RecruiterProfile';
import EditRecruiterProfile from './components/recruiter/EditRecruiterProfile';
import ProfileSeeker from './components/profileSeeker';
import EditProfile from './components/EditProfile';
import AppliedJobTable from './components/AppliedJobTable';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserData();
    }
  }, []);

  const getUserData = async () => {
    try {
      const { data } = await axios.get("/api/v1/user/me");
      dispatch(setUser(data.user));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      <main className="pt-16">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/find-jobs" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDescription />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/browse" element={<AdvancedSearch />} />
          <Route path="/resources" element={<CareerResources />} />
          <Route path="/companies/:id" element={<CompanyProfile />} />
          <Route path="/saved-jobs" element={<SavedJobs />} />
          <Route path="/applied-jobs/table" element={<AppliedJobTable />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/blogs/:id" element={<Blogs />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/find-jobs/:id" element={<FindJobs />} />
          <Route path="/job-description/:id" element={<JobDescription />} />
          <Route path="/profileSeeker" element={<ProfileSeeker />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/recruiter-profile" element={<RecruiterProfile />} />
          <Route path="/edit-recruiter-profile" element={<EditRecruiterProfile />} />
          <Route path="/interview-scheduling" element={<InterviewScheduling />} />
          <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
          <Route path="/applied-jobs" element={<AppliedJobs />} />
          <Route path="/interviews" element={<Interviews />} />
          <Route path="/profile" element={<ProfileSeeker />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/jobseeker-profile" element={<JobSeekerProfile />} />
          <Route path="/recruiter-profile" element={<Profile />} />
          <Route path="/recruiter-profile/edit" element={<EditRecruiterProfile />} />
          <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
          <Route path="/interview-scheduling" element={<InterviewScheduling />} />
          {/* Protected Recruiter Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute><RecruiterDashboard /></ProtectedRoute>} />
          <Route path="/admin/companies" element={<ProtectedRoute><Companies /></ProtectedRoute>} />
          <Route path="/admin/create-company" element={<ProtectedRoute><CompanyCreate /></ProtectedRoute>} />
          <Route path="/admin/companies/:id" element={<ProtectedRoute><CompanySetup /></ProtectedRoute>} />
          <Route path="/admin/jobs" element={<ProtectedRoute><AdminJobs /></ProtectedRoute>} />
          <Route path="/admin/post-job" element={<ProtectedRoute><PostJob /></ProtectedRoute>} />
          <Route path="/admin/applicants" element={<ProtectedRoute><Applicants /></ProtectedRoute>} />
          <Route path="/admin/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/admin/interview-scheduling" element={<ProtectedRoute><InterviewScheduling currentView="schedule" /></ProtectedRoute>} />
          <Route path="/admin/interview-scheduling/evaluations" element={<ProtectedRoute><InterviewScheduling currentView="evaluations" /></ProtectedRoute>} />
          <Route path="/admin/interview-scheduling/candidates" element={<ProtectedRoute><InterviewScheduling currentView="candidates" /></ProtectedRoute>} />
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
            <Route path="/recruiter/profile" element={<RecruiterProfile />} />
            <Route path="/recruiter/profile/edit" element={<EditRecruiterProfile />} />
            <Route path="/recruiter/interviews" element={<InterviewScheduling />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
